import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { IOSSwitch } from '../switch/PublicCategorySwitch';

const NewAddCategoryModal = forwardRef(({ onConfirm }, ref) => {
  const [isPublic, setIsPublic] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const closeModal = () => {
    ref.current?.close();
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleAddCategory = () => {
    const newCategoryName = categoryName.trim() || '새로운 카테고리';
    onConfirm(newCategoryName);
    setCategoryName('');
    closeModal();
  };

  useEffect(() => {
    if (ref.current) {
      const dialogElement = ref.current;
      const handleClickOutside = (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      };
      dialogElement.addEventListener('click', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  return (
    <Dialog ref={ref}>
      <ModalDiv>
        <TopDiv>
          <ModalTitle>카테고리 추가</ModalTitle>
          <Icon
            icon="line-md:close"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
            onClick={closeModal}
          />
        </TopDiv>
        <Label>
          공개 카테고리
          <IOSSwitch checked={isPublic} onChange={handleToggle} />
        </Label>
        <Input
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
          placeholder="카테고리 이름을 입력하세요. (선택)"
        />
        <ButtonContainer>
          <ModalButton className="no" onClick={closeModal}>
            취소
          </ModalButton>
          <ModalButton className="ok" onClick={handleAddCategory}>
            확인
          </ModalButton>
        </ButtonContainer>
      </ModalDiv>
    </Dialog>
  );
});

NewAddCategoryModal.displayName = 'NewAddCategoryModal';

export default NewAddCategoryModal;
const Dialog = styled.dialog`
  position: relative;
  width: 746px;
  height: 370px;
  border-radius: 50px;
  background-color: white;
  border: none;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const ModalDiv = styled.div`
  margin: 50px;
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
  justify-content: end;
  align-items: center;
  gap: 11px;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
  height: 68px;
  margin-top: 26px;
  margin-bottom: 18px;
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  height: 54px;
  width: 99px;
  font-size: 22px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;
