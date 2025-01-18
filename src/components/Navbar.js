import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/icons/seedzip_logo.png';
import Logo from '../assets/icons/seedzip.png';
import ProfileImage from '../assets/icons/profile.png';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CheckboxModal from './modal/CheckboxModal';

function Navbar() {
  const [activeTab, setActiveTab] = useState('모아보기'); // 상단바 내부 전용 상태
  const [activeBarWidth, setActiveBarWidth] = useState(0); // ActiveBar 너비
  const [activeBarLeft, setActiveBarLeft] = useState(0); // ActiveBar 위치
  const navbarMenuRef = useRef(null); // Navbar 메뉴 참조
  const navigate = useNavigate();
  const dialogRef = useRef();

  // 탭 클릭 시 ActiveBar의 위치와 너비 업데이트
  const handleTabClick = (tabName, event) => {
    setActiveTab(tabName); // 탭 클릭 시 활성화된 탭 설정
    const button = event.currentTarget;
    const { offsetWidth, offsetLeft } = button;

    setActiveBarWidth((offsetWidth / window.innerWidth) * 100); // px -> vw 변환
    setActiveBarLeft((offsetLeft / window.innerWidth) * 100); // px -> vw 변환

    if (tabName === '모아보기') {
      window.location.reload(); // 페이지 새로 고침
    }
  };

  const handleLogoClick = () => {
    navigate('/main'); // 로고 클릭 시 '/main'으로 이동
    window.location.reload(); // 페이지 새로 고침
  };

  // 초기 ActiveBar 설정
  useEffect(() => {
    const activeButton = navbarMenuRef.current?.querySelector(
      `[data-tab="${activeTab}"]`,
    );
    if (activeButton) {
      const { offsetWidth, offsetLeft } = activeButton;

      setActiveBarWidth((offsetWidth / window.innerWidth) * 100); // px -> vw 변환
      setActiveBarLeft((offsetLeft / window.innerWidth) * 100); // px -> vw 변환
    }
  }, [activeTab]);

  // 화면 크기 변경 시 ActiveBar 재계산
  useEffect(() => {
    const handleResize = () => {
      const activeButton = navbarMenuRef.current?.querySelector(
        `[data-tab="${activeTab}"]`,
      );
      if (activeButton) {
        const { offsetWidth, offsetLeft } = activeButton;

        setActiveBarWidth((offsetWidth / window.innerWidth) * 100); // px -> vw 변환
        setActiveBarLeft((offsetLeft / window.innerWidth) * 100); // px -> vw 변환
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab]);

  const handleNewContentClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      console.log('모달 열기');
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      console.log('dialogRef:', dialogRef.current);
    } else {
      console.error('dialogRef가 올바르게 연결되지 않았습니다.');
    }
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      const dialogElement = dialogRef.current;

      const handleClickOutside = (event) => {
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
      dialogElement.addEventListener('mousedown', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  return (
    <NavbarContainer>
      <LogoContainer>
        <StyledLogoImage
          src={LogoImage}
          alt="seedzip_logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }} // 클릭 가능 표시
        />
        <StyledLogo
          src={Logo}
          alt="seedzip"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }} // 클릭 가능 표시
        />
      </LogoContainer>
      <NavbarMenu ref={navbarMenuRef}>
        <MenuButton
          data-tab="모아보기"
          onClick={(e) => {
            handleTabClick('모아보기', e);
            navigate('/main'); // "모아보기" 클릭 시 메인 페이지 이동
          }}
          active={activeTab === '모아보기'}
        >
          모아보기
        </MenuButton>
        <MenuButton
          data-tab="탐색하기"
          onClick={(e) => handleTabClick('탐색하기', e)}
          active={activeTab === '탐색하기'}
        >
          탐색하기
        </MenuButton>
        <ActiveBar width={activeBarWidth} left={activeBarLeft} />
      </NavbarMenu>
      <NavbarRight>
        <Icon
          icon="iconoir:bell"
          width="1.5625vw"
          height="1.5625vw"
          style={{ color: 'black' }}
        />
        <NewContentButton onClick={handleNewContentClick}>
          <Icon
            icon="iconoir:plus"
            width="1.5625vw"
            height="1.5625vw"
            style={{ color: '#00000' }}
          />
          새로운 씨드
        </NewContentButton>
        <Profile
          src={ProfileImage}
          alt="profile"
          onClick={() => navigate('/mypage')}
          style={{ cursor: 'pointer' }}
        />
      </NavbarRight>
      <CheckboxModal ref={dialogRef} />
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.146vw; /* 118px */
  border-bottom: 0.052vw solid #ffffff; /* 1px */
  box-shadow: 0 0.104vw 0.26vw rgba(0, 0, 0, 0.1); /* 0 2px 5px */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
`;

const LogoContainer = styled.div`
  display: flex;
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

const NavbarMenu = styled.div`
  display: flex;
  gap: 3.333vw; /* 64px */
  position: fixed;
  left: 20.729vw; /* 398px */
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  color: #666;
  padding: 0.708vw; /* 13.6px */
  font-size: 1.354vw; /* 26px */
  margin-left: 2.76vw; /* 53px */
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 0.521vw; /* 10px */
  }
`;

const ActiveBar = styled.div`
  position: absolute;
  width: ${({ width }) => width}vw;
  height: 0.365vw;
  background-color: #41c3ab;
  bottom: -1.8vw;
  left: ${({ left }) => left}vw;
  transition:
    width 0.3s ease,
    left 0.3s ease;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.833vw; /* 16px */
  position: absolute;
  right: 2.083vw; /* 40px */
  top: 50%;
  transform: translateY(-50%);
`;

const NewContentButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #41c3ab;
  font-size: 0.924vw; /* 17.742px */
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
  border: none;
  width: 8.342vw; /* 160.19px */
  height: 2.51vw; /* 48.19px */
  border-radius: 2.101vw; /* 40.323px */
  cursor: pointer;
  margin-left: 0.521vw; /* 10px */
  padding: 0.521vw; /* 10px */
  gap: 0.156vw; /* 3px */

  svg {
    margin-left: 0.521vw; /* 10px */
  }
`;

const Profile = styled.img`
  width: 2.5vw; /* 48px */
  height: 2.5vw; /* 48px */
  margin-left: 0.521vw; /* 10px */
`;

export default Navbar;
