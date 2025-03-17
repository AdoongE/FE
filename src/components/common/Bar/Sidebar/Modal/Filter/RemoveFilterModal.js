import React from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import styled from 'styled-components';
// import {
//   ModalOverlay,
//   ModalContent,
//   ModalDiv,
//   TopDiv,
//   ModalTitle,
//   Icons,
//   Label,
//   Input,
//   ButtonContainer,
//   ModalButton,
// } from './style';

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
      <ModalDelContent onClick={(e) => e.stopPropagation()}>
        <ModalDelTitle>정말 삭제하시겠습니까?</ModalDelTitle>
        <ButtonDelContainer>
          <ModalDelButton
            className="no"
            onClick={() => setShowDeleteModal(false)}
          >
            아니오
          </ModalDelButton>
          <ModalDelButton className="ok" onClick={handleDeleteConfirm}>
            네
          </ModalDelButton>
        </ButtonDelContainer>
      </ModalDelContent>
    </ModalOverlay>
  );
};

export default EditFilterModal;

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

const ModalDelContent = styled.div`
  background-color: white;
  border-radius: 2.604vw; /* 50px */
  width: 33.177vw; /* 39.813rem → 763px */
  height: 18.229vw; /* 21.875rem → 350px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalDelTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 2.969vw; /* 3.563rem → 68px */
`;

const ButtonDelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.781vw; /* 15px */
`;

const ModalDelButton = styled.button`
  width: 6.771vw; /* 130px */
  height: 2.813vw;
  font-size: 1.146vw; /* 22px */
  border: none;
  border-radius: 0.521vw; /* 10px */
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #f2f2f2;
    color: black;
  }
`;
