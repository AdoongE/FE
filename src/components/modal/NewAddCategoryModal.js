import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { PublicToggle } from '../Toggle/PublicCategoryToggle';
import { axiosInstance } from '../api/axios-instance';

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
          <Icon
            icon="line-md:close"
            style={{ width: '1.875vw', height: '1.875vw', cursor: 'pointer' }}
            onClick={closeModal}
          />
        </TopDiv>
        <Label>
          공개 카테고리
          <PublicToggle checked={isPublic} onChange={handleToggle} />
        </Label>
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
  width: 38.854vw; /* 746px */
  height: 19.271vw; /* 370px */
  border-radius: 2.604vw; /* 50px */
  background-color: white;
  border: none;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const ModalDiv = styled.div`
  margin: 2.604vw; /* 50px */
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.406vw; /* 27px */
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 700;
  font-family: 'Pretendard-Regular';
  margin-bottom: 0.521vw; /* 10px */
`;

const Label = styled.label`
  font-size: 1.146vw; /* 22px */
  font-family: 'Pretendard-Regular';
  color: #4f4f4f;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.573vw; /* 11px */
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
  gap: 1.042vw; /* 10px */
`;

const ModalButton = styled.button`
  height: 2.813vw; /* 54px */
  width: 5.156vw; /* 99px */
  font-size: 1.146vw; /* 22px */
  border: none;
  border-radius: 2.604vw; /* 50px */
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
