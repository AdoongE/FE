import styled from 'styled-components';

export const FilterContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.521vw;
  width: 32.917vw;
  min-height: 2.604vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.25vw;
  padding: 0.208vw 0.833vw;
  transition: height 0.3s ease;
  overflow: hidden;
`;

export const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.458vw;
`;

export const SearchTitle = styled.span`
  font-weight: bold;
  font-size: 0.833vw;
  color: #9f9f9f;
  display: flex;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #9f9f9f;
  cursor: pointer;
  font-size: 0.833vw;

  &:after {
    content: '';
    display: block;
    width: calc(100% - 0.521vw);
    height: 0.052vw;
    background-color: #9f9f9f;
    position: absolute;
    left: 0.26vw;
  }
`;
