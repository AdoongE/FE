import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Alert from '@mui/material/Alert';

const AddLinkModal = forwardRef(({ onConfirm }, ref) => {
  const closeModal = () => {
    ref.current?.close();
  };

  const dialogRef = useRef(null);
  const showLinkModal = () => {
    dialogRef.current?.showModal();
  };

  const [contentLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const closeLinkModal = () => {
    ref.current?.close();
    setContentLinks('');
  };

  const handleAddLink = () => {
    if (contentLinks === '') {
      setErrorMessage('URL을 입력해주세요.');
      return;
    }

    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/i;
    const isValid = regex.test(contentLinks);

    if (!isValid) {
      setErrorMessage('유효하지 않은 링크입니다.');
    } else {
      onConfirm(contentLinks);
      setErrorMessage('');
      closeModal();
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
          <Icon
            icon="line-md:close"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
            onClick={closeLinkModal}
          />
        </TopDiv>

        <Input
          value={contentLinks}
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
            mt: 2,
            width: '300px',
            display: 'flex',
            fontSize: '15px',
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
  background-color: #f6f6f6;
  border: 0;
  border-bottom: 1px solid #7f7f7f;
  width: 814px;
  height: 68px;
  margin-top: 48px;
  margin-bottom: 47px;
  font-size: 30px;
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 44px;
`;

const ModalButton = styled.button`
  height: 54px;
  width: 99px;
  padding: 14px 30px;
  font-size: 22px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 10px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const Dialog = styled.dialog`
  position: relative;
  width: 972px;
  height: 365px;
  border-radius: 50px;
  background-color: white;
  border: none;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const ModalDiv = styled.div`
  margin: 50px;
`;

export default AddLinkModal;
