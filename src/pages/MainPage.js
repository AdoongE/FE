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

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  // 데이터 가져오기
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let url = '';

      if (activeTab === '모아보기') {
        url = '/api/v1/content/';
        const response = await api.get(url);
        setCollectData(response.data.results[0].contentsInfoList); // 오로지 카테고리 내 콘텐츠 갯수를 알기위해서
      } else if (categoryId) {
        url = `/api/v1/content/${categoryId}`;
      }

      if (!url) {
        console.warn('유효하지 않은 URL 요청입니다.');
        return;
      }

      console.log('GET 요청할 URL:', url);

      const response = await api.get(url);

      // 응답 데이터 확인
      console.log('응답 데이터:', response.data);

      // 데이터 유효성 검사
      const results =
        response.data.results?.flatMap(
          (item) =>
            item.contentsInfoList?.map((content) => {
              const formattedDate = content.updatedDt
                ? new Date(content.updatedDt).toISOString().split('T')[0]
                : '날짜 정보 없음'; // updatedDt가 없을 경우 기본값 설정

              return {
                id: content.contentId || 'ID 없음',
                title: content.contentName || formattedDate, // contentName이 null일 경우 formattedDate 사용
                user: item.nickname || '사용자 정보 없음',
                category: content.categoryName?.[0] || '카테고리 없음',
                tags: content.tagName || [],
                dDay: content.dday,
                contentDateType: content.contentDateType || '타입 없음',
                thumbnailImage: content.thumbnailImage || '',
                updatedDt: content.updatedDt || '업데이트 정보 없음',
                createdAt: content.createdAt || new Date(),
              };
            }) ?? [],
        ) ?? [];

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
  }, [activeTab, categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        />
      </SidebarContainer>
      <MainContent>
        <ContentHeader
          setSortOrder={setSortOrder}
          categoryId={categoryId}
          categoryName={categoryName}
        />
        <ContentArea $isBlank={sortedData.length === 0}>
          {loading ? (
            <div>로딩 중...</div> // 로딩 상태 표시
          ) : sortedData.length === 0 ? (
            <ContentBlank /> // 데이터가 없을 때
          ) : (
            displayedContentBoxes.map((data) => {
              const formattedDate = new Date(data.createdAt).toLocaleDateString(
                'ko-KR',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              );

              return (
                <React.Fragment key={data.id}>
                  <ContentBox
                    key={data.id}
                    contentId={data.id}
                    title={data.title || formattedDate} // 제목이 없으면 생성 날짜 사용
                    user={data.user}
                    category={data.category}
                    tags={data.tags}
                    dDay={data.dDay}
                    contentDateType={data.contentDateType}
                    thumbnailImage={data.thumbnailImage}
                    updatedDt={data.updatedDt}
                    open={() => openModal(data)}
                  />
                  {selectedData && selectedData.id === data.id && (
                    <ViewThumbnailModal
                      file={data.thumbnailImage}
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
  grid-template-columns: repeat(
    auto-fill,
    minmax(440px, 1fr)
  ); /* 컬럼 폭을 조정 */
  justify-content: center; /* 가운데 정렬 */
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 불필요한 패딩 제거 */

  & > div {
    aspect-ratio: 440 / 387; /* 콘텐츠 박스 비율 유지 */
    width: 100%; /* 그리드에 맞춰 너비 조정 */
    max-width: 600px; /* 화면이 너무 커질 경우 최대 크기 제한 (선택 사항) */
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 110px;
  padding-bottom: 58px;
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
