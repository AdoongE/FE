import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  NavbarContainer,
  LogoContainer,
  StyledLogoImage,
  StyledLogo,
  NavbarMenu,
  MenuButton,
  ActiveBar,
  NavbarRight,
  NewContentButton,
  Profile,
} from './style';

import LogoImage from '../../../../assets/icons/seedzipLogo1.png';
import Logo from '../../../../assets/icons/seedzip.png';
import ProfileImage from '../../../../assets/icons/profile.png';

function Navbar() {
  const [activeTab, setActiveTab] = useState('모아보기');
  const [activeBarWidth, setActiveBarWidth] = useState(0);
  const [activeBarLeft, setActiveBarLeft] = useState(0);
  const navbarMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleTabClick = (tabName, event) => {
    setActiveTab(tabName);
    const button = event.currentTarget;
    const { offsetWidth, offsetLeft } = button;

    setActiveBarWidth((offsetWidth / window.innerWidth) * 100);
    setActiveBarLeft((offsetLeft / window.innerWidth) * 100);
  };

  const handleLogoClick = () => {
    navigate('/main');
  };

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

  return (
    <NavbarContainer>
      <LogoContainer>
        <StyledLogoImage
          src={LogoImage}
          alt="seedzip_logo"
          onClick={handleLogoClick}
        />
        <StyledLogo src={Logo} alt="seedzip" onClick={handleLogoClick} />
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
          data-tab="탐색하기"
          onClick={(e) => handleTabClick('탐색하기', e)}
          active={activeTab === '탐색하기'}
        >
          탐색하기
        </MenuButton>
        <ActiveBar width={activeBarWidth} left={activeBarLeft} />
      </NavbarMenu>
      <NavbarRight>
        <Icon icon="iconoir:bell" width="24px" height="24px" />
        <NewContentButton>
          <Icon
            icon="iconoir:plus"
            width="18px"
            height="18px"
            style={{ marginRight: '8.5px' }}
          />
          새로운 씨드
        </NewContentButton>
        <Profile
          src={ProfileImage}
          alt="profile"
          onClick={() => navigate('/mypage')}
        />
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
