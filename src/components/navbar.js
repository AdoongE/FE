import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 118px;
  border-bottom: 1px solid #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
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
  margin-left: 20px;
  margin-bottom: 12px;
  font-size: 40px;
  font-weight: bold;
`;

const NavbarMenu = styled.div`
  display: flex;
  gap: 4vw;
  margin-left: -16vw;
  position: relative;
`;

const MenuButton = styled.button`
  color: #666;
  padding: 0.75rem 1.25rem;
  font-size: 1.5vw;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#000" : "#666")};
`;

const ActiveBar = styled.div`
  width: ${(props) => props.width}px;
  height: 0.45rem;
  background-color: #41c3ab;
  position: absolute;
  top: 85px;
  left: ${(props) => props.left}px;
  transition: width 0.3s ease, left 0.3s ease;
  z-index: 3;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(FaBell)`
  width: 1.56vw;
  height: 1.56vw;
  font-size: 1.2em;
  color: #333;
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const NewContentButton = styled.button`
  background-color: #41c3ab;
  font-size: 0.92vw;
  color: #fff;
  border: none;
  width: 8.13vw;
  height: 2.51vw;
  border-radius: 2.52rem;
  padding: 0.3rem;
  margin-left: 1.04vw;
  margin-right: 1.04vw;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 1rem;
`;

function Navbar() {
  const [activeTab, setActiveTab] = useState("");
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
    const firstButton = navbarMenuRef.current.querySelector("button");
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
          onClick={(e) => handleTabClick("모아보기", e)}
          active={activeTab === "모아보기"}
        >
          모아보기
        </MenuButton>
        <MenuButton
          onClick={(e) => handleTabClick("관리하기", e)}
          active={activeTab === "관리하기"}
        >
          관리하기
        </MenuButton>
        <MenuButton
          onClick={(e) => handleTabClick("탐색하기", e)}
          active={activeTab === "탐색하기"}
        >
          탐색하기
        </MenuButton>
        <ActiveBar width={activeBarWidth} left={activeBarLeft} />
      </NavbarMenu>
      <NavbarRight>
        <Icon />
        <NewContentButton>+ 새 콘텐츠</NewContentButton>
        <ProfileIcon />
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;