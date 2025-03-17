import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const DropdownsContainer = styled.div`
  display: flex;
  gap: 12px; /* ✅ 드롭다운 간격 설정 */
  align-items: center;
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background: white;
  border: 1px solid var(--gray3);
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => (props.isDefault ? 'var(--gray2)' : '#333')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 🔥 아이콘을 오른쪽 끝에 정렬 */
  height: 40px;
  width: ${(props) => props.width || '160px'};
  padding: 10px 14px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--gray4);
  }
`;

/* 🔥 아이콘 추가 */
export const DropdownIcon = styled(Icon)`
  font-size: 18px;
  color: var(--gray2);
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid var(--gray3);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
`;

export const DropdownItem = styled.div`
  padding: 10px 12px;
  font-size: 16px;
  color: var(--gray1);
  cursor: pointer;
  text-align: left;
  height: 40px;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--green1);
    font-weight: 700;
  }
`;
