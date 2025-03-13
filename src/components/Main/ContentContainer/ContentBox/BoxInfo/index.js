import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  CategoryDisplay,
  ContentName,
  ContentTitle,
  IconBox,
  MemoText,
  Tag,
  TagContainer,
} from './style';

function BoxInfo({
  title,
  category = [],
  tags,
  message,
  keyword,
  contentDateType,
  updatedDt,
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
    : '';

  const handleIconClick = () => {
    setShowNewImage(!showNewImage);
  };

  const contentIcons = {
    LINK: 'ic:round-link',
    IMAGE: 'ri:image-line',
    PDF: 'codicon:file',
  };

  return (
    <div>
      <TagContainer>
        {tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <ContentTitle>
        <IconBox>
          <Icon
            icon={contentIcons[contentDateType] || 'ic:round-link'}
            style={{
              width: '12px',
              height: '12px',
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
    </div>
  );
}

export default BoxInfo;
