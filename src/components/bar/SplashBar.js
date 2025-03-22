import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';
import LogoImage from '../../assets/icons/seedzip_logo.png';
import Logo from '../../assets/icons/seedzip.png';

function SplashBar() {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  const showModal = () => {
    dialogRef.current?.showModal();
  };
  return (
    <div>
      <Bar>
        <LogoContainer>
          <StyledLogoImage
            src={LogoImage}
            alt="seedzip_logo"
            onClick={() => navigate('/main')}
          />
          <StyledLogo
            src={Logo}
            alt="seedzip"
            onClick={() => navigate('/main')}
          />
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
  width: 27px;
  height: 27px;
  margin-left: 24px;
`;

const StyledLogo = styled.img`
  width: 111px;
  height: 30px;
  margin-left: 7.5px;
  margin-top: 7px;
`;

const LoginButton = styled.button`
  width: 78px;
  height: 36px;
  border-radius: 28px;
  padding: 8px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  position: absolute;
  top: 1.875vw;
  right: 2.083vw;
`;

const Bar = styled.div`
  width: 100%;
  height: 84px;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 7.5px 1.5px rgba(0, 0, 0, 0.07);
  top: 0;
`;

export default SplashBar;
