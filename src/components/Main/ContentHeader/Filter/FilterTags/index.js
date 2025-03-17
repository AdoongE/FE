import React from 'react';
import { TagContainer, Tag } from './style';
import { Icon } from '@iconify/react';

function FilterTags({ tags, setTags }) {
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <TagContainer>
      {(tags || []).map((tag, index) => (
        <Tag key={index}>
          {tag}
          <Icon
            icon="ic:round-close"
            className="close-icon"
            onClick={() => removeTag(tag)}
          />
        </Tag>
      ))}
    </TagContainer>
  );
}

export default FilterTags;
