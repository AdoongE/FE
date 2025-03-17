import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu, DropdownItem, Icons } from './style';

const Dropdown = ({
  isOpen,
  onClose,
  categoryName,
  categoryLength,
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
    <DropdownMenu ref={dropdownRef} categoryLength={categoryLength}>
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
