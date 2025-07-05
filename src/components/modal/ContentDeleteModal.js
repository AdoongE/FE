import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../api/axios-instance';
import { font } from '../../styles/font';

const ContentDeleteModal = forwardRef(({ contentId, fetchData }, ref) => {
  const cloesModal = () => {
    ref.current?.close();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    console.log('콘텐츠 삭제 id: ', contentId);
    try {
      const response = await axiosInstance.delete(`/api/v1/seed/${contentId}`);

      console.log('삭제 성공: ', response?.data.results);
      cloesModal();
      fetchData();
    } catch (error) {
      console.error(error);
      throw error;
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
      <ModalDiv>
        <Alert>정말 삭제하시겠습니까?</Alert>
        <Buttons>
          <No onClick={cloesModal}>취소</No>
          <Yes onClick={handleDelete}>삭제</Yes>
        </Buttons>
      </ModalDiv>
    </Dialog>
  );
});

ContentDeleteModal.displayName = 'ContentDeleteModal';

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const No = styled.button`
  ${font.title3}
  border: none;
  border-radius: 36px;
  background-color: var(--gray4);
  color: black;
  border-radius: 8px;
  padding: 10.5px 32px;
`;

const Yes = styled.button`
  ${font.title3}
  border: none;
  border-radius: 36px;
  background-color: var(--green2);
  color: white;
  border-radius: 8px;
  padding: 10.5px 32px;
`;

const Alert = styled.div`
  ${font.title0}
  text-align: center;
  margin-top: 82px;
  margin-bottom: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dialog = styled.dialog`
  width: 542px;
  height: 254px;
  border-radius: 36px;
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
  padding: 0;
`;

const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ContentDeleteModal;
