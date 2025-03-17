import React from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import {
  ModalOverlay,
  ModalContent,
  ModalDiv,
  ModalDelTitle,
  ButtonContainer,
  ModalButton,
} from '../style';

export const EditFilterModal = ({
  setShowDeleteModal,
  onRemoveFilter,
  initialFilterName,
  customFilter,
  filterIds,
}) => {
  const handleDeleteConfirm = async () => {
    const filterIndex = customFilter.indexOf(initialFilterName);
    const filterId = filterIds[filterIndex];

    onRemoveFilter();
    setShowDeleteModal(false);

    try {
      const response = await axiosInstance.delete(`/api/v1/filter/${filterId}`);

      if (response.status === 200) {
        console.log('필터 삭제 성공');
      } else {
        console.error('필터 삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <ModalOverlay onClick={() => setShowDeleteModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDiv>
          <ModalDelTitle>정말 삭제하시겠습니까?</ModalDelTitle>
          <ButtonContainer>
            <ModalButton
              className="remove-no"
              onClick={() => setShowDeleteModal(false)}
            >
              취소
            </ModalButton>
            <ModalButton className="remove-ok" onClick={handleDeleteConfirm}>
              삭제
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditFilterModal;
