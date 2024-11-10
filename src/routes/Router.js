import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../pages/MainPage';
import ContentAddPage from '../pages/ContentAddPage';
import SplashPage from '../pages/SplashPage';
import KakaoRedirect from '../components/api/KakaoRedirect';
import SignupPage from '../pages/SignupPage';
import AddContent from '../components/AddContent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/kakao/callback" element={<KakaoRedirect />} />
        <Route path="/content" element={<AddContent />} />
        <Route path="/content-add" element={<ContentAddPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
