import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ViewContent from '../components/ViewContent';

function ContentViewPage() {
  const [activeTab, setActiveTab] = useState('모아보기'); // activeTab과 setActiveTab 정의

  return (
    <MainContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content>
        <ViewContent />
      </Content>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  margin: auto;
  margin-top: 160px;
`;

export default ContentViewPage;
