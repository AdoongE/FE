import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const DropdownMenu = styled.ul`
  position: absolute;
  left: 330px;
  background-color: white;
  border-radius: 10px;
  list-style: none;
  z-index: 1;
  width: 14.875rem;
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

const Dropdown = ({
  isOpen,
  onClose,
  categoryName,
  isBookmarked,
  onBookmarkAdd,
  onBookmarkRemove,
  onEditCategory,
  onRemoveCategory,
}) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleBookmark = () => {
    if (isBookmarked) {
      onBookmarkRemove(categoryName);
    } else {
      onBookmarkAdd(categoryName);
    }
    onClose();
  };

  const handleEditCategory = () => {
    onEditCategory(categoryName);
    onClose();
  };

  const handleDeleteCategory = () => {
    onRemoveCategory(categoryName);
    onClose();
  };

  return (
    <DropdownMenu ref={dropdownRef}>
      <DropdownItem onClick={toggleBookmark}>
        <Icons
          icon={
            isBookmarked
              ? 'mdi:bookmark-remove-outline'
              : 'mdi:bookmark-plus-outline'
          }
        />
        {isBookmarked ? '북마크에서 삭제' : '북마크에 추가'}
      </DropdownItem>
      <DropdownItem onClick={handleEditCategory}>
        <Icons icon="iconamoon:edit-light" />
        카테고리 이름 편집
      </DropdownItem>
      <DropdownItem onClick={handleDeleteCategory}>
        <Icons icon="mage:trash" />
        {`'${categoryName}' 삭제`}
      </DropdownItem>
    </DropdownMenu>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  onBookmarkAdd: PropTypes.func.isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
};

export default Dropdown;
