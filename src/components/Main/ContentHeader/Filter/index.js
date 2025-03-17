import React from 'react';
import { FilterContainer } from './style';
import FilterButton from './FilterButton';
import FilterTags from './FilterTags';

function Filter({ tags, setTags, onFilterClick }) {
  return (
    <FilterContainer>
      <FilterButton onClick={onFilterClick} />
      <FilterTags tags={tags} setTags={setTags} />
    </FilterContainer>
  );
}

export default Filter;
