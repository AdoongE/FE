import styled from 'styled-components';
import { React } from 'react';
import Sidebar from '../components/Sidebar';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';

const MainPage = () => {
  return (
    <StMainPage>
      <Sidebar />
      <ContentHeader />
      <ContentBox />
    </StMainPage>
  );
};

const StMainPage = styled.div``;

export default MainPage;
