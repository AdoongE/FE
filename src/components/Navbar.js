import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/icons/seedzip_logo.png';
import Logo from '../assets/icons/seedzip.png';
import ProfileImage from '../assets/icons/profile.png';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CheckboxModal from './modal/CheckboxModal';

function Navbar({ activeTab, setActiveTab }) {
  const [activeBarWidth, setActiveBarWidth] = useState(0); // ActiveBar 너비
  const [activeBarLeft, setActiveBarLeft] = useState(0); // ActiveBar 위치
  const navbarMenuRef = useRef(null);
  const navigate = useNavigate();
  const dialogRef = useRef();

  const handleLogoClick = () => {
    navigate('/main');
    window.location.reload();
  };

  // 초기 ActiveBar 설정
  useEffect(() => {
    const activeButton = navbarMenuRef.current?.querySelector(
      `[data-tab="${activeTab}"]`,
    );
    if (activeButton) {
      const { offsetWidth, offsetLeft } = activeButton;

      setActiveBarWidth((offsetWidth / window.innerWidth) * 100);
      setActiveBarLeft((offsetLeft / window.innerWidth) * 100);
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

        setActiveBarWidth((offsetWidth / window.innerWidth) * 100);
        setActiveBarLeft((offsetLeft / window.innerWidth) * 100);
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
          alt="seedzipLogo"
          onClick={handleLogoClick}
        />
        <StyledLogo src={Logo} alt="seedzip" onClick={handleLogoClick} />
      </LogoContainer>
      <NavbarMenu ref={navbarMenuRef}>
        <MenuButton
          data-tab="모아보기"
          onClick={() => {
            setActiveTab('모아보기');
            navigate('/main');
          }}
          active={
            activeTab === '모아보기' ||
            activeTab === '나의 씨드' ||
            activeTab === '카테고리' ||
            activeTab === '리마인더'
          }
        >
          모아보기
        </MenuButton>
        <MenuButton
          data-tab="탐색하기"
          onClick={() => {
            setActiveTab('탐색하기');
            navigate('/main');
          }}
          active={activeTab === '탐색하기'}
        >
          탐색하기
        </MenuButton>
        <ActiveBar width={activeBarWidth} left={activeBarLeft} />
      </NavbarMenu>
      <NavbarRight>
        {/* <Icon
          icon="iconoir:bell"
          width="24px"
          height="24px"
          style={{ color: 'black' }}
        /> */}
        <NewContentButton onClick={handleNewContentClick}>
          <Icon
            icon="iconoir:plus"
            width="24px"
            height="24px"
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
  height: 84px;
  border-bottom: 1px solid #ffffff;
  box-shadow: 0px 0px 7.5px 1.5px rgba(0, 0, 0, 0.07);
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

export const StyledLogoImage = styled.img`
  width: 27px;
  height: 27px;
  margin-left: 24px;
`;

export const StyledLogo = styled.img`
  width: 111px;
  height: 30px;
  margin-left: 7.5px;
  margin-top: 4px;
`;

export const NavbarMenu = styled.div`
  display: flex;
  position: fixed;
  margin-left: 310px;
`;

export const MenuButton = styled.button`
  font-size: 20px;
  margin-right: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};
  padding-left: 4px;
`;

export const ActiveBar = styled.div`
  position: absolute;
  width: 78px;
  height: 8px;
  background-color: #41c3ab;
  top: 50px;
  left: ${({ left }) => left}vw;
  transition:
    width 0.3s ease,
    left 0.3s ease;
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  right: 30px;
`;

export const NewContentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #41c3ab;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 120px;
  height: 36px;
  border-radius: 28px;
  cursor: pointer;
`;

export const Profile = styled.img`
  width: 36px;
  height: 36px;
`;

export default Navbar;
