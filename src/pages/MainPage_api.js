import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9; // 페이지당 표시할 ContentBox 수

  const [contentBoxes, setContentBoxes] = useState([]); // API로부터 가져온 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  // API 호출 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/content', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT 토큰 가져오기
        },
      });
      setContentBoxes(response.data.results); // API 응답에서 결과 데이터 설정
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

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
          {loading ? (
            <div>Loading...</div> // 로딩 중일 때 표시
          ) : (
            displayedContentBoxes.map((data) => (
              <ContentBox
                key={data.contentId} // API 데이터의 contentId 사용
                title={data.contentName}
                user={data.user} // API 데이터에서 사용자 이름
                category={data.category} // API 데이터에서 카테고리 이름
              />
            ))
          )}
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
              onClick={() => handlePageChange(i + 1)}
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
  margin-bottom: 58px;
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
