import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// IconoirBell 컴포넌트를 Navbar 파일 안에서 정의
function IconoirBell(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18 8.4c0-1.697-.632-3.325-1.757-4.525S13.59 2 12 2s-3.117.674-4.243 1.875C6.632 5.075 6 6.703 6 8.4C6 15.867 3 18 3 18h18s-3-2.133-3-9.6M13.73 21a2 2 0 0 1-3.46 0"
      />
    </svg>
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

const LogoBox = styled.div`
  width: 28px;
  height: 26px;
  background-color: #41c3ab;
  margin-left: 24px;
`;

const Logo = styled.div`
  margin-left: 16px;
  font-size: 40px;
  font-weight: bold;
`;

const NavbarMenu = styled.div`
  display: flex;
  gap: 64px;
  left: 398px;
  position: fixed;
`;

const MenuButton = styled.button`
  color: #666;
  padding: 12px 20px;
  font-size: 26px;
  margin-left: 53px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};
`;

const ActiveBar = styled.div`
  width: ${(props) => props.width}px;
  height: 7px;
  weight: 100px;
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
  background-color: #41c3ab;
  font-size: 15px;
  color: #fff;
  border: none;
  width: 130px;
  height: 40px;
  border-radius: 40px;
  padding: 5px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 16px;
`;

function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const [activeBarWidth, setActiveBarWidth] = useState(0);
  const [activeBarLeft, setActiveBarLeft] = useState(0);
  const navbarMenuRef = useRef(null);

  const handleTabClick = (tabName, event) => {
    setActiveTab(tabName);
    const button = event.currentTarget;
    const { offsetWidth, offsetLeft } = button;
    setActiveBarWidth(offsetWidth);
    setActiveBarLeft(offsetLeft);
  };

  useEffect(() => {
    const firstButton = navbarMenuRef.current.querySelector('button');
    if (firstButton) {
      firstButton.click();
    }
  }, []);

  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoBox />
        <Logo>seedzip</Logo>
      </LogoContainer>
      <NavbarMenu ref={navbarMenuRef}>
        <MenuButton
          onClick={(e) => handleTabClick('모아보기', e)}
          active={activeTab === '모아보기'}
        >
          모아보기
        </MenuButton>
        <MenuButton
          onClick={(e) => handleTabClick('관리하기', e)}
          active={activeTab === '관리하기'}
        >
          관리하기
        </MenuButton>
        <MenuButton
          onClick={(e) => handleTabClick('탐색하기', e)}
          active={activeTab === '탐색하기'}
        >
          탐색하기
        </MenuButton>
        <ActiveBar width={activeBarWidth} left={activeBarLeft} />
      </NavbarMenu>
      <NavbarRight>
        <IconoirBell style={{ color: 'black' }} />
        <NewContentButton>+ 새 콘텐츠</NewContentButton>
        <ProfileIcon />
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
