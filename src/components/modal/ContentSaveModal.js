import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';

const ContentSaveModal = forwardRef(({ onConfirm }, ref) => {
  const cloesModal = () => {
    ref.current?.close();
  };

  const handleSave = () => {
    onConfirm();
    cloesModal();
  };

  useEffect(() => {
    if (ref.current) {
      const dialogElement = ref.current;

      const handleClickOutside = (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      };
      dialogElement.addEventListener('click', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, [ref]);

  return (
    <Dialog ref={ref}>
      <Alert>저장하시겠습니까?</Alert>
      <Buttons>
        <No onClick={cloesModal}>아니오</No>
        <Yes onClick={handleSave}>네</Yes>
      </Buttons>
    </Dialog>
  );
});

ContentSaveModal.displayName = 'ContentSaveModal';

const Buttons = styled.div`
  display: flex;
  column-gap: 20px;
  position: absolute;
  top: 232px;
  left: 179px;
`;

const No = styled.button`
  width: 130px;
  height: 54px;
  background-color: #f2f2f2;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4f4f4f;
  border: 0;
`;

const Yes = styled.button`
  color: white;
  width: 130px;
  height: 54px;
  background-color: #41c3ab;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
`;

const Alert = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 36px;
  text-align: center;
  top: 122px;
  left: 185px;
`;

const Dialog = styled.dialog`
  position: relative;
  width: 637px;
  height: 350px;
  border-radius: 50px;
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default ContentSaveModal;
