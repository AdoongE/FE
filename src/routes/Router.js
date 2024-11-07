import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../pages/MainPage';
import ContentAddPage from '../pages/ContentAddPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/content-add" element={<ContentAddPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
