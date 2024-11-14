import { Icon } from '@iconify/react';
import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/icons/logo.png';

const LoginModal = forwardRef((props, ref) => {
  const REST_API_KEY = 'c070041b0cad704dd796871d5f281434';
  const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

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
      <Icon
        onClick={closeModal}
        icon="material-symbols-light:close"
        style={{
          width: '30px',
          height: '30px',
          position: 'absolute',
          top: '40px',
          right: '40px',
        }}
      />
      <Contents>
        <LogoBox src={Logo} />
        <Sentence>
          당신만의 인사이트를 놓치지 않게
          <br />
          seedzip으로 콘텐츠를 한 곳에 모아 관리하세요!
        </Sentence>
        <Logins>
          <LoginButtons type="kakao" onClick={loginHandler}>
            <Icon
              icon="raphael:bubble"
              style={{
                width: '38.85px',
                height: '17.59px',
                color: 'black',
                marginRight: '-2.79px',
              }}
            />
            카카오톡으로 로그인하기
          </LoginButtons>
          <LoginButtons type="naver">
            {' '}
            <Icon
              icon="simple-icons:naver"
              style={{
                width: '18.85px',
                height: '18.85px',
                color: 'white',
                marginRight: '5.99px',
              }}
            />
            네이버로 로그인하기
          </LoginButtons>
          <LoginButtons type="google">
            {' '}
            <Icon
              icon="flat-color-icons:google"
              style={{
                width: '32.2px',
                height: '32.2px',
                marginRight: '5.79px',
              }}
            />
            구글로 로그인하기
          </LoginButtons>
        </Logins>
      </Contents>
    </Dialog>
  );
});

const LoginButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 391.16px;
  height: 70.69px;
  border-radius: 5.24px;
  border: 0;
  font-weight: 500;
  font-size: 20px;

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
  row-gap: 20.69px;
`;

const Sentence = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 31.2px;
  text-align: center;
  margin-top: 28.33px;
  margin-bottom: 63px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 98px;
`;

const LogoBox = styled.img`
  width: 289px;
  height: 126.66px;
`;

const Dialog = styled.dialog`
  width: 614px;
  height: 734px;
  border-radius: 54.98px;
  border: 0;
  box-shadow: 0px 0px 5px 0px #0000004d;
  position: relative;
  ::backdrop {
    background-color: #0000008c;
  }
`;

LoginModal.displayName = 'LoginModal';

export default LoginModal;
