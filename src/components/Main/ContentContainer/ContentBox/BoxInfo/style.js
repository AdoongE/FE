import styled from 'styled-components';
import { font } from 'styles/font';
import { Icon } from '@iconify/react';

export const IconBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--gray1);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  border: 0;
  border-radius: 37.5px;
  opacity: 80%;
  background-color: white;
  border: 0.375px solid var(--gray2);
  padding: 4px 6px;
  ${font.body3}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentTitle = styled.div`
  margin: 8px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ContentName = styled.div`
  ${font.title3}
  word-break: break-word;
  flex-shrink: 0;
`;

export const CategoryDisplay = styled.div`
  ${font.body2}
  color: var(--gray1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MemoText = styled.div`
  margin-top: 4px;
  ${font.body2}
  color: var(--gray2);
`;

export const StyledIcon = styled(Icon).attrs((props) => ({
  icon: props.icon || 'ic:round-link',
}))`
  width: 12px;
  height: 12px;
  color: white;
  z-index: 2;
  cursor: pointer;
`;
