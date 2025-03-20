import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from '../../styles/font';

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

export default Dropdown;

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
    transform: translate(-50%, -5%);
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
