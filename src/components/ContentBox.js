import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ContentDropdown from './dropdown/ContentDropdown';
import defaultImage from '../assets/icons/seed_contentbox.png';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function ContentBox({
  contentId,
  title,
  category = [],
  tags,
  dDay,
  thumbnailImage,
  open,
  contentDateType,
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
      <ImageBox onClick={open}>
        {contentDateType === 'PDF' ? (
          <PDFThumbnail>
            <Document file={thumbnailImage} loading={<div>Loading PDF...</div>}>
              <Page pageNumber={1} width={200} />
            </Document>
          </PDFThumbnail>
        ) : (
          <ContentImage
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
          <Icon
            icon={contentIcons[contentDateType] || 'ic:round-link'} // 기본값은 링크
            style={{
              width: '1.042vw',
              height: '1.042vw',
              color: 'white',
              zIndex: '2',
            }}
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

const Dropdown = styled.div`
  position: absolute;
  top: 0.521vw; /* 10px */
  left: 20.833vw; /* 400px */
`;

const Box = styled.div`
  width: 22.917vw; /* 440px */
  min-height: 20.156vw; /* 387px */
  z-index: 0;
`;

const ImageBox = styled.div`
  width: 22.917vw; /* 440px */
  height: 14.792vw; /* 284px */
  background-color: #f2f2f2;
  border-radius: 0.521vw; /* 10px */
  position: relative;
  margin-bottom: 0.573vw; /* 11px */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0.208vw #9a9a9a; /* 4px */
`;

const ContentImage = styled.img`
  ${({ isDefaultImage }) =>
    isDefaultImage
      ? `
    width: 6.719vw; /* 129px */
    height: 6.719vw; /* 129px */
    filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(125deg) brightness(91%) contrast(90%);
  `
      : `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.521vw; /* 10px */
  `}
`;

const PDFThumbnail = styled.div`
  justify-content: center;
  align-items: center;
  overflow: hidden;

  canvas {
    width: 22.917vw !important; /* 440px */
    height: 14.792vw !important; /* 284px */
    object-fit: cover;
    border-radius: 0.521vw; /* 10px */
  }
`;

const IconBox = styled.div`
  width: 1.563vw; /* 30px */
  height: 1.563vw; /* 30px */
  border-radius: 50%;
  background-color: #4f4f4f;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.365vw; /* 7px */
`;

const Dday = styled.div`
  position: absolute;
  width: fit-content;
  height: 0.885vw; /* 17px */
  top: 0.521vw; /* 10px */
  left: 0.521vw; /* 10px */
  border-radius: 2.604vw; /* 50px */
  padding: 0.26vw 0.781vw; /* 5px 15px */
  opacity: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.729vw; /* 14px */
  line-height: 0.87vw; /* 16.71px */
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
  gap: 0.417vw; /* 8px */
`;

const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  border: 0;
  border-radius: 2.604vw; /* 50px */
  opacity: 80%;
  background-color: white;
  border: 0.026vw solid #9f9f9f; /* 0.5px */
  padding: 0.26vw 0.521vw; /* 5px 10px */
  font-weight: 400;
  font-size: 0.625vw; /* 12px */
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const ContentTitle = styled.div`
  margin-top: 0.521vw; /* 10px */
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.469vw; /* 9px */
  white-space: normal;
  width: 100%;
`;

const ContentName = styled.div`
  font-weight: 500;
  font-size: 1.146vw; /* 22px */
  line-height: 1.367vw; /* 26.25px */
  color: #000000;
  margin-left: 0.365vw; /* 7px */
  white-space: normal;
  word-break: break-word;
`;

const CategoryDisplay = styled.div`
  font-weight: 400;
  font-size: 0.833vw; /* 16px */
  line-height: 0.99vw; /* 19px */
  color: rgb(141, 141, 141);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemoText = styled.div`
  margin-top: 0.417vw; /* 8px */
  font-size: 0.729vw; /* 14px */
  color: #555;
`;

export default ContentBox;
