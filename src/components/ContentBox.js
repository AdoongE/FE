import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ContentDropdown from './dropdown/ContentDropdown';
import defaultImage from '../assets/icons/seed_contentbox.png';

function ContentBox({
  contentId,
  title,
  user,
  category,
  tags,
  dDay,
  thumbnailImage,
}) {
  const [showNewImage, setShowNewImage] = useState(false);

  const handleIconClick = () => {
    setShowNewImage(!showNewImage);
  };

  return (
    <Box>
      <ImageBox>
        <ContentImage
          src={thumbnailImage || defaultImage}
          alt="content thumbnail"
        />
        {dDay <= 0 && (
          <Dday dDay={dDay}>{`D-${dDay === 0 ? 'DAY' : Math.abs(dDay)}`}</Dday>
        )}
        <Dropdown>
          <ContentDropdown contentId={contentId} />
        </Dropdown>
      </ImageBox>
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
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
        <ContentName>{title || '콘텐츠명'}</ContentName>
      </ContentTitle>
      <Filter>
        <div>{user || '사용자 이름'}</div>
        <div>|</div>
        <div>{category || '카테고리명'}</div>
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
  z-index: 0;
`;

const ImageBox = styled.div`
  width: 440px;
  height: 284px;
  background-color: #f2f2f2;
  border-radius: 10px;
  position: relative;
  margin-bottom: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentImage = styled.img`
  width: ${({ src }) => (src === defaultImage ? '129px' : '110px')};
  height: ${({ src }) => (src === defaultImage ? '129px' : '110px')};
  object-fit: cover;
  border-radius: 10px;
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
  width: fit-content;

  height: 17px;
  top: 10px;
  left: 10px;
  border-radius: 50px;
  padding: 5px 15px;
  opacity: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.71px;
  text-align: center;
  color: black;

  background-color: ${({ dDay }) =>
    dDay === 0
      ? '#9AE4D6' // D-DAY 색상
      : dDay === -1 || dDay === -2 || dDay === -3
        ? '#DCDADA' // D-1, D-2, D-3 색상
        : dDay <= -4
          ? '#FFFFFF' // D-4 이하 색상
          : 'transparent'};
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  border: 0;
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
