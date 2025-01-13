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
  width: 1.875vw; /* 36px */
  height: 1.875vw; /* 36px */
  margin-left: 2.083vw; /* 40px */
`;

const StyledLogo = styled.img`
  width: 7.708vw; /* 148px */
  height: 2.083vw; /* 40px */
  margin-left: 0.833vw; /* 16px */
  margin-top: 0.625vw; /* 12px */
`;

const LoginButton = styled.button`
  width: 5.573vw; /* 107px */
  height: 2.344vw; /* 45px */
  border-radius: 2.1vw; /* 40.32px */
  padding: 0.625vw 1.563vw; /* 12px 30px */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 0.924vw; /* 17.74px */
  border: 0;
  position: absolute;
  top: 1.875vw; /* 36px */
  right: 2.083vw; /* 40px */
`;

const Bar = styled.div`
  width: 100%;
  height: 6.146vw; /* 118px */
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0.156vw 0.052vw rgba(0, 0, 0, 0.05); /* 0px 0px 3px 1px */
  top: 0;
`;

export default SplashBar;
