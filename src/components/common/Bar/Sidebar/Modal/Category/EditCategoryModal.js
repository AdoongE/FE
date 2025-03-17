import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from 'apis/axiosInstance';
import {
  ModalOverlay,
  ModalContent,
  ModalDiv,
  TopDiv,
  ModalTitle,
  Icons,
  Input,
  ButtonContainer,
  ModalButton,
} from './style';

export const EditCategoryModal = ({
  isOpen,
  onClose,
  initialCategoryName,
  onConfirm,
  categoryId,
}) => {
  const [newCategoryName, setNewCategoryName] = useState(initialCategoryName);

  useEffect(() => {
    if (isOpen) {
      setNewCategoryName(initialCategoryName);
    }
  }, [isOpen, initialCategoryName]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    onConfirm(newCategoryName);
    setNewCategoryName('');
    console.log('이름 편집 아이디', categoryId);

    try {
      const response = await axiosInstance.patch(`/api/v1/category`, {
        name: newCategoryName,
        categoryId: categoryId,
      });

      if (response.status === 200) {
        console.log('카테고리 편집 성공');
      } else {
        console.error('카테고리 편집 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDiv>
          <TopDiv className="edit">
            <ModalTitle>카테고리 이름 편집</ModalTitle>
            <Icons icon="line-md:close" onClick={onClose} />
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
              저장
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
  categoryId: PropTypes.number.isRequired,
};

export default EditCategoryModal;
