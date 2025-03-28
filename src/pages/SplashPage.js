import React, { useRef } from 'react';
import styled from 'styled-components';
import SplashBar from '../components/bar/SplashBar';
import LoginModal from '../components/modal/LoginModal';
import splashImg from '../assets/icons/splashImg.png';

function SplashPage() {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <SplashBar />
      <Page>
        <Words>
          <Short>링크, 이미지, 문서까지 한 곳에!</Short>
          <Long>
            여기저기 저장된 당신의 콘텐츠
            <br />
            이젠 seedzip에 모으고,
            <br />
            잊지 않게 관리해보세요!
          </Long>
          <StartButton onClick={showModal}>seedzip 시작하기</StartButton>
        </Words>
        <SplashImg src={splashImg} alt="splashImg" />
      </Page>
      <LoginModal ref={dialogRef} />
    </div>
  );
}

const Page = styled.div`
  background-color: #f9fffe;
  width: 100%;
  display: flex;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column;
  margin: 259px 143px 0px 72px;
`;

const SplashImg = styled.img`
  margin-top: 169.64px;
  width: 536.357px;
  height: 536.357px;
`;

const StartButton = styled.button`
  width: 281px;
  height: 53px;
  border-radius: 8px;
  border: 0;
  padding: 12px 50px;
  background-color: #41c3ab;
  color: white;
  font-weight: 600;
  font-size: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const Short = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #4f4f4f;
  margin-bottom: 16px;
`;

const Long = styled.div`
  font-weight: 600;
  font-size: 50px;
  line-height: 140%;
`;

export default SplashPage;
