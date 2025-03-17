import React from 'react';
import { RecentSearchList, RecentSearchItem, DeleteButton } from './style';
import { Icon } from '@iconify/react';

function RecentSearch({ setKeyword, fetchSearchResults }) {
  const recentSearches =
    JSON.parse(localStorage.getItem('recentSearches')) || [];

  const handleRecentSearchClick = async (query) => {
    setKeyword(query);
    await fetchSearchResults(query);
  };

  const deleteSearch = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <RecentSearchList>
      <div className="title">최근 검색어</div>
      {recentSearches.map((search, index) => (
        <RecentSearchItem key={index}>
          <button onClick={() => handleRecentSearchClick(search.query)}>
            <Icon icon="ion:search-outline" className="search-icon" />
            {search.query}
          </button>
          <div>
            <span>{search.date}</span>
            <DeleteButton onClick={() => deleteSearch(index)}>X</DeleteButton>
          </div>
        </RecentSearchItem>
      ))}
    </RecentSearchList>
  );
}

export default RecentSearch;
