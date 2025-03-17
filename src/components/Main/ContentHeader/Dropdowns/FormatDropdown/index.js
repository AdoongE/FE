import React, { useState } from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../style';
import { Icon } from '@iconify/react';

function FormatDropdown({ setSelectedFormat }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('저장형식');

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSelectedFormat(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <Icon
          icon="uil:angle-down"
          style={{ fontSize: '18px', color: 'var(--gray2)' }}
        />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => handleSelect('전체보기')}>
            전체보기
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect('링크')}>링크</DropdownItem>
          <DropdownItem onClick={() => handleSelect('이미지')}>
            이미지
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect('PDF')}>PDF</DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default FormatDropdown;
