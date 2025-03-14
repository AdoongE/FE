import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../../../../../apis/axiosInstance';

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
            <Icon
              icon="line-md:close"
              style={{
                width: '1.875vw',
                height: '1.875vw',
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
  categoryId: PropTypes.number.isRequired,
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
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 2.604vw; /* 50px */
  width: 38.854vw; /* 746px */
  height: 18.229vw; /* 350px */
`;

const ModalDiv = styled.div`
  margin: 2.604vw; /* 3.125rem */
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.406vw; /* 27px */
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 700;
  margin-bottom: 0.521vw; /* 10px */
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 0.052vw solid #7f7f7f; /* 1px */
  width: 100%;
  height: 3.542vw; /* 68px */
  margin-top: 1.354vw; /* 26px */
  margin-bottom: 0.938vw; /* 18px */
  font-size: 1.563vw; /* 30px */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 2.813vw; /* 54px */
  width: 5.156vw; /* 99px */
  font-size: 1.146vw; /* 22px */
  border: none;
  border-radius: 2.604vw; /* 50px */
  cursor: pointer;
  margin-right: 1.042vw; /* 10px */
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;
