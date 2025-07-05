import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Alert from '@mui/material/Alert';
import { font } from '../../styles/font';

const AddLinkModal = forwardRef(({ onConfirm }, ref) => {
  const closeModal = () => {
    ref.current?.close();
  };

  const dialogRef = useRef(null);
  const showLinkModal = () => {
    dialogRef.current?.showModal();
  };

  const [seedLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const closeLinkModal = () => {
    ref.current?.close();
    setContentLinks('');
  };

  const handleAddLink = () => {
    if (seedLinks === '') {
      setErrorMessage('URL을 입력해주세요.');
      return;
    }

    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/i;
    const isValid = regex.test(seedLinks);

    if (!isValid) {
      setErrorMessage('유효하지 않은 링크입니다.');
    } else {
      onConfirm(seedLinks);
      setErrorMessage('');
      closeModal();
      setContentLinks('');
    }
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
          setContentLinks('');
        }
      };
      dialogElement.addEventListener('click', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      showLinkModal();
      const timer = setTimeout(() => {
        dialogRef.current?.close();
        setErrorMessage('');
      }, 1200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <Dialog ref={ref}>
      <ModalDiv>
        <TopDiv>
          <ModalTitle>링크 업로드</ModalTitle>
          <Icons icon="line-md:close" onClick={closeLinkModal} />
        </TopDiv>

        <Input
          value={seedLinks}
          onChange={(event) => setContentLinks(event.target.value)}
          placeholder="링크를 입력하세요."
        />
        <ButtonContainer>
          <ModalButton type="button" className="no" onClick={closeLinkModal}>
            취소
          </ModalButton>
          <ModalButton type="button" className="ok" onClick={handleAddLink}>
            확인
          </ModalButton>
          {errorMessage && showLinkModal()}
        </ButtonContainer>
      </ModalDiv>
      <ErrorDialog ref={dialogRef}>
        <Alert
          severity="info"
          sx={{
            bgcolor: '#F2F2F2',
            mt: '0.104vw', // 2px
            width: '15.625vw', // 300px
            display: 'flex',
            fontSize: '0.781vw', // 15px
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {errorMessage}
        </Alert>
      </ErrorDialog>
    </Dialog>
  );
});

AddLinkModal.displayName = 'AddLinkModal';

const ErrorDialog = styled.dialog`
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: 500;
  color: var(--gray2);
  background-color: var(--gray6);
  display: flex;
  border: none;
  border-bottom: 0.73px solid var(--gray2);
  width: 100%;
  padding: 12px 0;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ModalButton = styled.button`
  ${font.title3}
  border: none;
  border-radius: 36px;
  padding: 10px 20px;
  cursor: pointer;
  &.ok {
    background-color: var(--green2);
    color: white;
  }
  &.no {
    background-color: var(--gray4);
    color: black;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &.remove {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
`;

const Icons = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  &.edit {
    margin-bottom: 56px;
  }
`;

const Dialog = styled.dialog`
  position: relative;
  width: 542px;
  border-radius: 36px;
  background-color: white;
  border: none;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const ModalDiv = styled.div`
  padding: 0 36px;
  padding-top: 40px;
  padding-bottom: 25px;
`;

export default AddLinkModal;
