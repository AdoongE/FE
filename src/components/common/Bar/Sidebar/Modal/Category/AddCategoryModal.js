import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PublicToggle } from '../../Toggle/PublicCategoryToggle';
import { axiosInstance } from 'apis/axiosInstance';
// import { useCategories } from 'Bar/Sidebar/CategoryContext';
import { useCategories } from '../../CategoryContext';
import {
  ModalOverlay,
  ModalContent,
  ModalDiv,
  TopDiv,
  ModalTitle,
  Icons,
  Label,
  Input,
  ButtonContainer,
  ModalButton,
} from '../style';

export const AddCategoryModal = ({ onClose, onConfirm }) => {
  const { categories } = useCategories();

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
            <Icons icon="line-md:close" onClick={onClose} />
          </TopDiv>
          <Label>
            공개 카테고리
            <PublicToggle checked={isPublic} onChange={handleToggle} />
          </Label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="   카테고리 이름을 입력하세요. (선택)"
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

AddCategoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddCategoryModal;
