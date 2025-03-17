import React, { useState } from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../style';
import { Icon } from '@iconify/react';

function SortDropdown({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('정렬');

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSortOrder(option);
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
          <DropdownItem onClick={() => handleSelect('최신순')}>
            최신순
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect('이름순')}>
            이름순
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default SortDropdown;
