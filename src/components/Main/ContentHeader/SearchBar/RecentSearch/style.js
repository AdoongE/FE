import styled from 'styled-components';

export const RecentSearchList = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  width: 250px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  height: auto;

  .title {
    font-weight: bold;
    font-size: 11px;
    padding: 11px;
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
  padding: 8px 11px;
  font-size: 10px;
  color: #666;

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3px;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 9px;
  cursor: pointer;
`;
