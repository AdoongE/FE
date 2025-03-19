import React from 'react';
import { FilterContainer } from './style';
import FilterButton from './FilterButton';
import Tags from './Tags'; // ✅ 올바른 import 경로 사용
import useFilterStore from '../../../../store/useFilterStore';

function Filter() {
  const { tags, setTags, isFilterVisible, toggleFilterVisibility } =
    useFilterStore();

  return (
    <FilterContainer>
      <FilterButton onClick={toggleFilterVisibility} />
      {isFilterVisible && (
        <Tags
          tags={tags}
          onRemoveTag={(tag) => setTags(tags.filter((t) => t !== tag))}
        />
      )}
    </FilterContainer>
  );
}

export default Filter;
