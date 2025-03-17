import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 118px;
  left: 320px;
  right: 0;
  width: auto;
  max-width: calc(100% - 320px);
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.h1`
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 20px;

  span {
    font-weight: normal;
    font-size: 16px;
    margin-left: 5px;
    color: #666;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px;
`;

export const DropdownAndSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--gray3);
  border-radius: 8px;
  background: var(--gray4);
  padding: 8px 12px;
  width: 280px;
  min-width: 200px;
  justify-content: space-between;
  margin-left: auto;
`;
