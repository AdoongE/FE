import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

export const EditCategoryModal = ({
  isOpen,
  onClose,
  initialCategoryName,
  onConfirm,
}) => {
  const [newCategoryName, setNewCategoryName] = useState(initialCategoryName);

  useEffect(() => {
    if (isOpen) {
      setNewCategoryName(initialCategoryName);
    }
  }, [isOpen, initialCategoryName]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(newCategoryName);
    setNewCategoryName('');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalDiv>
          <TopDiv>
            <ModalTitle>카테고리 이름 편집</ModalTitle>
            <Icon
              icon="line-md:close"
              style={{
                width: '36px',
                height: '36px',
                cursor: 'pointer',
              }}
              onClick={onClose}
            />
          </TopDiv>
          <Input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder={`${initialCategoryName}`}
          />
          <ButtonContainer>
            <ModalButton className="no" onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton className="ok" onClick={handleConfirm}>
              확인
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

EditCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialCategoryName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default EditCategoryModal;

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
`;

const ModalDiv = styled.div`
  margin: 3.125rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
  height: 4.25rem;
  margin-top: 26px;
  margin-bottom: 18px;
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 3.375rem;
  width: 6.188rem;
  font-size: 22px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 10px;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;