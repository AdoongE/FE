import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from 'styles/font';

export const DropdownMenu = styled.ul`
  position: absolute;
  left: 280px;
  background-color: white;
  border-radius: 8px;
  z-index: 1;
  width: ${({ categoryLength }) =>
    `calc(${Math.max(12.396, categoryLength * 1.083 + 4.167)}vw)`};
  box-shadow: 0 0 9px #dfdfdf;
  padding: 4px;
`;

export const DropdownItem = styled.li`
  ${font.body2}
  padding: 9px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  &:hover {
    background-color: #ededed;
  }
`;

export const Icons = styled(Icon)`
  width: 16px;
  height: 16px;
`;
