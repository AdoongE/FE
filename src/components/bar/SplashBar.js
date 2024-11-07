import React, { useRef } from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';

function SplashBar() {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };
  return (
    <div>
      <Bar>
        <Logo>
          <LogoImg />
          <LogoName>seedzip</LogoName>
        </Logo>
        <LoginButton onClick={showModal}>로그인</LoginButton>
      </Bar>
      <LoginModal ref={dialogRef} />
    </div>
  );
}

const LoginButton = styled.button`
  width: 107px;
  height: 45px;
  border-radius: 40.32px;
  padding: 12px 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 17.74px;
  border: 0;
  position: absolute;
  top: 36px;
  right: 40px;
`;

const Bar = styled.div`
  width: 100%;
  height: 118px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 49px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 28px;
  height: 26px;
  background-color: #41c3ab;
`;

const LogoName = styled.div`
  font-weight: 700;
  font-size: 40px;
  margin-left: 16px;
`;

export default SplashBar;
