import React from 'react';
import { TagContainer } from './style';
import TagItem from '../TagItem';

function TagList({ tags, removeTag }) {
  return (
    <TagContainer>
      {(tags || []).map((tag, index) => (
        <TagItem key={index} tag={tag} removeTag={removeTag} />
      ))}
    </TagContainer>
  );
}

export default TagList;
