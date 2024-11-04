import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const DropdownMenu = styled.ul`
  position: absolute;
  /* top: 50;
  right: 30%; */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  list-style: none;
  z-index: 1;
  width: 14.875rem;
  /* padding: 9px; */
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

const Dropdown = ({ isOpen, onClose, categoryName }) => {
  if (!isOpen) return null;

  const handleAddBookmark = () => {
    onClose();
  };

  const handleEditCategory = () => {
    onClose();
  };

  const handleDeleteCategory = () => {
    onClose();
    console.log('hi' + categoryName);
  };

  return (
    <DropdownMenu>
      <DropdownItem onClick={handleAddBookmark}>
        <Icons icon="mdi:bookmark-plus-outline" />
        북마크에 추가
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
};

export default Dropdown;
