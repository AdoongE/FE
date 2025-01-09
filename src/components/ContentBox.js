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
  console.log('ContentBox Props - keyword:', keyword);
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
    PDF: 'mdi-light:file',
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
              width: '20px',
              height: '20px',
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
  top: 10px;
  left: 400px;
`;

const Box = styled.div`
  width: 440px;
  min-height: 387px;
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
  box-shadow: 0 0 4px #9a9a9a;
`;

const ContentImage = styled.img`
  ${({ isDefaultImage }) =>
    isDefaultImage
      ? `
    width: 129px;
    height: 129px;
    filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(125deg) brightness(91%) contrast(90%);
  `
      : `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  `}
`;

const PDFThumbnail = styled.div`
  justify-content: center;
  align-items: center;
  overflow: hidden;

  canvas {
    width: 440px !important;
    height: 284px !important;
    object-fit: cover;
    border-radius: 10px;
  }
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
  flex-wrap: wrap;
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
  align-items: flex-start;
  margin-bottom: 9px;
  white-space: normal;
  width: 100%;
`;

const ContentName = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26.25px;
  color: #000000;
  margin-left: 7px;
  white-space: normal;
  word-break: break-word;
`;

const CategoryDisplay = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgb(141, 141, 141);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemoText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
`;

export default ContentBox;
