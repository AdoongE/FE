import React from 'react';
import SortDropdown from './SortDropdown';
import FormatDropdown from './FormatDropdown';
import { DropdownsContainer } from './style';

function Dropdowns({ setSortOrder, setSelectedFormat }) {
  return (
    <DropdownsContainer>
      <FormatDropdown setSelectedFormat={setSelectedFormat} />
      <SortDropdown setSortOrder={setSortOrder} />
    </DropdownsContainer>
  );
}

export default Dropdowns;
