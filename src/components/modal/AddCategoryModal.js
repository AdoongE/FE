import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { IOSSwitch } from '../switch/PublicCategorySwitch';

export const AddCategoryModal = ({ onClose, onConfirm }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isPublic, setIsPublic] = useState(true); // 토글 공개 여부

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleConfirm = () => {
    const newCategoryName = categoryName || '새로운 카테고리'; // 입력이 없을 때 추가 내용
    onConfirm(newCategoryName);
    setCategoryName('');
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDiv>
          <TopDiv>
            <ModalTitle>카테고리 추가</ModalTitle>
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
          <Label>
            공개 카테고리
            <IOSSwitch checked={isPublic} onChange={handleToggle} />
          </Label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder=" 카테고리 이름을 입력하세요. (선택)"
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

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddCategoryModal;

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

const Label = styled.label`
  font-size: 22px;
  font-family: 'Pretendard-Regular';
  color: #4f4f4f;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 11px;
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
