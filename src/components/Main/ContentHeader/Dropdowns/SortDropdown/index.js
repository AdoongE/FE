import React, { useState } from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../style';
import { Icon } from '@iconify/react';
import useDropdownStore from '../../../../../store/useDropdownStore';

function SortDropdown() {
  const { sortOrder, setSortOrder } = useDropdownStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer onClick={(e) => e.stopPropagation()}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)} width="106px">
        {sortOrder}
        <Icon icon="uil:angle-down" className="dropdown-icon" />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              setSortOrder('최신순');
              setIsOpen(false);
            }}
          >
            최신순
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setSortOrder('이름순');
              setIsOpen(false);
            }}
          >
            이름순
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default SortDropdown;
