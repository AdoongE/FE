import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ViewContent from '../components/ViewContent';

function ContentViewPage() {
  const [activeTab, setActiveTab] = useState('모아보기'); // activeTab과 setActiveTab 정의

  return (
    <MainContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content>
        <ViewContent />
      </Content>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14vh;
  padding-left: 10vh;
`;

export default ContentViewPage;
