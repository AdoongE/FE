import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const DropdownMenu = styled.ul`
  position: absolute;
  left: 430px;
  transform: translate(-50%, -65%);
  background-color: white;
  border-radius: 10px;
  list-style: none;
  z-index: 1;
  width: 200px;
  box-shadow: 0 0 8px #dfdfdf;
`;

const DropdownItem = styled.li`
  padding-left: 15px;
  margin: 9px 7px;
  border-radius: 10px;
  cursor: pointer;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgba(188, 188, 188, 0.5);
  }
  font-size: 18px;
`;

const Icons = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-right: 17px;
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
  border-radius: 50px;
  width: 46.625rem;
  height: 21.875rem;
`;

const ModalDiv = styled.div`
  margin: 3.125rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
  height: 4.25rem;
  margin-top: 26px;
  margin-bottom: 18px;
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 3.375rem;
  width: 6.188rem;
  font-size: 22px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 10px;
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
  border-radius: 50px;
  width: 39.813rem;
  height: 21.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalDelTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 3.563rem;
`;

const ButtonDelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const ModalDelButton = styled.button`
  height: 3.375rem;
  width: 8.125rem;
  font-size: 22px;
  border: none;
  border-radius: 10px;
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

  const handleEditConfirm = () => {
    if (newFilterName.trim()) {
      onEditFilter(newFilterName.trim());
      setShowEditModal(false);
    }
  };
  const handleDeleteConfirm = () => {
    onRemoveFilter();
    setShowDeleteModal(false);
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
                <ModalTitle>필터 이름 편집</ModalTitle>
                <Icon
                  icon="line-md:close"
                  style={{
                    width: '36px',
                    height: '36px',
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
