import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { PublicToggle } from '../Toggle/PublicCategoryToggle';
import { axiosInstance } from '../api/axios-instance';
import { font } from '../../styles/font';

export const AddCategoryModal = ({ onClose, onConfirm, categories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isPublic, setIsPublic] = useState(true); // 토글 공개 여부

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleConfirm = async () => {
    const count = categories.filter((category) =>
      category.startsWith('새로운 카테고리'),
    ).length;
    const newCategoryName = categoryName || `새로운 카테고리 ${count + 1}`;

    try {
      const response = await axiosInstance.post('/api/v1/category', {
        name: newCategoryName,
        isPublic: isPublic ? true : false,
      });

      if (response.status === 200) {
        console.log('카테고리 생성 성공');
        onConfirm(newCategoryName);
        setCategoryName('');
      } else {
        console.error('카테고리 생성 실패');
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
            <ModalTitle>카테고리 추가</ModalTitle>
            <Icons icon="line-md:close" onClick={onClose} />
          </TopDiv>
          <LabelDiv>
            <Label>공개 카테고리</Label>
            <PublicToggle checked={isPublic} onChange={handleToggle} />
          </LabelDiv>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="카테고리 이름을 입력하세요. (선택)"
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

const ModalTitle = styled.p`
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

const LabelDiv = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`;

const Label = styled.label`
  ${font.title4}
  color: var(--gray1);
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: 500;
  ::placeholder {
    color: var(--gray2);
  }
  background-color: var(--gray6);
  display: flex;
  border: none;
  border-bottom: 0.73px solid var(--gray2);
  width: 100%;
  padding: 12px 0;
  margin-bottom: 20px;
  padding-left: 14px;
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
