import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9; // 페이지당 표시할 ContentBox 수

  // ContentBox 데이터를 동적으로 생성
  const contentBoxes = Array.from({ length: 23 }, (_, i) => (
    <ContentBox key={i} />
  ));
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
          {displayedContentBoxes.map((contentBox) => contentBox)}
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
          {Array.from({ length: totalPages }, (_, i) => (
            <PageNumber
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
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
  margin-buttom: 58ox;
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
