import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../api/axios-instance';

const ContentDeleteModal = forwardRef(({ contentId, fetchData }, ref) => {
  const cloesModal = () => {
    ref.current?.close();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    console.log('콘텐츠 삭제 id: ', contentId);
    try {
      const response = await axiosInstance.delete(
        `/api/v1/content/${contentId}`,
      );

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
      <Alert>정말 삭제하시겠습니까?</Alert>
      <Buttons>
        <No onClick={cloesModal}>아니오</No>
        <Yes onClick={handleDelete}>네</Yes>
      </Buttons>
    </Dialog>
  );
});

ContentDeleteModal.displayName = 'ContentDeleteModal';

const Buttons = styled.div`
  display: flex;
  column-gap: 1.042vw; /* 20px */
  position: absolute;
  top: 12.083vw; /* 232px */
  left: 9.323vw; /* 179px */
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
  position: absolute;
  font-weight: 600;
  font-size: 1.875vw; /* 36px */
  text-align: center;
  top: 6.354vw; /* 122px */
  left: 7.813vw; /* 150px */
`;

const Dialog = styled.dialog`
  position: relative;
  width: 33.177vw; /* 637px */
  height: 18.229vw; /* 350px */
  border-radius: 2.604vw; /* 50px */
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default ContentDeleteModal;
