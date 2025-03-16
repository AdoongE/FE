import styled, { keyframes } from 'styled-components';
import { font } from 'styles/font';

export const CustomFilterContainer = styled.div``;

export const CustomUp = styled.div`
  display: flex;
  align-items: center;
`;

export const CategoryP = styled.p`
  ${font.title2}
  padding: 0 14px;
  margin: 0;
`;

export const CustomDiv = styled.div`
  margin-top: 24px;
  padding: 0 4px;
`;

export const FilterContent = styled.div`
  ${font.body2}
  color: var(--gray2);
`;

export const CustomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 10px;
`;

export const CustomItem = styled.div`
  ${font.title3}
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  gap: 13px;
  &:hover {
    background-color: ${({ active }) =>
      active ? 'rgba(188, 188, 188, 0.2)' : '#eaebeb'};
    border-radius: 8px;
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

export const MessageBox = styled.div`
  position: fixed;
  top: 13%;
  left: 45%;
  background-color: #f2f2f2;
  font-size: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5.075px 0px rgba(0, 0, 0, 0.4);
  z-index: 100000;
  gap: 12px;
  flex-shrink: 0;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInOut} 2s forwards;
`;

export const CheckIcon = styled.img`
  width: 44px;
`;
