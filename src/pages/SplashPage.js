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
  height: 50.1vw;
  width: 100%;
  display: flex;
`;

const Words = styled.div`
  margin-left: 5.208vw; /* 100px */
  display: flex;
  flex-direction: column;
  margin-top: 13.281vw;
  margin-right: 13.021vw;
`;

const SplashImg = styled.img`
  margin-top: 3.906vw; /* 75px */
  width: 40.313vw; /* 774px */
  height: 40.313vw; /* 774px */
`;

const StartButton = styled.button`
  width: 17.76vw; /* 341px */
  height: 3.542vw; /* 68px */
  border-radius: 0.521vw; /* 10px */
  border: 0;
  padding: 0.833vw 3.125vw; /* 16px 60px */
  background-color: #41c3ab;
  color: white;
  font-weight: 600; /* px 제거 */
  font-size: 1.563vw; /* 30px */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5vw; /* 48px */
`;

const Short = styled.div`
  font-weight: 500;
  font-size: 1.563vw; /* 30px */
  color: #4f4f4f;
  margin-bottom: 1.302vw; /* 25px */
`;

const Long = styled.div`
  font-weight: 600;
  font-size: 2.813vw; /* 54px */
  line-height: 3.938vw; /* 75.6px */
`;

export default SplashPage;
