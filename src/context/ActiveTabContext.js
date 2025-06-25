import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('회원정보수정');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/mypage')) setActiveTab('회원정보수정');
    else if (path.includes('/info')) setActiveTab('공지사항');
    else if (path.includes('/terms')) setActiveTab('이용약관');
    else if (path.includes('/question')) setActiveTab('FAQ');
  }, [location.pathname]);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => useContext(ActiveTabContext);
