import styled from 'styled-components';
import { useState, useEffect } from 'react';

import TabButton from './TabButton/index';
import AllCategory from './AllCategory/index';
import CustomFilter from './CustomFilter/index';
import { CategoriesProvider } from './CategoryContext';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('');
  const [, setFilterId] = useState('');
  const [, setFilterName] = useState('');

  useEffect(() => {
    setActiveTab('나의 씨드');
  }, [setActiveTab]);

  return (
    <StMainPage>
      <SideDiv>
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} />
        <Line />
        <CategoriesProvider>
          <AllCategory setActiveTab={setActiveTab} />
        </CategoriesProvider>
        <Line />
        <CustomFilter
          setActiveTab={setActiveTab}
          setFilterId={setFilterId}
          setFilterName={setFilterName}
        />
      </SideDiv>
    </StMainPage>
  );
};

const StMainPage = styled.div`
  background-color: white;
`;

const SideDiv = styled.div`
  height: 100vh;
  width: 18.28125vw;
  background-color: #f8fbfb;
  display: inline-block;
  position: relative;
`;

const Line = styled.div`
  margin-top: 1.563vw; /* 30px */
  border-top: 0.052vw solid #dcdada; /* 1px */
  margin-left: 1.042vw; /* 20px */
  margin-right: 1.042vw; /* 20px */
`;

export default Sidebar;
