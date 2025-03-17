import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { SearchContainer, Search, SearchButton } from './style';
import RecentSearch from './RecentSearch';

function SearchBar({ setKeyword, fetchSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const dialogRef = useRef(null);

  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setKeyword(searchQuery.trim());
      await fetchSearchResults(searchQuery.trim());
    }
  };

  return (
    <SearchContainer>
      <Icon icon="stash:search-solid" className="search-icon" />
      <Search
        placeholder="찾고 싶은 콘텐츠를 검색하세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearchKeyPress}
        onFocus={() => setShowRecentSearches(true)}
        onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
      />
      <SearchButton
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        #태그 검색
      </SearchButton>
      {showRecentSearches && (
        <RecentSearch
          setKeyword={setKeyword}
          fetchSearchResults={fetchSearchResults}
        />
      )}
    </SearchContainer>
  );
}

export default SearchBar;
