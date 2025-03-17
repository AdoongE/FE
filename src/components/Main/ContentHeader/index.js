import React from 'react';
import { HeaderContainer, Title, DropdownAndSearch } from './style';
import SearchBar from './SearchBar';
import Dropdowns from './Dropdowns';
import Filter from './Filter';
import Tags from './Tags';

import useSearchStore from '../../../store/useSearchStore';
import useDropdownStore from '../../../store/useDropdownStore';
import useFilterStore from '../../../store/useFilterStore';

function ContentHeader({ categoryId, categoryName }) {
  const { setKeyword } = useSearchStore();
  const { setSortOrder, setSelectedFormat } = useDropdownStore();
  const { tags, setTags } = useFilterStore();

  return (
    <HeaderContainer>
      <Title>
        {categoryId ? (
          <>
            나의 씨드 <span>{categoryName}</span>
          </>
        ) : (
          '나의 씨드'
        )}
      </Title>
      <DropdownAndSearch>
        <Dropdowns
          setSortOrder={setSortOrder}
          setSelectedFormat={setSelectedFormat}
        />
        <SearchBar setKeyword={setKeyword} />
      </DropdownAndSearch>
      <Filter tags={tags} setTags={setTags} />
      <Tags tags={tags} setTags={setTags} />
    </HeaderContainer>
  );
}

export default ContentHeader;
