import React, { forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  column-gap: 1.042vw; /* 20px */
  margin-top: 3vw;
  justify-content: center;
`;

const No = styled.button`
  width: 6.771vw; /* 130px */
  height: 2.813vw; /* 54px */
  background-color: #f2f2f2;
  border-radius: 0.521vw; /* 10px */
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4f4f4f;
  border: 0;
`;

const Yes = styled.button`
  color: white;
  width: 6.771vw; /* 130px */
  height: 2.813vw; /* 54px */
  background-color: #41c3ab;
  border-radius: 0.521vw; /* 10px */
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
`;

const Alert = styled.div`
  font-weight: 600;
  font-size: 1.875vw; /* 36px */
  text-align: center;
  margin-top: 5vw;
`;

const Dialog = styled.dialog`
  position: relative;
  width: 30vw;
  height: 15vw; /* 350px */
  border-radius: 2.604vw; /* 50px */
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default ContentSaveModal;
