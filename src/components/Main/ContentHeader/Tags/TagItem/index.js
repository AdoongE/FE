import React from 'react';
import { Tag } from './style';
import { Icon } from '@iconify/react';

function TagItem({ tag, removeTag }) {
  return (
    <Tag>
      {tag}
      <Icon
        icon="ic:round-close"
        className="close-icon"
        onClick={() => removeTag(tag)}
      />
    </Tag>
  );
}

export default TagItem;
