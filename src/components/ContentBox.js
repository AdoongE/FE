import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ContentDropdown from './dropdown/ContentDropdown';
import defaultImage from '../assets/icons/seed_contentbox.png';
import { font } from '../styles/font';
// import { Document, Page } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function ContentBox({
  contentId,
  title,
  category = [],
  tags,
  dDay,
  thumbnailImage,
  open,
  seedType,
  updatedDt,
  message,
  keyword,
  fetchData,
}) {
  const [showNewImage, setShowNewImage] = useState(false);

  // 키워드 강조 함수
  const highlightText = (message, keyword) => {
    if (!keyword) return message;
    const parts = message.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <strong key={index} style={{ color: 'black' }}>
          {part}
        </strong>
      ) : (
        part
      ),
    );
  };

  // 제목이 없을 경우 업데이트 날짜로 대체
  const displayTitle =
    title ||
    (updatedDt ? new Date(updatedDt).toLocaleDateString('ko-KR') : '날짜 없음');

  // 카테고리 텍스트 생성
  const displayCategory = Array.isArray(category)
    ? category.slice(0, 5).join('ㅣ') + (category.length > 5 ? '...' : '') // 최대 5개 표시 후 "..." 추가
    : ''; // 배열이 아닐 경우 빈 문자열 처리

  const handleIconClick = () => {
    setShowNewImage(!showNewImage);
  };

  const contentIcons = {
    LINK: 'ic:round-link',
    IMAGE: 'ri:image-line',
    PDF: 'codicon:file',
  };

  return (
    <Box>
      <ImageBox>
        {seedType === 'PDF' ? (
          // <PDFThumbnail onClick={open}>
          //   <Document file={thumbnailImage} loading={<div>Loading PDF...</div>}>
          //     <Page pageNumber={1} width={200} />
          //   </Document>
          // </PDFThumbnail>
          <ContentImage
            onClick={open}
            src={defaultImage}
            alt="content thumbnail"
            isDefaultImage={true}
          />
        ) : seedType === 'LINK' ? (
          <ContentImage
            src={defaultImage}
            alt="content thumbnail"
            onClick={() => window.open(thumbnailImage, '_blank')}
            isDefaultImage={true}
          />
        ) : (
          <ContentImage
            onClick={open}
            src={thumbnailImage || defaultImage}
            alt="content thumbnail"
            isDefaultImage={!thumbnailImage}
          />
        )}
        {dDay !== undefined && dDay <= 0 && (
          <Dday dDay={dDay}>
            {dDay === 0 ? 'D-DAY' : `D-${Math.abs(dDay)}`}
          </Dday>
        )}
        <Dropdown>
          <ContentDropdown contentId={contentId} fetchData={fetchData} />
        </Dropdown>
      </ImageBox>
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <ContentTitle>
        <IconBox>
          <StyledIcon
            icon={contentIcons[seedType] || 'ic:round-link'} // 기본값은 링크
            onClick={handleIconClick}
          />
        </IconBox>
        <ContentName>{displayTitle}</ContentName>
      </ContentTitle>
      <CategoryDisplay title={displayCategory}>
        {displayCategory}
      </CategoryDisplay>
      {message && <MemoText>{highlightText(message, keyword)}</MemoText>}
    </Box>
  );
}

const Box = styled.div`
  width: 328px;
  min-height: 212px;
  z-index: 0;
`;

const StyledIcon = styled(Icon).attrs((props) => ({
  icon: props.icon || 'ic:round-link',
}))`
  width: 12px;
  height: 12px;
  color: white;
  z-index: 2;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 12px;
  right: 6px;
`;

const ImageBox = styled.div`
  height: 212px;
  background-color: var(--gray3);
  border-radius: 10px;
  position: relative;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3.75px #9a9a9a;
`;

const ContentImage = styled.img`
  ${({ isDefaultImage }) =>
    isDefaultImage
      ? `
    width: 78px; 
    height: 78px; 
    filter: invert(10%) sepia(54%) saturate(0%) hue-rotate(125deg) brightness(91%) contrast(90%);
  `
      : `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px; 
  `}
`;

// const PDFThumbnail = styled.div`
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;

//   canvas {
//     width: 22.917vw !important; /* 440px */
//     height: 14.792vw !important; /* 284px */
//     object-fit: cover;
//     border-radius: 0.521vw; /* 10px */
//   }
// `;

const IconBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--gray1);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const Dday = styled.div`
  position: absolute;
  width: fit-content;
  height: 17px;
  top: 12px;
  left: 16px;
  border-radius: 37.5px;
  padding: 4px 8px;
  opacity: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.body1}
  text-align: center;
  color: black;

  background-color: ${({ dDay }) =>
    dDay === 0
      ? '#9AE4D6'
      : dDay === -1 || dDay === -2 || dDay === -3
        ? '#DCDADA'
        : dDay <= -4
          ? '#FFFFFF'
          : 'transparent'};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  border: 0;
  border-radius: 37.5px;
  opacity: 80%;
  background-color: white;
  border: 0.375px solid var(--gray2);
  padding: 4px 6px;
  ${font.body3}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentTitle = styled.div`
  margin: 8px 0px;
  display: flex;
  align-items: flex-start;
  white-space: normal;
  width: 100%;
  position: relative;
`;

const ContentName = styled.div`
  ${font.title3}
  word-break: break-word;
  flex-shrink: 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 35px);
  display: inline-block;
`;

const CategoryDisplay = styled.div`
  ${font.body2}
  color: var(--gray1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemoText = styled.div`
  margin-top: 4px;
  ${font.body2}
  color: var(--gray2);
`;

export default ContentBox;
