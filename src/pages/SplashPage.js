import React, { useRef } from 'react';
import styled from 'styled-components';
import SplashBar from '../components/bar/SplashBar';
import LoginModal from '../components/modal/LoginModal';

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
        <SplashImg src="/splashImg.png" alt="spashImg" />
      </Page>
      <LoginModal ref={dialogRef} />
    </div>
  );
}

const SplashImg = styled.img`
  margin-top: 75px;
  width: 774px;
  height: 774px;
`;

const Page = styled.div`
  background-color: #f9fffe;
  height: calc(100vh - 118px);
  width: 100%;
  display: flex;
`;

const Words = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  margin-top: 255px;
  margin-right: 250px;
`;

const StartButton = styled.button`
  width: 341px;
  height: 68px;
  border-radius: 10px;
  border: 0;
  padding: 16px 60px;
  background-color: #41c3ab;
  color: white;
  font-weight: 600px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

const Short = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #4f4f4f;
  margin-bottom: 25px;
`;

const Long = styled.div`
  font-weight: 600;
  font-size: 54px;
  line-height: 75.6px;
`;

export default SplashPage;
