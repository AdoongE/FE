import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ViewThumbnailModal from '../components/modal/ViewThumbnailModal';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.78.221.255',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const MainPage = () => {
  const [collectData, setCollectData] = useState([]); // 모아보기 전체 콘텐츠 수
  const [sortedData, setSortedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('모아보기');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCateName] = useState('');
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 기준
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9;
  const [selectedData, setSelectedData] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [filterName, setFilterName] = useState('');

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  console.log('activeTab : ', activeTab);

  /******************************************************************************************/
  // fetchData : 메인페이지의 모든 콘텐츠들을 조회하는 api 요청 함수
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let url = '';
      if (activeTab === '모아보기' || activeTab === '나의 씨드') {
        url = '/api/v1/content/';
        const res = await api.get(url);
        const responseData = res.data.results?.[0]?.contentsInfoList || [];
        setCollectData(responseData); // null 방지
      } else if (activeTab === '카테고리') {
        url = `/api/v1/content/${categoryId}`;
      } else if (activeTab === '맞춤필터') {
        console.log('필터 ID :', filterId);
        url = `/api/v1/filter/${filterId}`;
      }

      if (!url) {
        console.warn('유효하지 않은 URL 요청입니다.');
        return;
      }

      console.log('GET 요청할 URL:', url);
      const response = await api.get(url);

      // 응답 데이터 확인
      console.log('응답 데이터:', response.data.results);

      const results =
      (response?.data?.results || []).flatMap((item) => {
        if (activeTab === '맞춤필터') {
          return {
            id: item.contentId || 'ID 없음',
            title:
              item.contentName ||
              (item.updatedDt
                ? new Date(item.updatedDt).toISOString().split('T')[0]
                : '날짜 정보 없음'),
            categoryId: item.categoryId || [],
            category: item.categoryName?.[0] || '카테고리 없음',
            contentDateType: item.contentDateType || '타입 없음',
            thumbnailImage: item.thumbnailImage || '',
            updatedDt: item.updatedDt || '업데이트 정보 없음',
            tagId: item.tagId || [],
            tags: item.tagName || [],
            dDay: item.dday || null,
            createdAt: item.createdAt || Date.now(), // 기본값 설정
          };
        } else {
          return (item.contentsInfoList || []).map((content) => {
            const formattedDate = content.updatedDt
              ? new Date(content.updatedDt).toISOString().split('T')[0]
              : '날짜 정보 없음';

            return {
              id: content.contentId || 'ID 없음',
              title: content.contentName || formattedDate,
              user: item.nickname || '사용자 정보 없음',
              category: content.categoryName || [],
              tags: content.tagName || [],
              dDay: content.dday,
              contentDateType: content.contentDateType || '타입 없음',
              thumbnailImage: content.thumbnailImage || '',
              updatedDt: content.updatedDt || '업데이트 정보 없음',
              createdAt: content.createdAt || Date.now(), // 기본값 설정
            };
          });
        }
      }) ?? [];

    setOriginalData(results);
    setSortedData(results); // 초기 데이터 설정
  } catch (error) {
    console.error(
      '데이터 가져오기 실패:',
      error.response ? error.response.data : error,
    );
  } finally {
    setLoading(false);
  }
}, [activeTab, categoryId, filterId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // 문제 사례 : ContentDeleteModal.js에서 콘텐츠를 삭제했을 때, 새로고침을 하지 않으면 콘텐츠 삭제된 것이 반영되지 않음
  /******************************************************************************************/

  // 정렬 처리
  useEffect(() => {
    const sorted = [...originalData].sort((a, b) => {
      if (sortOrder === '최신순') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === '이름순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortOrder, originalData]);

  // 페이지네이션 처리
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(sortedData.length / contentPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const displayedContentBoxes = sortedData.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  const getPaginationNumbers = () => {
    const totalPages = Math.ceil(sortedData.length / contentPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const categoryCounts =
    collectData &&
    collectData.reduce((counts, item) => {
      if (Array.isArray(item.categoryName) && item.categoryName[0]) {
        counts[item.categoryName[0]] = (counts[item.categoryName[0]] || 0) + 1;
      }
      return counts;
    }, {});

  return (
    <MainContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarContainer>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCategoryId={setCategoryId}
          setCateName={setCateName}
          categoryCounts={categoryCounts}
          filterId={filterId}
          setFilterId={setFilterId}
          setFilterName={setFilterName}
        />
      </SidebarContainer>
      <MainContent>
        <ContentHeader
          setSortOrder={setSortOrder}
          categoryId={categoryId}
          categoryName={categoryName}
          filterId={filterId}
          filterName={filterName}
        />
        <ContentArea $isBlank={sortedData.length === 0}>
          {loading ? (
            <div>로딩 중...</div> // 로딩 상태 표시
          ) : sortedData.length === 0 ? (
            <ContentBlank /> // 데이터가 없을 때
          ) : (
            (displayedContentBoxes || []).map((data, index) => {
              // 데이터가 없을 경우 기본값 설정
              const formattedDate = data?.createdAt
                ? new Date(data.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '날짜 정보 없음';

              return (
                <React.Fragment key={data?.id || index}>
                  <ContentBox
                    key={data?.id || index} // 데이터가 없을 경우 index 사용
                    contentId={data?.id || 'ID 없음'}
                    title={data?.title || formattedDate} // 제목이 없으면 생성 날짜 사용
                    category={data?.category || []} // 기본값 처리
                    tags={data?.tags || []} // 기본값 처리
                    dDay={data?.dDay ?? null} // 기본값 처리
                    contentDateType={data?.contentDateType || '타입 없음'} // 기본값 처리
                    thumbnailImage={data?.thumbnailImage || null} // 기본값 처리
                    updatedDt={data?.updatedDt || '업데이트 정보 없음'} // 기본값 처리
                    open={() => openModal(data)}
                  />
                  {selectedData && selectedData.id === data?.id && (
                    <ViewThumbnailModal
                      file={data?.thumbnailImage}
                      onClose={closeModal}
                      contentDataType={selectedData.contentDateType}
                    />
                  )}
                </React.Fragment>
              );
            })
          )}
        </ContentArea>

        {/* 페이지네이션 */}
        <Pagination>
          <PageArrow
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </PageArrow>
          {getPaginationNumbers().map((page) => (
            <PageNumber
              key={page}
              $active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageNumber>
          ))}
          <PageArrow
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedData.length / contentPerPage)
            }
          >
            {'>'}
          </PageArrow>
        </Pagination>
      </MainContent>
    </MainContainer>
  );
};

// 스타일 컴포넌트
const MainContainer = styled.div`
  display: flex;
  padding-left: 390px;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  width: 345px;
  height: 100vh;
  z-index: 1;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 45px;
  margin-top: 118px;
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  grid-row-gap: 40px; /* 위아래 간격 추가 */
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageArrow = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  color: ${(props) => (props.disabled ? '#ccc' : '#000')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    color: ${(props) => (props.disabled ? '#ccc' : '#333')};
  }
`;

const PageNumber = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

export default MainPage;
