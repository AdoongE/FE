import React from 'react';
import { Button } from './style';
import { Icon } from '@iconify/react';

function FilterButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <Icon icon="mdi:filter-variant" className="filter-icon" />
      검색 필터
    </Button>
  );
}

export default FilterButton;
