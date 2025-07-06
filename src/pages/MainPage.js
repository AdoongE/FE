import React, { useState, useEffect, useCallback } from 'react';
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
  const [data, setData] = useState([]);
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
  const [searchState, setSearchState] = useState(false);
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState('');

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  const seedTypeMapping = {
    IMAGE: '이미지',
    LINK: '링크',
    PDF: 'PDF',
  };

  const fetchData = useCallback(
    async (page = 0) => {
      try {
        setLoading(true);
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

        const response = await axiosInstance.get('/api/v1/seed', { params });
        const result = response.data.results[0];
        setData(result.seedInfoList || []);
        setTotalPages(result.pageInfo.totalPages || 1);
        setSearchState(false);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [contentPerPage, sortOrder, localSelectedFormat],
  );

  useEffect(() => {
    fetchData(currentPage - 1);
  }, [fetchData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const categoryCounts =
    data &&
    data.reduce((counts, item) => {
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
          ) : data.length === 0 ? (
            <ContentBlank />
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
          ) : (
            data.map((item, index) => (
              <React.Fragment key={item.seedId || index}>
                <StyledContentBox>
                  <ContentBox
                    contentId={item.seedId}
                    title={item.seedName}
                    category={item.categoryName}
                    tags={item.tagName}
                    dDay={item.dDay}
                    contentDateType={item.seedType}
                    thumbnailImage={item.thumbnailImage}
                    updatedDt={item.updatedDt}
                    message={item.message || ''}
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
            ))
          )}
        </ContentArea>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          contentPerPage={contentPerPage}
          onPageChange={handlePageChange}
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
