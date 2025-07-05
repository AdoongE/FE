import { Icon } from '@iconify/react';
import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/icons/seedzip_logo.png';
import Logo from '../../assets/icons/seedzip.png';
import handleKakaoLogin from '../../components/api/auth/Kakao';
import handleGoogleLogin from '../../components/api/auth/Google';
import handleNaverLogin from '../../components/api/auth/Naver';

const LoginModal = forwardRef((props, ref) => {
  const closeModal = () => {
    ref.current?.close();
  };

  useEffect(() => {
    if (ref.current) {
      const dialogElement = ref.current;

      const handleClickOutside = (event) => {
        //getBoundingClientRect() 메서드를 사용해서 모달(dialogElement)의 위치와 크기 정보를 가져옴
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      };

      //모달이 클릭될 때마다 해당 함수가 실행되어, 모달 바깥이 클릭되었는지를 체크하고 모달을 닫음
      dialogElement.addEventListener('click', handleClickOutside);

      return () => {
        //클린업 함수로, 메모리 누수 방지와 정상적인 동작 보장
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, [ref]);

  return (
    <Dialog ref={ref}>
      <CloseIcon onClick={closeModal} icon="mingcute:close-line" />
      <Contents>
        <StyledLogoImage src={LogoImage} alt="seedzip_logo" />
        <StyledLogo src={Logo} alt="seedzip" />
        <Sentence>
          당신만의 인사이트를 놓치지 않게
          <br />
          seedzip으로 콘텐츠를 한 곳에 모아 관리하세요!
        </Sentence>
        <Logins>
          <LoginButtons type="kakao" onClick={handleKakaoLogin}>
            <SocialLogo icon="raphael:bubble" />
            카카오톡으로 로그인하기
          </LoginButtons>
          <LoginButtons type="naver" onClick={handleNaverLogin}>
            <SocialLogo icon="simple-icons:naver" />
            네이버로 로그인하기
          </LoginButtons>
          <LoginButtons type="google" onClick={handleGoogleLogin}>
            {' '}
            <GoogleLogo icon="flat-color-icons:google" />
            구글로 로그인하기
          </LoginButtons>
        </Logins>
      </Contents>
    </Dialog>
  );
});

const GoogleLogo = styled(Icon)`
  width: 23px;
  height: 23px;
  margin-right: 8px;
`;

const SocialLogo = styled(Icon)`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const CloseIcon = styled(Icon)`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 36px;
  right: 36px;
`;

const LoginButtons = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 58px;
  border-radius: 4px;
  border: 0;
  font-weight: 500;
  font-size: 17.875px;
  line-height: 100%;

  background-color: ${(props) =>
    props.type === 'kakao'
      ? '#FEE500'
      : props.type === 'naver'
        ? '#03C75A'
        : '#F2F2F2'};
  color: ${(props) =>
    props.type === 'kakao'
      ? 'black'
      : props.type === 'naver'
        ? 'white'
        : '#4F4F4F'};
`;

const Logins = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Sentence = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 47px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 101px;
`;

const StyledLogo = styled.img`
  width: 193px;
  height: 52px;
  margin-top: 4px;
`;

const StyledLogoImage = styled.img`
  width: 48px;
  height: 48px;
  transform: translateX(-8px);
`;

const Dialog = styled.dialog`
  width: 520px;
  height: 620px;
  border-radius: 40px;
  border: 0;
  box-shadow: 0px 0px 4.235px 0px rgba(0, 0, 0, 0.3);
  position: relative;
  padding: 0;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

LoginModal.displayName = 'LoginModal';

export default LoginModal;
