import React, { useRef, useEffect } from 'react';
import SortDropdown from './SortDropdown';
import FormatDropdown from './FormatDropdown';
import { DropdownsContainer } from './style';
import useDropdownStore from '../../../../store/useDropdownStore';

function Dropdowns() {
  const { resetDropdowns } = useDropdownStore();
  const dropdownRef = useRef(null);

  // ✅ 컴포넌트 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        resetDropdowns(); // ✅ 드롭다운 외부 클릭 시 기본값으로 변경
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
