import styled from 'styled-components';

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  background: var(--gray4);
  border-radius: 8px;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--gray3);
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 14px;
  color: var(--gray1);
  font-weight: 500;

  button {
    background: none;
    border: none;
    margin-left: 6px;
    font-size: 16px;
    color: var(--gray2);
    cursor: pointer;
  }

  button:hover {
    color: var(--gray1);
  }
`;
