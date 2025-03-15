import styled from 'styled-components';
import { font } from 'styles/font';
import { Icon } from '@iconify/react';
import ArrowRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export const Accordion = styled.div``;

export const AccordionTitle = styled.div`
  ${font.title3}
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;
  gap: 8px;
  padding: 9px;
  padding-left: 14px;
  padding-right: 6px;

  &.category:hover {
    background-color: #eaebeb;
    border-radius: 8px;
  }
`;

export const Icons = styled(Icon)`
  width: 18px;
  height: 18px;
`;

export const RightArrowIcon = styled(ArrowRoundedIcon)<{ open: boolean }>`
  transition: transform 0.3s;
  transform: rotate(${({ open }) => (open ? '270deg' : '180deg')});
  width: 14px;
  height: 14px;
`;

export const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 6px;

  &.category {
    background-color: #c5c5c5;
    border-radius: 4px;
    position: absolute;
  }
  &.filter {
    position: absolute;
    padding-right: 0.781vw;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 14px;
`;

export const AccordionContent = styled.div`
  ${font.body2}
  color: var(--gray2);
  margin-top: 12px;
  margin-left: 26px;
`;

export const CategoryItem = styled.button`
  ${font.title4}
  margin: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px;
  padding-left: 34px;
  &:hover {
    background-color: ${({ active }) =>
      active ? 'rgba(188, 188, 188, 0.2)' : '#eaebeb'};
    border-radius: 8px;
  }
`;

export const DotBox = styled.div`
  background-color: #c5c5c5;
  border-radius: 0.365vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
