import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../pages/MainPage';
import ContentAddPage from '../pages/ContentAddPage';
import SplashPage from '../pages/SplashPage';
import SignupPage from '../pages/SignupPage';
import AddContent from '../components/AddContent';
import ContentViewPage from '../pages/ContentViewPage';
import ContentEditPage from '../pages/ContentEditPage';
import MyPage from '../pages/Mypage/MyPage';
import ServiceConsent from '../pages/consents/ServiceConsent';
import PersonalConsent from '../pages/consents/PersonalConsent';
import MarketingConsent from '../pages/consents/MarketingConsent';
import SocialLogin from '../components/api/auth/SocialLoginApi';
import SidebarLayout from '../components/bar/SidebarLayout';
import TermsPage from '../pages/Mypage/TermsPage';
import InfoPage from '../pages/Mypage/InfoPage';
import QuestionPage from '../pages/Mypage/QuestionPage';
import InfoDetailPage from '../pages/Mypage/InfoDetailPage';
import { ActiveTabProvider } from '../context/ActiveTabContext';
import { SignupProvider } from '../context/SignupContext';

const Router = () => {
  return (
    <BrowserRouter>
      <ActiveTabProvider>
        <SignupProvider>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/kakao/callback"
              element={<SocialLogin socialType="kakao" />}
            />
            <Route
              path="/google/callback"
              element={<SocialLogin socialType="google" />}
            />
            <Route
              path="/naver/callback"
              element={<SocialLogin socialType="naver" />}
            />
            <Route path="/content" element={<AddContent />} />
            <Route path="/content-add" element={<ContentAddPage />} />
            <Route path="/content-view" element={<ContentViewPage />} />
            <Route path="/content-edit/:Id" element={<ContentEditPage />} />
            <Route path="/service-consent" element={<ServiceConsent />} />
            <Route path="/personal-consent" element={<PersonalConsent />} />
            <Route path="/marketing-consent" element={<MarketingConsent />} />
            <Route element={<SidebarLayout />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/info-detail/:Id" element={<InfoDetailPage />} />
              <Route path="/question" element={<QuestionPage />} />
            </Route>
          </Routes>
        </SignupProvider>
      </ActiveTabProvider>
    </BrowserRouter>
  );
};

export default Router;
