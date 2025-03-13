import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  box-shadow: 0px 0px 7.5px 1.5px rgba(0, 0, 0, 0.07);
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: -2;
`;

export const LogoContainer = styled.div`
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
  margin-left: 315px;
`;

export const MenuButton = styled.button`
  font-size: 20px;
  margin-right: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};
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
