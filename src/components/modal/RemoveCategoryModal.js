import React from 'react';
import styled from 'styled-components';
import { font } from '../../styles/font';

export const RemoveCategoryModal = ({
  isOpen,
  onClose,
  categoryId,
  categoryName,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    onConfirm(categoryId, categoryName);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <ModalDiv>
          <ModalTitle className="remove">
            카테고리를 삭제하시겠습니까?
          </ModalTitle>
          <ModalText>
            카테고리를 삭제하면 저장된 콘텐츠도 함께 삭제됩니다. <br />
            그래도 삭제하시겠습니까?
          </ModalText>
          <ButtonContainer>
            <ModalButton className="remove-no" onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton className="remove-ok" onClick={handleConfirmDelete}>
              삭제
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RemoveCategoryModal;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 36px;
  width: 542px;
`;

const ModalDiv = styled.div`
  padding: 0 36px;
  padding-top: 40px;
  padding-bottom: 25px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &.remove {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ModalButton = styled.button`
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

const ModalText = styled.h2`
  ${font.title3}
  color: var(--gray1);
  margin-bottom: 37px;
  text-align: center;
`;
