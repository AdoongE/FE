import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  padding: 0.8vw 1.5vw;
  background-color: var(--gray4);
  color: var(--gray2);
  font-size: 1vw;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;
