import styled from 'styled-components';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
`;

export const Tag = styled.div`
  padding: 0.5vw 1vw;
  background-color: #e0f7f5;
  border-radius: 0.5vw;
  font-size: 1vw;
  display: flex;
  align-items: center;
  gap: 0.3vw;

  .close-icon {
    width: 1vw;
    cursor: pointer;
  }
`;
