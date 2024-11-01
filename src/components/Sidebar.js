import styled from 'styled-components';
import { useState } from 'react';
import seedIcon from '../assets/icons/seed.png';
import treeIcon from '../assets/icons/tree.png';
import forestIcon from '../assets/icons/forest.png';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('collect');

  return (
    <StMainPage>
      <SideDiv>
        <BtnDiv>
          <CollectBtn
            active={activeButton === 'collect'}
            onClick={() => setActiveButton('collect')}
          >
            <ImgIcon src={seedIcon} alt="seed icon" />
            모아보기
          </CollectBtn>
          <ManageBtn
            active={activeButton === 'manage'}
            onClick={() => setActiveButton('manage')}
          >
            <ImgIcon src={treeIcon} alt="seed icon" />
            관리하기
          </ManageBtn>
          <ExploreBtn
            active={activeButton === 'explore'}
            onClick={() => setActiveButton('explore')}
          >
            <ImgIcon src={forestIcon} alt="seed icon" />
            탐색하기
          </ExploreBtn>
        </BtnDiv>
      </SideDiv>
    </StMainPage>
  );
};

const StMainPage = styled.div`
  background-color: white;
`;

const SideDiv = styled.div`
  height: 100vh;
  width: 21.563rem;
  background-color: #f8fbfb;
  display: inline-block;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12.5rem;
  border-bottom: 1px solid #dcdada;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 9px;
`;

const Button = styled.button`
  height: 3.5rem;
  width: 18.938rem;
  border-radius: 10px;
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  position: relative;
  padding-left: 19px;
  margin-bottom: 4px;
`;

const ImgIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 10px;
  position: relative;
  left: 0;
`;

const CollectBtn = styled(Button)``;
const ManageBtn = styled(Button)``;
const ExploreBtn = styled(Button)``;

export default Sidebar;
