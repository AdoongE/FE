// CategoriesContext.js
import React, { createContext, useState, useContext } from 'react';

// Context 생성
const CategoriesContext = createContext();

// Provider 컴포넌트
export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// 커스텀 Hook (Context 값 사용하기)
export const useCategories = () => {
  return useContext(CategoriesContext);
};
