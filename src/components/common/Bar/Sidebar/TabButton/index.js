import styled from 'styled-components';
import seedIcon from '../../../../../assets/icons/seed_sidebar.png';
import reminderIcon from '../../../../../assets/icons/reminder_sidebar.png';

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
        <ImgIcon
          src={seedIcon}
          alt="seed icon"
          width="1.25vw"
          height="1.25vw"
        />
        나의 씨드
      </CollectBtn>
      <ManageBtn
        active={activeTab === '리마인더'}
        onClick={() => handleTabClick('리마인더')}
      >
        <ImgIcon
          src={reminderIcon}
          alt="reminder icon"
          width="1.25vw"
          height="1.25vw"
        />
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
  /* border-bottom: 0.052vw solid #dcdada; */
  margin-top: 10.4167vw;
  margin-left: 1.042vw; /* 20px */
  margin-right: 1.042vw; /* 20px */
  padding-bottom: 0.469vw; /* 9px */
`;

const Button = styled.button`
  width: 15.781vw; /* 303px */
  height: 2.917vw; /* 56px */
  border-radius: 0.521vw; /* 10px */
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  display: inline-flex;
  align-items: center;
  font-size: 1.042vw; /* 20px */
  font-weight: 500;
  position: relative;
  padding-left: 0.99vw; /* 19px */
  margin-bottom: 0.208vw; /* 4px */
`;

const CollectBtn = styled(Button)``;
const ManageBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;
  margin-right: 0.521vw; /* 10px */
  position: relative;
  left: 0;
`;
