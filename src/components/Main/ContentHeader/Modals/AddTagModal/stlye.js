import styled from 'styled-components';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
`;

export const Tag = styled.span`
  padding: 0.5vw 1vw;
  background-color: #f0f0f0;
  border-radius: 0.5vw;
  font-size: 1vw;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 1vw;
  margin-top: 1vw;
  background-color: #41c3ab;
  color: white;
  font-size: 1.2vw;
  font-weight: bold;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;
`;
