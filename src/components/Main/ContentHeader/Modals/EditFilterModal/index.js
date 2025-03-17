import React, { forwardRef, useState } from 'react';
import Modal from '../index';
import { Input, SaveButton } from './style';

const EditFilterModal = forwardRef(({ title, initialFilter, onSave }, ref) => {
  const [filterName, setFilterName] = useState(initialFilter);

  return (
    <Modal ref={ref} title={title} onClose={() => ref.current.close()}>
      <Input
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <SaveButton
        onClick={() => {
          onSave(filterName);
          ref.current.close();
        }}
      >
        저장
      </SaveButton>
    </Modal>
  );
});

export default EditFilterModal;
