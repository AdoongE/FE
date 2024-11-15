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
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('모아보기');
  const [categoryId, setCategoryId] = useState(null);

  // 전체 콘텐츠 조회 API 호출 함수
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let url = '';
      if (activeTab == '모아보기') {
        url = '/api/v1/content/';
      } else if (activeTab !== '모아보기' && categoryId) {
        url = `/api/v1/content/${categoryId}`;
      }
      console.log('너 뭐야', activeTab);
      console.log(`GET 요청할 URL: ${url}`);

      const response = await api.get(url);

      // 응답 데이터 전체 확인
      console.log('응답 데이터:', response.data);

      // contentsInfoList에서 데이터를 추출하여 매핑
      const results =
        response.data.results?.flatMap(
          (item) =>
            item.contentsInfoList?.map((content) => ({
              id: content.contentId || 'ID 없음',
              title: content.contentName || '제목 없음',
              user: item.nickname || '사용자 정보 없음',
              category: content.categoryName?.[0] || '카테고리 없음',
              tags: content.tagName || [],
              contentDateType: content.contentDateType || '타입 없음',
              thumbnailImage: content.thumbnailImage || '이미지 없음',
              updatedDt: content.updatedDt || '업데이트 정보 없음',
            })) ?? [], // 내부 배열이 undefined인 경우 빈 배열 반환
        ) ?? []; // 최종 결과가 undefined인 경우 빈 배열 반환

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
  }, [activeTab, categoryId]);

  // 전체 콘텐츠를 기본으로 로드
  useEffect(() => {
    fetchData(); // 전체 콘텐츠 로드
  }, [fetchData]);

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
            sortedData.map((data) => (
              <ContentBox
                key={data.id} // 고유한 key 값 추가
                title={data.title}
                user={data.user}
                category={data.category}
                tags={data.tags}
                contentDateType={data.contentDateType}
                thumbnailImage={data.thumbnailImage}
              />
            ))
          )}
        </ContentArea>
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

export default MainPage;
