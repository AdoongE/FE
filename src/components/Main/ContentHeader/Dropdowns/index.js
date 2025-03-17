import React, { useRef, useEffect } from 'react';
import SortDropdown from './SortDropdown';
import FormatDropdown from './FormatDropdown';
import { DropdownsContainer } from './style';
import useDropdownStore from '../../../../store/useDropdownStore';

function Dropdowns() {
  const { resetDropdowns } = useDropdownStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        resetDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resetDropdowns]);

  return (
    <div ref={dropdownRef}>
      <DropdownsContainer>
        <FormatDropdown />
        <SortDropdown />
      </DropdownsContainer>
    </div>
  );
}

export default Dropdowns;
