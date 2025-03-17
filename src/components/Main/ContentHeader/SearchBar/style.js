import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 42.5px;
  border-radius: 25px;
  right: 20px;
  background: rgba(242, 242, 242, 0.3);
  border: 1px solid var(--gray4);
  position: relative;

  .search-icon {
    width: 24px;
    height: 24px;
    color: black;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 15px;
`;

export const Search = styled.input`
  border: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  padding-left: 13px;

  &::placeholder {
    font-size: 14px;
    color: var(--gray2);
  }

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  width: 90px;
  height: 34px;
  border: none;
  border-radius: 17px;
  background: var(--gray4);
  font-size: 14px;
  font-weight: 500;
  color: var(--gray2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-right: 5px;
`;
