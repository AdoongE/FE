import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { PublicToggle } from '../Toggle/PublicCategoryToggle';
import { axiosInstance } from '../api/axios-instance';
import { font } from '../../styles/font';

const NewAddCategoryModal = forwardRef(({ onConfirm }, ref) => {
  const [isPublic, setIsPublic] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const closeModal = () => {
    ref.current?.close();
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleAddCategory = async () => {
    const newCategoryName = categoryName.trim() || '새로운 카테고리';
    onConfirm(newCategoryName);
    setCategoryName('');
    try {
      const response = await axiosInstance.post('/api/v1/category', {
        name: newCategoryName,
        isPublic: isPublic ? true : false,
      });

      if (response.status === 200) {
        console.log('카테고리 생성 성공');
        closeModal();
      } else {
        console.error('카테고리 생성 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
          <Icons icon="line-md:close" onClick={closeModal} />
        </TopDiv>
        <LabelDiv>
          <Label>공개 카테고리</Label>
          <PublicToggle checked={isPublic} onChange={handleToggle} />
        </LabelDiv>
        <Input
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
          placeholder="카테고리 이름을 입력하세요. (선택)"
        />
        <ButtonContainer>
          <ModalButton type="button" className="no" onClick={closeModal}>
            취소
          </ModalButton>
          <ModalButton type="button" className="ok" onClick={handleAddCategory}>
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
  border-radius: 36px;
  width: 542px;
  background-color: white;
  border: none;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
  padding: 0;
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
  color: var(--gray2);
  background-color: var(--sidebar);
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
`;
