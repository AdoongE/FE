import React, { useState } from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../style';
import { Icon } from '@iconify/react';
import useDropdownStore from '../../../../../store/useDropdownStore';

function FormatDropdown() {
  const { selectedFormat, setSelectedFormat } = useDropdownStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer onClick={(e) => e.stopPropagation()}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)} width="137px">
        {selectedFormat}
        <Icon icon="uil:angle-down" className="dropdown-icon" />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              setSelectedFormat('전체보기');
              setIsOpen(false);
            }}
          >
            전체보기
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setSelectedFormat('링크');
              setIsOpen(false);
            }}
          >
            링크
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setSelectedFormat('이미지');
              setIsOpen(false);
            }}
          >
            이미지
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setSelectedFormat('PDF');
              setIsOpen(false);
            }}
          >
            PDF
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default FormatDropdown;
