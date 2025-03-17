import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 25.677vw;
  height: 2.604vw;
  border-radius: 1.302vw;
  margin-right: 2.604vw;
  border: 0.052vw solid #9f9f9f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  .search-icon {
    width: 1.25vw;
    height: 1.25vw;
    margin-left: 0.781vw;
    color: black;
  }
`;

export const Search = styled.input`
  width: 15.625vw;
  border: none;
  text-align: start;
  font-size: 1.302vw;

  &::placeholder {
    font-size: 0.938vw;
    color: #9f9f9f;
  }

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  width: 5.729vw;
  height: 2.083vw;
  border: 0;
  border-radius: 2.101vw;
  background-color: #f2f2f2;
  font-size: 0.833vw;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
