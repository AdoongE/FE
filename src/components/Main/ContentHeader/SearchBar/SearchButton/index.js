import React from 'react';
import { SearchButtonContainer } from './style';

function SearchButton({ onClick }) {
  return (
    <SearchButtonContainer onClick={onClick}>#태그 검색</SearchButtonContainer>
  );
}

export default SearchButton;
