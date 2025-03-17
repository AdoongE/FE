import styled from 'styled-components';

export const DropdownsContainer = styled.div`
  display: flex;
  gap: 8px; /* ✅ 드롭다운 간격 */
  align-items: center;
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid var(--gray3);
  border-radius: 8px;
  font-size: 14px;
  color: ${(props) => (props.isDefault ? 'var(--gray2)' : '#333')};
  cursor: pointer;
  padding: 12px 16px; /* 🔥 버튼 내부 패딩 */

  width: ${(props) => (props.$isSort ? '106px' : '137px')}
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--gray4);
  }

  .dropdown-icon {
    margin-left: 8px;
    font-size: 16px;
    color: var(--gray2);
  }
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
  width: ${(props) => (props.$isSort ? '106px' : '137px')};
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--gray1);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--green1);
    font-weight: 600;
  }
`;
