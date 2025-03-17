import React, { useState } from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import {
  ModalOverlay,
  ModalContent,
  ModalDiv,
  TopDiv,
  ModalTitle,
  Icons,
  Input,
  ButtonContainer,
  ModalButton,
} from '../style';

export const EditFilterModal = ({
  setShowEditModal,
  initialFilterName,
  onEditFilter,
  customFilter,
  filterIds,
}) => {
  const [newFilterName, setNewFilterName] = useState(initialFilterName);

  const handleEditConfirm = async () => {
    const filterIndex = customFilter.indexOf(initialFilterName);
    const filterId = filterIds[filterIndex];

    if (newFilterName.trim()) {
      onEditFilter(newFilterName.trim());
      setShowEditModal(false);
    }
    try {
      const response = await axiosInstance.patch(
        `/api/v1/filter/${filterId}/name`,
        {
          name: newFilterName,
        },
      );

      if (response.status === 200) {
        console.log('필터 이름 수정 성공');
      } else {
        console.error('필터 이름 수정 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <ModalOverlay onClick={() => setShowEditModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDiv>
          <TopDiv className="edit">
            <ModalTitle>맞춤 필터 이름 변경</ModalTitle>
            <Icons
              icon="line-md:close"
              onClick={() => setShowEditModal(false)}
            />
          </TopDiv>
          <Input
            type="text"
            value={newFilterName}
            onChange={(e) => setNewFilterName(e.target.value)}
            placeholder={initialFilterName}
          />
          <ButtonContainer>
            <ModalButton className="no" onClick={() => setShowEditModal(false)}>
              취소
            </ModalButton>
            <ModalButton className="ok" onClick={handleEditConfirm}>
              저장
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditFilterModal;
