import styled from 'styled-components';
import seedIcon from '../../../../../assets/icons/seed_sidebar.png';
import reminderIcon from '../../../../../assets/icons/reminder_sidebar.png';
import { font } from 'styles/font';

const TabButton = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tabName) => {
    if (tabName === '리마인더') {
      setActiveTab('리마인더');
    } else if (tabName === '나의 씨드') {
      setActiveTab('나의 씨드');
      window.location.reload(); // ?????
    }
  };

  return (
    <BtnDiv>
      <CollectBtn
        active={activeTab === '나의 씨드'}
        onClick={() => handleTabClick('나의 씨드')}
      >
        <ImgIcon src={seedIcon} alt="seed icon" />
        나의 씨드
      </CollectBtn>
      <ManageBtn
        active={activeTab === '리마인더'}
        onClick={() => handleTabClick('리마인더')}
      >
        <ImgIcon src={reminderIcon} alt="reminder icon" />
        리마인더
      </ManageBtn>
    </BtnDiv>
  );
};

export default TabButton;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 143px;
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

const CollectBtn = styled(Button)``;
const ManageBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 18px;
  height: 18px;
  position: relative;
  left: 0;
`;
