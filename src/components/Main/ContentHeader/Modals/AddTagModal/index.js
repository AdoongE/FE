import React, { forwardRef } from 'react';
import Modal from '../index';
import { TagContainer, Tag, ConfirmButton } from './style';

const AddTagModal = forwardRef(({ title, onConfirm, tags = [] }, ref) => {
  return (
    <Modal ref={ref} title={title} onClose={() => ref.current.close()}>
      <TagContainer>
        {(tags || []).map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <ConfirmButton onClick={() => ref.current.close()}>확인</ConfirmButton>
    </Modal>
  );
});

export default AddTagModal;
