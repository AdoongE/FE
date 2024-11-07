import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9; // 페이지당 표시할 ContentBox 수

  // 목데이터 생성
  const mockData = Array.from({ length: 46 }, (_, i) => ({
    id: i + 1,
    title: `콘텐츠 ${i + 1}`,
    description: `이것은 콘텐츠 ${i + 1}의 설명입니다.`,
    user: `사용자 ${i + 1}`,
    category: `카테고리 ${(i % 5) + 1}`,
  }));

  // ContentBox 데이터를 동적으로 생성
  const contentBoxes = mockData.map((data) => (
    <ContentBox
      key={data.id}
      title={data.title}
      user={data.user}
      category={data.category}
    />
  ));

  // 페이지 계산을 위한 totalPages 정의
  const totalPages = Math.ceil(contentBoxes.length / contentPerPage);

  // 현재 페이지에 맞는 ContentBox 목록 계산
  const displayedContentBoxes = contentBoxes.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 페이지 번호를 계산하여 반환하는 함수
  const getPaginationNumbers = () => {
    const startPage = Math.max(1, currentPage - 4); // 현재 페이지 기준으로 4페이지 앞
    const endPage = Math.min(startPage + 4, totalPages); // 최대 5페이지 표시

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <MainContainer>
      <Navbar />
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <MainContent>
        <ContentHeaderArea>
          <ContentHeader />
        </ContentHeaderArea>

        <ContentArea>
          {displayedContentBoxes} {/*ContentBox 배열*/}
        </ContentArea>

        <Pagination>
          {/* 이전 페이지 버튼 */}
          <PageArrow
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </PageArrow>

          {/* 페이지 번호 */}
          {getPaginationNumbers().map((pageNumber) => (
            <PageNumber
              key={pageNumber}
              active={currentPage === pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PageNumber>
          ))}

          {/* 다음 페이지 버튼 */}
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

const ContentHeaderArea = styled.div`
  padding: 20px;
  margin-left: 45px;
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
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
