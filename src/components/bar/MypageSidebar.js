import React from 'react';
import styled from 'styled-components';
import { font } from '../../styles/font';
import userIcon from '../../assets/icons/user.png';
import fileIcon from '../../assets/icons/file-text.png';
import volumeIcon from '../../assets/icons/volume-2.png';
import helpIcon from '../../assets/icons/help-circle.png';
import { useNavigate } from 'react-router-dom';
import { useActiveTab } from '../../context/ActiveTabContext';

function MypageSidebar() {
  const { activeTab, setActiveTab } = useActiveTab();
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === '공지사항') navigate('/info');
    else if (tabName === 'FAQ') navigate('/question');
    else if (tabName === '이용약관') navigate('/terms');
    else navigate('/mypage');
  };

  return (
    <StMainPage>
      <SideDiv>
        <Title>마이페이지</Title>
        <BtnDiv>
          <ManageBtn
            active={activeTab === '회원정보수정'}
            onClick={() => handleTabClick('회원정보수정')}
          >
            <ImgIcon src={userIcon} alt="user icon" />
            회원 정보 수정
          </ManageBtn>
          <ManageBtn
            active={activeTab === '공지사항'}
            onClick={() => handleTabClick('공지사항')}
          >
            <ImgIcon src={volumeIcon} alt="volume icon" />
            공지사항
          </ManageBtn>
          <ManageBtn
            active={activeTab === '이용약관'}
            onClick={() => handleTabClick('이용약관')}
          >
            <ImgIcon src={fileIcon} alt="file icon" />
            이용약관
          </ManageBtn>
          <ManageBtn
            active={activeTab === 'FAQ'}
            onClick={() => handleTabClick('FAQ')}
          >
            <ImgIcon src={helpIcon} alt="help icon" />
            FAQ
          </ManageBtn>
        </BtnDiv>
      </SideDiv>
    </StMainPage>
  );
}

const Title = styled.div`
  margin-top: 160px;
  padding: 0 16px;
  text-align: start;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 34px;
`;

const StMainPage = styled.div`
  background-color: white;
`;

const SideDiv = styled.div`
  height: 100vh;
  width: 262px;
  padding: 0 16px;
  background-color: var(--sidebar);
  display: inline-block;
  position: relative;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 12px;
  gap: 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  ${({ active }) => (active ? font.title2 : font.title3)}
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const ManageBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 18px;
  height: 18px;
  position: relative;
  left: 0;
`;

export default MypageSidebar;
