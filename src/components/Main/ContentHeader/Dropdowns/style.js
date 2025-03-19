import styled from 'styled-components';

export const DropdownsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
`;

export const DropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid var(--gray3);
  border-radius: 8px;
  font-size: 12px;
  color: var(--gray2);
  cursor: pointer;
  padding: 8px 16px;

  width: ${(props) => (props.$isSort ? '106px' : '137px')}
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
  display: none; /* ✅ 기본적으로 숨김 */

  /* ✅ 호버 시 드롭다운 표시 */
  ${DropdownContainer}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--gray2);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--green1);
    font-weight: 600;
  }
`;
