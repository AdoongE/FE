import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from 'styles/font';

export const TagImage = styled.img`
  size: 100px;
`;

export const Notag = styled.div`
  height: 300px; /* 400px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 9px; /* 10px */
  font-weight: 500;
  font-size: 23.639px; /* 32px */
  color: var(--gray1);
`;

export const Short = styled.div`
  display: flex;
  column-gap: 8px; /* 10px */
  color: var(--gray1);
  ${font.title4}
  margin-bottom: 40px;
`;

export const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
  font-weight: ${(props) => (props.$isSelected ? 500 : 400)};
`;

export const Options = styled.div`
  display: flex;
  column-gap: 12px; /* 16px */
  text-align: center;
  font-size: 16px;
  margin-bottom: 15px; /* 12px */
`;

export const TagItem = styled.button`
  height: 46px; /* 54px */
  width: fit-content;
  border-radius: 40px; /* 50px */
  font-size: 18.609px; /* 22px */
  font-weight: 600;
  padding: 12px 24px; /* 14px 30px */
  color: ${(props) => (props.$isSelected ? 'white' : '#9F9F9F')};
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : 'white')};
  border: ${(props) => (props.$isSelected ? 0 : '1px solid var(--gray2)')};
`;

export const TagContainer = styled.div`
  width: 500px; /* 640px */
  height: 300px; /* 400px */
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px; /* 11px */
  row-gap: 16px; /* 20px */
  overflow-y: auto;
  align-content: flex-start;
`;

export const CheckIcon = styled(Icon)`
  size: 20px;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Icons = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const Title = styled.div`
  ${font.title0}
`;

export const HeaderIcon = styled(Icon)`
  size: 28px;
`;
