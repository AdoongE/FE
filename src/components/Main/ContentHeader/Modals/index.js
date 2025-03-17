import React, { forwardRef } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
} from './style';

const Modal = forwardRef(({ title, children, onClose }, ref) => {
  return (
    <dialog ref={ref} className="modal">
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </dialog>
  );
});

export default Modal;
