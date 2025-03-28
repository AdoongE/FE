import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from '../../styles/font';
import { axiosInstance } from '../api/axios-instance';

const FilterDropdown = ({
  isOpen,
  onClose,
  initialFilterName,
  onEditFilter,
  onRemoveFilter,
  customFilter,
  filterIds,
}) => {
  const dropdownRef = useRef();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newFilterName, setNewFilterName] = useState(initialFilterName);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showEditModal) return;
      if (showDeleteModal) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose, showEditModal, showDeleteModal]);

  if (!isOpen) return null;

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
    <>
      <DropdownMenu
        className="filter"
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownItem onClick={() => setShowEditModal(true)}>
          <Icons icon="iconamoon:edit-light" />
          이름 변경하기
        </DropdownItem>
        <DropdownItem onClick={() => setShowDeleteModal(true)}>
          <Icons icon="mage:trash" />
          삭제하기
        </DropdownItem>
      </DropdownMenu>

      {showEditModal && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalDiv>
              <TopDiv className="edit">
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
                <ModalButton
                  className="no"
                  onClick={() => setShowEditModal(false)}
                >
                  취소
                </ModalButton>
                <ModalButton className="ok" onClick={handleEditConfirm}>
                  확인
                </ModalButton>
              </ButtonContainer>
            </ModalDiv>
          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteModal && (
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
                <ModalButton
                  className="remove-ok"
                  onClick={handleDeleteConfirm}
                >
                  삭제
                </ModalButton>
              </ButtonContainer>
            </ModalDiv>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default FilterDropdown;

const DropdownMenu = styled.ul`
  position: absolute;
  left: 280px;
  background-color: white;
  border-radius: 8px;
  z-index: 1;
  width: ${({ categoryLength }) =>
    `calc(${Math.max(12.396, categoryLength * 1.083 + 4.167)}vw)`};
  box-shadow: 0 0 9px #dfdfdf;
  padding: 4px;
  &.filter {
    left: 365px;
    transform: translate(-75%, -5%);
    width: 148px;
  }
`;

const DropdownItem = styled.li`
  ${font.body2}
  padding: 9px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  &:hover {
    background-color: #ededed;
  }
`;

const Icons = styled(Icon)`
  width: 16px;
  height: 16px;
`;

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
  height: 254px;
`;

const ModalDiv = styled.div`
  margin-top: 82px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  &.edit {
    margin-bottom: 56px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &.remove {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: 500;
  color: var(--gray2);
  background-color: var(--gray6);
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

const ModalDelTitle = styled.h2`
  ${font.title0}
  margin-bottom: 62px;
  display: flex;
  justify-content: center;
`;
