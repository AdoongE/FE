import React, { forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { font } from '../../styles/font';

const ContentSaveModal = forwardRef(({ onConfirm }, ref) => {
  const navigate = useNavigate();
  const cloesModal = () => {
    ref.current?.close();
  };

  const handleSave = () => {
    onConfirm();
    cloesModal();
    navigate('/main');
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
        <No type="button" onClick={cloesModal}>
          아니오
        </No>
        <Yes type="submit" onClick={handleSave}>
          네
        </Yes>
      </Buttons>
    </Dialog>
  );
});

ContentSaveModal.displayName = 'ContentSaveModal';

const Buttons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 48px;
  justify-content: center;
`;

const No = styled.button`
  background-color: var(--gray4);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray1);
  border: 0;
  padding: 10.5px 25px;
  ${font.title3}
`;

const Yes = styled.button`
  color: white;
  background-color: var(--green2);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 10.5px 39px;
  ${font.title3}
`;

const Alert = styled.div`
  ${font.title0}
  text-align: center;
`;

const Dialog = styled.dialog`
  padding: 0px 152px;
  padding-top: 88px;
  padding-bottom: 45px;
  border-radius: 36px;
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default ContentSaveModal;
