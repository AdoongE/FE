import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.78.221.255',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const contentPerPage = 9;
  const [activeTab, setActiveTab] = useState('모아보기');
  const [loading, setLoading] = useState(true);

  // API 호출 함수
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = categoryId
        ? `/api/v1/category/${categoryId}`
        : '/api/v1/category';

      console.log(`GET 요청할 URL: ${url}`);

      const response = await api.get(url);
      const results =
        response.data.results.flatMap(
          (content) =>
            (content.contentsInfoList || []).map((info) => ({
              id: info.contentId,
              title: info.contentName || '제목 없음',
              user: content.nickname || '사용자 정보 없음',
              category:
                info.categoryName && info.categoryName.length > 0
                  ? info.categoryName[0]
                  : '카테고리 없음',
              tags: info.tagName || [],
              dDay: info.dday === 0 ? 'D-DAY' : `D${info.dday}`,
              contentDateType: info.contentDateType,
              thumbnailImage: info.thumbnailImage,
              updatedDt: info.updatedDt,
            })) || [], //contentsInfoList가 undefined일 경우 빈 배열로 설정
        ) || []; //results가 undefined일 경우 빈 배열로 설정

      setSortedData(results);
      console.log('데이터 가져오기 성공:', results);
    } catch (error) {
      console.error(
        'GET 요청으로 데이터 가져오기 에러:',
        error.response ? error.response.data : error,
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      fetchData();
    } else {
      console.log('토큰이 없습니다. 로그인 확인이 필요합니다.');
    }
  }, [fetchData, categoryId, activeTab]);

  // 페이지네이션 관련 함수
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(sortedData.length / contentPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedContentBoxes = sortedData.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  const totalPages = Math.ceil(sortedData.length / contentPerPage);

  const getPaginationNumbers = () => {
    if (sortedData.length === 0) {
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
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCategoryId={setCategoryId}
        />
      </SidebarContainer>
      <MainContent>
        <ContentHeader setSortOrder={() => {}} />
        <ContentArea $isBlank={sortedData.length === 0}>
          {loading ? (
            <div>로딩 중...</div>
          ) : sortedData.length === 0 ? (
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
                contentDateType={data.contentDateType}
                thumbnailImage={data.thumbnailImage}
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
              $active={currentPage === page}
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
  display: ${({ $isBlank }) => ($isBlank ? 'flex' : 'grid')};
  grid-template-columns: ${({ $isBlank }) =>
    $isBlank ? 'none' : 'repeat(3, 1fr)'};
  align-items: ${({ $isBlank }) => ($isBlank ? 'center' : 'start')};
  justify-content: ${({ $isBlank }) => ($isBlank ? 'center' : 'stretch')};
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
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export default MainPage;
