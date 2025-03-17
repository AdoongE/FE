import React from 'react';
import { Button } from './stlye';
import filterIcon from '../../../../../assets/icons/filter.png';

function FilterButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <img src={filterIcon} alt="Filter" />
      검색 필터
    </Button>
  );
}

export default FilterButton;
