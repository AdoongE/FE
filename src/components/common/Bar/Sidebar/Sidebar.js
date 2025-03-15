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
  );
};

const SideDiv = styled.div`
  height: 100vh;
  width: 262px;
  padding: 0 16px;
  background-color: var(--sidebar);
  display: inline-block;
  position: relative;
`;

const Line = styled.div`
  margin-top: 13px;
  border-top: 1px solid var(--gray3);
`;

export default Sidebar;
