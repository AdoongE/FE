import styled from 'styled-components';

export const RecentSearchList = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: none;
  border-radius: 8px;
  width: 350px;
  z-index: 10;
  height: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  .title {
    font-weight: 500;
    font-size: 16px;
    padding: 15px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 5%;
      right: 5%;
      height: 1px;
      background-color: #eaeaea;
    }
  }
`;

export const RecentSearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 13px;
  font-size: 12px;
  color: var(--gray2);
  border: none;

  .search-icon {
    width: 14px;
    height: 14px;
    color: var(--gray2);
  }

  & > button {
    all: unset;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    cursor: pointer;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 7px;
  }
`;

export const DeleteButton = styled.button`
  all: unset;
  font-size: 12px;
  cursor: pointer;
`;
