import styled from 'styled-components';
import { font } from 'styles/font';
import { Icon } from '@iconify/react';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 36px;
  width: 542px;
`;

export const ModalDiv = styled.div`
  padding: 0 36px;
  padding-top: 40px;
  padding-bottom: 25px;
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  &.edit {
    margin-bottom: 56px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &.remove {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const Icons = styled(Icon)`
  width: 24px;
  height: 24px;
`;

export const Label = styled.label`
  ${font.title4}
  color: var(--gray1);
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`;

export const Input = styled.input`
  font-size: 20px;
  font-weight: 500;
  color: var(--gray2);
  background-color: var(--gray6);
  display: flex;
  border: none;
  border-bottom: 0.73px solid var(--gray2);
  width: 100%;
  padding: 12px 0;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ModalButton = styled.button`
  ${font.title3}
  border: none;
  border-radius: 36px;
  padding: 10px 20px;
  cursor: pointer;
  &.ok {
    background-color: var(--green2);
    color: white;
  }
  &.no {
    background-color: var(--gray4);
    color: black;
  }
  &.remove-ok {
    background-color: var(--green2);
    color: white;
    border-radius: 8px;
    padding: 10.5px 32px;
  }
  &.remove-no {
    background-color: var(--gray4);
    color: black;
    border-radius: 8px;
    padding: 10.5px 32px;
  }
`;

export const ModalText = styled.h2`
  ${font.title3}
  color: var(--gray1);
  margin-bottom: 37px;
  text-align: center;
`;
