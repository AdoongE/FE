import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ContentDropdown from './dropdown/ContentDropdown';

function ContentBox() {
  const [showNewImage, setShowNewImage] = useState(false);

  const handleIconClick = () => {
    setShowNewImage(!showNewImage);
  };

  return (
    <Box>
      <ImageBox>
        <Dday>D-365</Dday>
        <Dropdown>
          <ContentDropdown />
        </Dropdown>
      </ImageBox>
      <Tags>
        <Tag>#태그1</Tag>
        <Tag>#태그24324</Tag>
      </Tags>
      <ContentTitle>
        <IconBox>
          <Icon
            icon="ic:round-link"
            style={{
              width: '20px',
              height: '20px',
              color: 'white',
              zIndex: '2',
            }}
            onClick={handleIconClick}
          />
        </IconBox>
        <ContentName>콘텐츠명</ContentName>
      </ContentTitle>
      <Filter>
        <div>사용자 이름</div>
        <div>|</div>
        <div>카테고리명</div>
      </Filter>
    </Box>
  );
}

const Dropdown = styled.div`
  position: absolute;
  top: 10px;
  left: 400px;
`;

const Filter = styled.div`
  display: flex;
  column-gap: 6px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  color: #4f4f4f;
`;

const Box = styled.div`
  width: 440px;
  height: 387px;
`;

const ImageBox = styled.div`
  width: 440px;
  height: 284px;
  background-color: #f2f2f2;
  border-radius: 10px;
  position: relative;
  margin-bottom: 11px;
`;

const IconBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: #4f4f4f;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
`;

const Dday = styled.div`
  position: absolute;
  /* width: 25px; */
  width: fit-content;

  height: 17px;
  top: 10px;
  left: 10px;
  border-radius: 50px;
  padding: 5px 15px;
  opacity: 80%;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.71px;
  text-align: center;
  color: black;
`;

const Tag = styled.div`
  width: fit-content;
  height: fit-content;
  /* width: 54px;
  height: 24px; */
  border-radius: 50px;
  opacity: 80%;
  background-color: white;
  border: 0.5px solid #9f9f9f;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Tags = styled.div`
  display: flex;
  column-gap: 8px;
  flex-wrap: wrap;
`;

const ContentTitle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 9px;
`;

const ContentName = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26.25px;
  color: #000000;
`;

export default ContentBox;
