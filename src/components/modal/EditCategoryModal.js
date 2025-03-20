import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from '../../styles/font';
import { axiosInstance } from '../api/axios-instance';

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
          <TopDiv>
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
              확인
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
    </ModalOverlay>
  );
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
  border-radius: 36px;
  width: 542px;
`;

const ModalDiv = styled.div`
  padding: 0 36px;
  padding-top: 40px;
  padding-bottom: 25px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  &.edit {
    margin-bottom: 56px;
  }
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

const Icons = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
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
