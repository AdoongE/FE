import React, { useState, useEffect, useRef } from 'react';
import EditFilterModal from '../Modal/Filter/EditFilterModal';
import RemoveFilterModal from '../Modal/Filter/RemoveFilterModal';
import { DropdownMenu, DropdownItem, Icons } from './style';

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
