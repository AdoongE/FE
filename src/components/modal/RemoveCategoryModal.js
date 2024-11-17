import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const RemoveCategoryModal = ({
  isOpen,
  onClose,
  categoryName,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    onConfirm(categoryName);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <ModalTitle>카테고리를 삭제하시겠습니까?</ModalTitle>
        <ModalText>
          카테고리를 삭제하면 저장된 콘텐츠도 함께 삭제됩니다. <br />
          그래도 삭제하시겠습니까?
        </ModalText>
        <ButtonContainer>
          <ModalButton className="no" onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton className="ok" onClick={handleConfirmDelete}>
            확인
          </ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

RemoveCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
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
  border-radius: 50px;
  width: 46.625rem;
  height: 21.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 1.625rem;
`;

const ModalText = styled.h2`
  font-size: 22px;
  font-family: 'Pretendard-Regular';
  margin-bottom: 3.25rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 17px;
`;

const ModalButton = styled.button`
  height: 3.375rem;
  width: 8.125rem;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #f2f2f2;
    color: black;
  }
`;
