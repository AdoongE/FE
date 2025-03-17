import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from 'styles/font';
import EditFilterModal from '../Modal/Filter/EditFilterModal';
import RemoveFilterModal from '../Modal/Filter/RemoveFilterModal';

const DropdownMenu = styled.ul`
  position: absolute;
  left: 365px;
  transform: translate(-50%, -5%);
  background-color: white;
  border-radius: 8px;
  z-index: 1;
  width: 148px;
  box-shadow: 0 0 9px #dfdfdf;
  padding: 4px;
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
  // const [newFilterName, setNewFilterName] = useState(initialFilterName);
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
        <EditFilterModal
          setShowEditModal={setShowEditModal}
          onEditFilter={onEditFilter}
          initialFilterName={initialFilterName}
          customFilter={customFilter}
          filterIds={filterIds}
        />
      )}

      {showDeleteModal && (
        <RemoveFilterModal
          setShowDeleteModal={setShowDeleteModal}
          onRemoveFilter={onRemoveFilter}
          initialFilterName={initialFilterName}
          customFilter={customFilter}
          filterIds={filterIds}
        />
      )}
    </>
  );
};

export default FilterDropdown;
