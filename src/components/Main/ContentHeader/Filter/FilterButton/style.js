import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--gray4);
  color: var(--gray1);
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  .filter-icon {
    font-size: 18px;
    color: var(--gray2);
  }

  &:hover {
    background: var(--gray3);
  }
`;
