import React from 'react';
import styled from 'styled-components';
import { font } from '../../styles/font';
import { Icon } from '@iconify/react';
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
            <StyledIcon icon="ci:user-02" />
            회원 정보 수정
          </ManageBtn>
          <ManageBtn
            active={activeTab === '공지사항'}
            onClick={() => handleTabClick('공지사항')}
          >
            <StyledIcon icon="meteor-icons:bullhorn" />
            공지사항
          </ManageBtn>
          <ManageBtn
            active={activeTab === '이용약관'}
            onClick={() => handleTabClick('이용약관')}
          >
            <StyledIcon icon="bx:file" />
            이용약관
          </ManageBtn>
          <ManageBtn
            active={activeTab === 'FAQ'}
            onClick={() => handleTabClick('FAQ')}
          >
            <StyledIcon icon="ri:question-line" />
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
  gap: 7px;
  border-radius: 8px;
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  ${({ active }) => (active ? font.title2 : font.title3)}
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const ManageBtn = styled(Button)``;

const StyledIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

export default MypageSidebar;
