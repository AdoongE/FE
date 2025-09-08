import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ViewThumbnailModal from '../components/modal/ViewThumbnailModal';
import noSearchContent from '../assets/icons/noSearchContent.png';
import Pagination from './Pagination';
import { axiosInstance } from '../components/api/axios-instance';

const MainPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]); // 카테고리 내 씨드 개수 count를 위한
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('모아보기');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCateName] = useState('');
  const [localSelectedFormat, setLocalSelectedFormat] = useState('');
  const [sortOrder, setSortOrder] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState(''); // 검색 키워드 상태 추가
  const [tags, setTags] = useState([]); // 검색 필터링을 위한
  const [searchState, setSearchState] = useState(false);

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  const fetchData = useCallback(
    async (page = 0) => {
      try {
        setLoading(true);
        setSearchState(false);
        const params = {
          page,
          size: contentPerPage,
          sortBy: sortOrder === '이름순' ? 'name' : 'latest',
          isAsc: sortOrder === '이름순',
        };

        if (localSelectedFormat && localSelectedFormat !== '전체보기') {
          const seedTypeKey = Object.keys(seedTypeMapping).find(
            (key) => seedTypeMapping[key] === localSelectedFormat,
          );
          if (seedTypeKey) params.seedType = seedTypeKey;
        }

        let url = '';
        let results = [];
        let pageInfos = [];

        if (activeTab === '검색필터') {
          url = '/api/v1/seed/filtering';
          const data = { tags: tags };
          const response = await axiosInstance.post(url, data, { params });

          if (response.data.status.code === 200) {
            if (response.data.status.message === '씨드가 존재하지 않습니다.') {
              setSearchState(true);
            } else {
              pageInfos = response.data.results[0];
              setTotalPages(pageInfos.pageInfo.totalPages || 1);
              results = response.data.results[0]?.seedInfoList.map((item) => ({
                id: item.seedId || 'ID 없음',
                seedName: item.seedName,
                categoryId: item.categoryId || [],
                categoryName: item.categoryName || [],
                tagName: item.tagName || [],
                dDay: item.dDay,
                seedType: item.seedType || '타입 없음',
                thumbnailImage: item.thumbnailImage || '',
                updatedDt: item.updatedDt || '업데이트 정보 없음',
              }));
            }
          }
        } else if (activeTab === '모아보기' || activeTab === '나의 씨드') {
          setFilterId(null);
          setCategoryId(null);
          url = '/api/v1/seed';
          const response = await axiosInstance.get(url, { params });

          if (response.data.status.code === 200) {
            if (response.data.status.message === '씨드가 존재하지 않습니다.') {
              setSearchState(true);
            } else {
              results = response.data.results[0].seedInfoList;
              pageInfos = response.data.results[0];
              setTotalPages(pageInfos.pageInfo.totalPages || 1);
              setFullData(results || []);
            }
          }
        } else {
          if (activeTab === '카테고리') {
            setFilterId(null);
            url = `/api/v1/seed/category/${categoryId}`;
          } else if (activeTab === '맞춤필터') {
            url = `/api/v1/filter/${filterId}`;
          }

          if (!url) {
            console.warn('유효하지 않은 URL 요청입니다.');
            return;
          }

          const response = await axiosInstance.get(url, { params });
          if (response.data.status.message === '씨드가 존재하지 않습니다.') {
            setData(results || []);
          } else {
            pageInfos = response.data.results[0];
            setTotalPages(pageInfos.pageInfo.totalPages || 1);
            results = response.data.results[0]?.seedInfoList.map((item) => ({
              id: item.seedId || 'ID 없음',
              seedName: item.seedName,
              categoryId: item.categoryId || [],
              categoryName: item.categoryName || [],
              tagName: item.tagName || [],
              dDay: item.dDay,
              seedType: item.seedType || '타입 없음',
              thumbnailImage: item.thumbnailImage || '',
              updatedDt: item.updatedDt || '업데이트 정보 없음',
            }));
          }
        }
        setData(results || []);
      } catch (error) {
        console.error(
          '데이터 가져오기 실패:',
          error.response ? error.response.data : error,
        );
      } finally {
        setLoading(false);
      }
    },
    [
      currentPage,
      activeTab,
      categoryId,
      filterId,
      tags,
      sortOrder,
      localSelectedFormat,
    ],
  );

  useEffect(() => {
    fetchData(currentPage - 1);
  }, [fetchData, location, sortOrder, localSelectedFormat]);

  const seedTypeMapping = {
    IMAGE: '이미지',
    LINK: '링크',
    PDF: 'PDF',
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const categoryCounts = fullData.reduce((acc, item) => {
    item.categoryName.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    return acc;
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
          setKeyword={setKeyword}
          tags={tags}
          setTags={setTags}
        />
        <ContentArea $isBlank={searchState || data.length === 0}>
          {loading ? (
            <div>로딩 중...</div>
          ) : searchState ? (
            <NoSearchContent>
              <img
                src={noSearchContent}
                alt="noSearch"
                style={{
                  width: '220px',
                  height: '156px',
                  marginBottom: '20px',
                }}
              />
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                해당 조건에 맞는 콘텐츠가 없어요
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#9f9f9f',
                  marginBottom: '100px',
                }}
              >
                다른 키워드로 검색해보세요
              </div>
            </NoSearchContent>
          ) : data.length === 0 ? (
            <ContentBlank />
          ) : (
            (filteredData.length > 0 ? filteredData : data).map(
              (item, index) => (
                <React.Fragment key={item.seedId || index}>
                  <StyledContentBox>
                    <ContentBox
                      contentId={item.seedId}
                      title={item.seedName}
                      category={item.categoryName}
                      tags={item.tagName}
                      dDay={item.dDay}
                      seedType={item.seedType}
                      thumbnailImage={item.thumbnailImage}
                      message={item.seedDetail || ''}
                      keyword={keyword}
                      open={() => openModal(item)}
                      fetchData={fetchData}
                    />
                  </StyledContentBox>
                  {selectedData && selectedData.seedId === item.seedId && (
                    <ViewThumbnailModal
                      file={item.thumbnailImage}
                      onClose={closeModal}
                      seedType={item.seedType}
                    />
                  )}
                </React.Fragment>
              ),
            )
          )}
        </ContentArea>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          contentPerPage={contentPerPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </MainContent>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  padding-left: 280px;
  position: relative;
`;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  width: 262px;
  z-index: 1;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 90px;
  padding-bottom: 100px;
`;

const ContentArea = styled.div`
  display: ${(props) => (props.$isBlank ? 'flex' : 'grid')};
  justify-content: center;
  align-items: ${(props) => (props.$isBlank ? 'center' : 'stretch')};
  grid-template-columns: ${(props) =>
    !props.$isBlank ? 'repeat(3, 360px)' : 'none'};
  grid-gap: 30px;
  box-sizing: border-box;
  height: auto;
  padding: 0;
  margin-bottom: 75px;
`;

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;

const NoSearchContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export default MainPage;
