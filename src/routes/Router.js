import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../pages/MainPage';
// import ContentAddPage from '../pages/ContentAddPage';
// import SplashPage from '../pages/SplashPage';
// import KakaoRedirect from '../components/api/KakaoRedirect';
// import SignupPage from '../pages/SignupPage';
// import AddContent from '../components/AddContent';
// import ContentViewPage from '../pages/ContentViewPage';
// import ContentEditPage from '../pages/ContentEditPage';
// import MyPage from '../pages/MyPage';
// import ServiceConsent from '../pages/consents/ServiceConsent';
// import PersonalConsent from '../pages/consents/PersonalConsent';
// import MarketingConsent from '../pages/consents/MarketingConsent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SplashPage />} /> */}
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/kakao/callback" element={<KakaoRedirect />} />
        <Route path="/content" element={<AddContent />} />
        <Route path="/content-add" element={<ContentAddPage />} />
        <Route path="/content-view" element={<ContentViewPage />} />
        <Route path="/content-edit/:Id" element={<ContentEditPage />} />
        <Route path="/service-consent" element={<ServiceConsent />} />
        <Route path="/personal-consent" element={<PersonalConsent />} />
        <Route path="/marketing-consent" element={<MarketingConsent />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
