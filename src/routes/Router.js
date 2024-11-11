import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../pages/MainPage';
// import ContentAddPage from '../pages/ContentAddPage';
// import SplashPage from '../pages/SplashPage';
// import KakaoRedirect from '../components/api/KakaoRedirect';
// import SignupPage from '../pages/SignupPage';
// import ImageUploadComponent from '../components/ImageUpload';
// import PdfUploadComponent from '../components/PdfUpload';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SplashPage />} /> */}
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/kakao/callback" element={<KakaoRedirect />} /> */}
        {/* <Route path="/content-add" element={<ContentAddPage />} /> */}
        {/* <Route path="/image-upload" element={<ImageUploadComponent />} /> */}
        {/* <Route path="/pdf-upload" element={<PdfUploadComponent />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
