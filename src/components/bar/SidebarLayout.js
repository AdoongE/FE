import React from 'react';
import styled from 'styled-components';
import MypageSidebar from './MypageSidebar';
import { Outlet } from 'react-router-dom';

function SidebarLayout() {
  return (
    <LayoutWrapper>
      <StyledSidebar>
        <MypageSidebar />
      </StyledSidebar>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: auto;
  overflow: visible;
`;

const StyledSidebar = styled.div`
  width: 262px;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  padding: 24px;
  background-color: white;
`;

export default SidebarLayout;
