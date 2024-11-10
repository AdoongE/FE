import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainPage = () => {
  const [sortOrder, setSortOrder] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const contentPerPage = 9;
  const [activeTab, setActiveTab] = useState('모아보기');

  // //목데이터
  // const [mockData] = useState(
  //   Array.from({ length: 46 }, (_, i) => ({
  //     id: i + 1,
  //     title: `콘텐츠 ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
  //     description: `이것은 콘텐츠 ${i + 1}의 설명입니다.`,
  //     user: `사용자 ${i + 1}`,
  //     category: `카테고리 ${(i % 5) + 1}`,
  //     tags: Array.from(
  //       { length: Math.floor(Math.random() * 3) + 1 },
  //       (_, j) => `태그 ${j + 1}`,
  //     ),
  //     dDay: Math.floor(Math.random() * 366) * -1,
  //     createdAt: new Date(
  //       Date.now() - Math.floor(Math.random() * 365) * 86400000,
  //     ),
  //   })),
  // );

  //빈콘텐츠 화면용 목데이터
  const [mockData] = useState([]);

  useEffect(() => {
    const sorted = [...mockData].sort((a, b) => {
      if (sortOrder === '최신순') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === '이름순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortOrder, mockData]);

  const displayedContentBoxes = sortedData.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(mockData.length / contentPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(mockData.length / contentPerPage);

  const getPaginationNumbers = () => {
    if (sortedData.length === 0) {
      // 빈 콘텐츠일 경우 <1>만 반환
      return [1];
    }

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(startPage + 4, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <MainContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarContainer>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </SidebarContainer>
      <MainContent>
        <ContentHeader setSortOrder={setSortOrder} />
        <ContentArea isBlank={sortedData.length === 0}>
          {sortedData.length === 0 ? (
            <ContentBlank />
          ) : (
            displayedContentBoxes.map((data) => (
              <ContentBox
                key={data.id}
                title={data.title}
                user={data.user}
                category={data.category}
                tags={data.tags}
                dDay={data.dDay}
              />
            ))
          )}
        </ContentArea>
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
              active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageNumber>
          ))}
          <PageArrow
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </PageArrow>
        </Pagination>
      </MainContent>
    </MainContainer>
  );
};

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
  display: ${({ isBlank }) => (isBlank ? 'flex' : 'grid')};
  grid-template-columns: ${({ isBlank }) =>
    isBlank ? 'none' : 'repeat(3, 1fr)'};
  align-items: ${({ isBlank }) => (isBlank ? 'center' : 'start')};
  justify-content: ${({ isBlank }) => (isBlank ? 'center' : 'stretch')};
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 118px 0;
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
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#999')};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export default MainPage;
