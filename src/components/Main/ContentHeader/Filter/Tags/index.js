import React from 'react';
import { TagsContainer, TagItem } from './style';

function Tags({ tags, onRemoveTag }) {
  return (
    <TagsContainer>
      {tags.map((tag, index) => (
        <TagItem key={index}>
          {tag}
          <button onClick={() => onRemoveTag(tag)}>×</button>
        </TagItem>
      ))}
    </TagsContainer>
  );
}

export default Tags;
