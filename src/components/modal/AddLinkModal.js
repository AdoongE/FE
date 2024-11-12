import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const AddLinkModal = forwardRef(({ onConfirm }, ref) => {
  const closeModal = () => {
    ref.current?.close();
  };

  const [contentLinks, setContentLinks] = useState('');

  const handleAddLink = () => {
    onConfirm(contentLinks);
    closeModal();
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
  }, []);

  return (
    <Dialog ref={ref}>
      <ModalDiv>
        <TopDiv>
          <ModalTitle>링크 업로드</ModalTitle>
          <Icon
            icon="line-md:close"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
            onClick={closeModal}
          />
        </TopDiv>

        <Input
          value={contentLinks}
          onChange={(event) => setContentLinks(event.target.value)}
          placeholder="링크를 입력하세요."
        />
        <ButtonContainer>
          <ModalButton className="no" onClick={closeModal}>
            취소
          </ModalButton>
          <ModalButton className="ok" onClick={handleAddLink}>
            확인
          </ModalButton>
        </ButtonContainer>
      </ModalDiv>
    </Dialog>
  );
});

AddLinkModal.displayName = 'AddLinkModal';

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
