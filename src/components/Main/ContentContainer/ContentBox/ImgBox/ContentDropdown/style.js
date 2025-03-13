import styled from 'styled-components';
import { font } from 'styles/font';

export const Text = styled.div`
  margin-left: 11px;
  ${font.body2}
`;

export const Options = styled.button`
  width: 110px;
  border: 0;
  background-color: white;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  color: black;
  border: 0;
  position: relative;
  background-color: transparent;
`;

export const Open = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  align-items: flex-start;
  width: 120px;
  height: 52px;
  border-radius: 6.518px;
  background-color: white;
  color: #4f4f4f;
  padding: 6px 0px;
`;
