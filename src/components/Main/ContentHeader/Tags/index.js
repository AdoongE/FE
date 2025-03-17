import React, { useState } from 'react';
import {
  FilterContainer,
  ParentContainer,
  SearchTitle,
  ToggleButton,
} from './style';
import TagList from './TagList';

function Tags({ tags, setTags, activeTab, setActiveTab }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTags = isExpanded ? tags : tags.slice(0, 4);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    if (tags.length === 1) {
      setActiveTab('나의 씨드'); // 모든 태그 삭제 시 기본 화면으로
    }
  };

  return (
    activeTab === '검색필터' && (
      <FilterContainer>
        <ParentContainer>
          <SearchTitle>📌 검색 필터</SearchTitle>
          <TagList tags={visibleTags} removeTag={removeTag} />
        </ParentContainer>
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '닫기' : '전체보기'}
        </ToggleButton>
      </FilterContainer>
    )
  );
}

export default Tags;
