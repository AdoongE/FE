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
        <QAButton onClick={() => navigate('/freq-question')}>
          자주 묻는 질문
        </QAButton>
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

const QAButton = styled.button`
  width: fit-content;
  border-radius: 28px;
  padding: 9.5px 20.5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #4f4f4f;
  background-color: #def3f1;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  position: absolute;
  top: 24px;
  right: 124px;
`;

const LoginButton = styled.button`
  width: fit-content;
  border-radius: 28px;
  padding: 9.5px 20.5px;
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
  top: 24px;
  right: 30px;
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
