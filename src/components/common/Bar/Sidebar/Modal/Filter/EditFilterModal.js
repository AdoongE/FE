import React, { useState } from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
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
          <TopDiv>
            <ModalTitle>맞춤 필터 이름 변경</ModalTitle>
            <Icon
              icon="line-md:close"
              style={{
                width: '1.875vw',
                height: '1.875vw',
                cursor: 'pointer',
              }}
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
              확인
            </ModalButton>
          </ButtonContainer>
        </ModalDiv>
      </ModalContent>
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 2.604vw; /* 50px */
  width: 38.854vw; /* 46.625rem → 891px */
  height: 18.229vw; /* 21.875rem → 350px */
`;

const ModalDiv = styled.div`
  margin: 2.604vw; /* 3.125rem → 60px */
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.406vw; /* 27px */
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 0.521vw; /* 10px */
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 0.052vw solid #7f7f7f; /* 1px */
  width: 100%;
  height: 3.542vw; /* 4.25rem → 85px */
  margin-top: 1.354vw; /* 26px */
  margin-bottom: 0.938vw; /* 18px */
  font-size: 1.563vw; /* 30px */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 2.813vw; /* 3.375rem → 65px */
  width: 5.156vw; /* 6.188rem → 120px */
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
