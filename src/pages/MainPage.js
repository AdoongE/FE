import styled from 'styled-components';
import { React } from 'react';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';

const MainPage = () => {
  return (
    <StMainPage>
      <ContentHeader />
      <ContentBox />
    </StMainPage>
  );
};

const StMainPage = styled.div``;

export default MainPage;
