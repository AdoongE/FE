import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  border-radius: 2.604vw; /* 50px */
  width: 38.854vw; /* 746px */
  height: 18.229vw; /* 350px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 2.083vw; /* 40px */
`;

const ModalText = styled.h2`
  font-size: 1.146vw; /* 22px */
  font-family: 'Pretendard-Regular';
  margin-bottom: 3.385vw; /* 65px */
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.885vw; /* 17px */
`;

const ModalButton = styled.button`
  width: 6.771vw; /* 130px */
  height: 2.813vw;
  font-size: 1.146vw; /* 22px */
  border: none;
  border-radius: 0.521vw; /* 10px */
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
