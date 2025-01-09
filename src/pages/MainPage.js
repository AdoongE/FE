import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ViewThumbnailModal from '../components/modal/ViewThumbnailModal';
import noSearchContent from '../assets/icons/noSearchContent.png';
import axios from 'axios';
import { axiosInstance } from '../components/api/axios-instance';

const api = axios.create({
  baseURL: 'http://210.107.205.122:20011',
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
  const [localSelectedFormat, setLocalSelectedFormat] = useState('');
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 기준
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9;
  const [selectedData, setSelectedData] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [tags, setTags] = useState([]); // 검색 필터링을 위한
  const [searchState, setSearchState] = useState(false);

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  console.log('activeTab : ', activeTab);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let url = '';
      let results = [];

      if (activeTab === '검색필터') {
        const data = { tags: tags };
        const response = await axiosInstance.post(
          '/api/v1/content/filtering',
          data,
        );

        if (response.data.status.code === 200) {
          console.log('검색 태그 전송 성공:', response.data.status.message);
          console.log('검색 필터링 결과', response.data);
          if (response.data.metadata.resultCount === 0) {
            setSearchState(true);
          }

          results = response.data.results.map((item) => ({
            id: item.contentId || 'ID 없음',
            title:
              item.contentName ||
              (item.updatedDt
                ? new Date(item.updatedDt).toISOString().split('T')[0]
                : '날짜 정보 없음'),
            categoryId: item.categoryId || [],
            category: item.categoryName || [],
            tags: item.tagName || [],
            dDay: item.dday,
            contentDateType: item.contentDateType || '타입 없음',
            thumbnailImage: item.thumbnailImage || '',
            updatedDt: item.updatedDt || '업데이트 정보 없음',
          }));
        }
      } else {
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
        console.log('응답 데이터:', response.data.results);

        results =
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
      }
      setOriginalData(results);
      setSortedData(results); // 초기 데이터 설정
      setSearchState(false);
    } catch (error) {
      console.error(
        '데이터 가져오기 실패:',
        error.response ? error.response.data : error,
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, categoryId, filterId, tags]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contentTypeMapping = {
    IMAGE: '이미지',
    LINK: '링크',
    PDF: 'PDF',
  };

  // 데이터 필터링 및 정렬
  useEffect(() => {
    let filteredData = [...originalData];

    console.log('originalData:', originalData); // 원본 데이터 확인

    // 저장형식 필터링
    if (localSelectedFormat) {
      filteredData = filteredData.filter((item) => {
        const koreanType = contentTypeMapping[item.contentDateType]; // 매핑된 한국어 값
        console.log('item.contentDateType:', item.contentDateType); // 데이터 타입 확인
        console.log('koreanType:', koreanType); // 매핑된 한국어 타입 확인
        console.log('localSelectedFormat:', localSelectedFormat); // 선택된 필터 값
        console.log('매칭 여부:', koreanType === localSelectedFormat); // 비교 결과
        return koreanType === localSelectedFormat;
      });
      console.log('필터링 후 데이터:', filteredData); // 필터링 결과 확인
    }

    // 정렬
    filteredData.sort((a, b) => {
      if (sortOrder === '최신순') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === '이름순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setSortedData(filteredData);
  }, [originalData, localSelectedFormat, sortOrder]);

  useEffect(() => {
    fetchData(); // 데이터 초기 로드
  }, []);

  const dataToRender = filteredData.length > 0 ? filteredData : sortedData;

  const displayedContentBoxes = dataToRender.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  // 페이지네이션 처리
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(sortedData.length / contentPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const getPaginationNumbers = () => {
    const totalPages = Math.max(
      1,
      Math.ceil(sortedData.length / contentPerPage),
    );
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
      if (Array.isArray(item.categoryName)) {
        item.categoryName.forEach((category) => {
          counts[category] = (counts[category] || 0) + 1;
        });
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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setFilteredData={setFilteredData}
          setSortOrder={setSortOrder}
          setSelectedFormat={setLocalSelectedFormat}
          setSearchState={setSearchState}
          categoryId={categoryId}
          categoryName={categoryName}
          filterId={filterId}
          filterName={filterName}
          tags={tags}
          setTags={setTags}
        />
        <ContentArea $isBlank={searchState || sortedData.length === 0}>
          {loading ? (
            <div>로딩 중...</div>
          ) : sortedData.length === 0 ? (
            <ContentBlank />
          ) : searchState ? (
            <NoSearchContent>
              <img
                src={noSearchContent}
                alt="noSearch"
                style={{
                  width: '268px',
                  height: '190px',
                  marginBottom: '22.24px',
                }}
              />
              <div style={{ fontSize: '30px', marginBottom: '4px' }}>
                해당 조건에 맞는 콘텐츠가 없어요
              </div>
              <div style={{ fontSize: '20px', color: '#9f9f9f' }}>
                다른 키워드로 검색해보세요
              </div>
            </NoSearchContent>
          ) : (
            (displayedContentBoxes || []).map((data, index) => {
              const formattedDate = data?.createdAt
                ? new Date(data.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '날짜 정보 없음';

              return (
                <React.Fragment key={data?.id || index}>
                  <StyledContentBox>
                    <ContentBox
                      key={data?.id || index}
                      contentId={data?.id || 'ID 없음'}
                      title={data?.title || formattedDate}
                      category={data?.category || []}
                      tags={data?.tags || []}
                      dDay={data?.dDay ?? null}
                      contentDateType={data?.contentDateType || '타입 없음'}
                      thumbnailImage={data?.thumbnailImage || null}
                      updatedDt={data?.updatedDt || '업데이트 정보 없음'}
                      open={() => openModal(data)}
                      fetchData={fetchData}
                    />
                  </StyledContentBox>
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
              currentPage === Math.ceil(sortedData.length / contentPerPage) ||
              sortedData.length === 0
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
  display: ${(props) => (props.$isBlank ? 'flex' : 'grid')};
  justify-content: ${(props) => (props.$isBlank ? 'center' : 'normal')};
  align-items: ${(props) => (props.$isBlank ? 'flex-start' : 'stretch')};
  grid-template-columns: ${(props) =>
    !props.$isBlank ? 'repeat(auto-fill, minmax(440px, 1fr))' : 'none'};
  grid-row-gap: 40px;
  box-sizing: border-box;
  height: auto;
  padding: ${(props) =>
    props.$isBlank ? `${props.$gap || 300}px 0 0 0` : 'inherit'};
`;

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
`;

const NoSearchContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: fixed;
  margin-top: 10px;
  padding-bottom: 50px;
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
