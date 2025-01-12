import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';

const DropdownMenu = styled.ul`
  position: absolute;
  left: 22.396vw; /* 430px */
  transform: translate(-50%, -5%);
  background-color: white;
  border-radius: 0.521vw; /* 10px */
  list-style: none;
  z-index: 1;
  width: 10.417vw; /* 200px */
  box-shadow: 0 0 0.417vw #dfdfdf; /* 8px */
`;

const DropdownItem = styled.li`
  padding-left: 0.781vw; /* 15px */
  margin: 0.469vw 0.365vw; /* 9px 7px */
  border-radius: 0.521vw; /* 10px */
  cursor: pointer;
  height: 1.823vw; /* 35px */
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgba(188, 188, 188, 0.5);
  }
  font-size: 0.938vw; /* 18px */
`;

const Icons = styled(Icon)`
  width: 1.25vw; /* 24px */
  height: 1.25vw; /* 24px */
  margin-right: 0.885vw; /* 17px */
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
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 2.604vw; /* 50px */
  width: 24.271vw; /* 46.625rem → 891px */
  height: 11.406vw; /* 21.875rem → 350px */
`;

const ModalDiv = styled.div`
  margin: 1.627vw; /* 3.125rem → 60px */
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
  height: 2.219vw; /* 4.25rem → 85px */
  margin-top: 1.354vw; /* 26px */
  margin-bottom: 0.938vw; /* 18px */
  font-size: 1.563vw; /* 30px */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 1.757vw; /* 3.375rem → 65px */
  width: 3.222vw; /* 6.188rem → 120px */
  font-size: 1.146vw; /* 22px */
  border: none;
  border-radius: 2.604vw; /* 50px */
  cursor: pointer;
  margin-right: 0.521vw; /* 10px */
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;

const ModalDelContent = styled.div`
  background-color: white;
  border-radius: 2.604vw; /* 50px */
  width: 20.735vw; /* 39.813rem → 763px */
  height: 11.406vw; /* 21.875rem → 350px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalDelTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 1.854vw; /* 3.563rem → 68px */
`;

const ButtonDelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.781vw; /* 15px */
`;

const ModalDelButton = styled.button`
  height: 1.757vw; /* 3.375rem → 65px */
  width: 4.219vw; /* 8.125rem → 155px */
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
      <DropdownMenu ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
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
      )}
    </>
  );
};

FilterDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialFilterName: PropTypes.string.isRequired,
  onEditFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
};

export default FilterDropdown;
