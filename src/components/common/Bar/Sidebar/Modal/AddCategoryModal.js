import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
// import { IOSSwitch } from '../switch/PublicCategorySwitch';
import { axiosInstance } from 'apis/axiosInstance';
// import { useCategories } from 'Bar/Sidebar/CategoryContext';
import { useCategories } from '../CategoryContext';

// export const AddCategoryModal = ({ onClose, onConfirm, categories }) => {
export const AddCategoryModal = ({ onClose, onConfirm }) => {
  const { categories } = useCategories();

  const [categoryName, setCategoryName] = useState('');
  const [isPublic, setIsPublic] = useState(true); // 토글 공개 여부

  // const handleToggle = () => {
  //   setIsPublic(!isPublic);
  // };

  const handleConfirm = async () => {
    const count = categories.filter((category) =>
      category.startsWith('새로운 카테고리'),
    ).length;
    const newCategoryName = categoryName || `새로운 카테고리 ${count + 1}`;
    onConfirm(newCategoryName);
    setCategoryName('');
    setIsPublic('');

    try {
      const response = await axiosInstance.post('/api/v1/category', {
        name: newCategoryName,
        isPublic: isPublic ? true : false,
      });

      if (response.status === 200) {
        console.log('이름', response);
        console.log('카테고리 생성 성공');
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
          <Label>
            공개 카테고리
            {/* <IOSSwitch checked={isPublic} onChange={handleToggle} /> */}
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
  border-radius: 2.604vw; /* 50px */
  width: 38.854vw; /* 746px */
  height: 19.323vw; /* 371px */
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
  justify-content: right;
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
