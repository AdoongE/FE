import React, { useRef } from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';
import LogoImage from '../../assets/icons/seedzip_logo.png';
import Logo from '../../assets/icons/seedzip.png';

function SplashBar() {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };
  return (
    <div>
      <Bar>
        <LogoContainer>
          <StyledLogoImage src={LogoImage} alt="seedzip_logo" />
          <StyledLogo src={Logo} alt="seedzip" />
        </LogoContainer>
        <LoginButton onClick={showModal}>로그인</LoginButton>
      </Bar>
      <LoginModal ref={dialogRef} />
    </div>
  );
}

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoImage = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 40px;
`;

const StyledLogo = styled.img`
  width: 148px;
  height: 40px;
  margin-left: 16px;
  margin-top: 12px;
`;

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
  margin-left: 16px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.05);
`;

export default SplashBar;
