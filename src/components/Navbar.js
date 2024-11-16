import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/icons/seedzip_logo.png';
import Logo from '../assets/icons/seedzip.png';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Navbar({ activeTab, setActiveTab }) {
  const [activeBarWidth, setActiveBarWidth] = useState(0);
  const [activeBarLeft, setActiveBarLeft] = useState(0);
  const navbarMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleTabClick = (tabName, event) => {
    setActiveTab(tabName);
    const button = event.currentTarget;
    const { offsetWidth, offsetLeft } = button;
    setActiveBarWidth(offsetWidth);
    setActiveBarLeft(offsetLeft);
  };

  const handleNewContentClick = () => {
    navigate('/content-add');
  };

  useEffect(() => {
    const activeButton = navbarMenuRef.current.querySelector(
      `[data-tab="${activeTab}"]`,
    );
    if (activeButton) {
      const { offsetWidth, offsetLeft } = activeButton;
      setActiveBarWidth(offsetWidth);
      setActiveBarLeft(offsetLeft);
    }
  }, [activeTab]);

  return (
    <NavbarContainer>
      <LogoContainer>
        <StyledLogoImage src={LogoImage} alt="seedzip_logo" />
        <StyledLogo src={Logo} alt="seedzip" />
      </LogoContainer>
      <NavbarMenu ref={navbarMenuRef}>
        <MenuButton
          data-tab="모아보기"
          onClick={(e) => handleTabClick('모아보기', e)}
          active={activeTab === '모아보기'}
        >
          모아보기
        </MenuButton>
        <MenuButton
          data-tab="관리하기"
          onClick={(e) => handleTabClick('관리하기', e)}
          active={activeTab === '관리하기'}
        >
          관리하기
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
          width="30"
          height="30"
          style={{ color: 'black' }}
        />
        <NewContentButton onClick={handleNewContentClick}>
          <Icon
            icon="iconoir:plus"
            width="24"
            height="24"
            style={{ color: '#00000' }}
          />
          새 콘텐츠
        </NewContentButton>
        <ProfileIcon>
          <Icon
            icon="ix:user-profile-filled"
            width="40x"
            height="40px"
            style={{ color: '#9F9F9F' }}
          />
        </ProfileIcon>
      </NavbarRight>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 118px;
  border-bottom: 1px solid #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

const NavbarMenu = styled.div`
  display: flex;
  gap: 64px;
  position: fixed;
  left: 398px;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  color: #666;
  padding: 13.6px;
  font-size: 26px;
  margin-left: 53px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};

  svg {
    margin-right: 10px; // 아이콘과 텍스트 간격
  }
`;

const ActiveBar = styled.div`
  width: ${(props) => props.width}px;
  height: 7px;
  background-color: #41c3ab;
  position: absolute;
  top: 84px;
  left: ${(props) => props.left}px;
  transition:
    width 0.3s ease,
    left 0.3s ease;
  z-index: 3;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const NewContentButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #41c3ab;
  font-size: 15px;
  color: #fff;
  border: none;
  width: 130px;
  height: 40px;
  border-radius: 40px;
  padding: 13.6px;
  cursor: pointer;
  margin-left: 16px;

  svg {
    margin-left: 10px;
  }
`;

const ProfileIcon = styled.div`
  margin-left: 16px;
  margin-right: 40px;
`;

export default Navbar;
