import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ContentDropdown from './dropdown/ContentDropdown';
import defaultImage from '../assets/icons/seed_contentbox.png';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function ContentBox({
  contentId,
  title,
  tags,
  dDay,
  thumbnailImage,
  open,
  contentDateType,
  updatedDt,
}) {
  const [category, setCategory] = useState([]); // category 상태 정의
  const [showNewImage, setShowNewImage] = useState(false);

  // 제목이 없을 경우 업데이트 날짜로 대체
  const displayTitle =
    title ||
    (updatedDt ? new Date(updatedDt).toLocaleDateString('ko-KR') : '날짜 없음');

  // 카테고리 텍스트 생성
  const displayCategory = Array.isArray(category)
    ? category.slice(0, 5).join('ㅣ') + (category.length > 5 ? '...' : '')
    : ''; // 배열이 아닌 경우 처리

  useEffect(() => {
    // category가 비정상적인 경우 기본값 설정
    if (!Array.isArray(category)) {
      console.error('Invalid category:', category);
      setCategory([]); // 빈 배열로 초기화
    }
  }, [category]);

  const handleIconClick = () => {
    setShowNewImage(!showNewImage);
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
        <ContentName>{displayTitle}</ContentName>
      </ContentTitle>
      <CategoryDisplay title={displayCategory}>
        {displayCategory}
      </CategoryDisplay>
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

const CategoryDisplay = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #4f4f4f;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 박스를 넘어가는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표 처리 */
`;

export default ContentBox;
