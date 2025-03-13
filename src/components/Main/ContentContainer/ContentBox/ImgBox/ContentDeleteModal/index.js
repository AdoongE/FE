import React, { forwardRef } from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import ModalOutClick from 'util/ModalOutClick';
import { Alert, Buttons, Dialog, No, Yes } from './style';

const ContentDeleteModal = forwardRef(({ contentId, fetchData }, ref) => {
  const closeModal = () => {
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
      closeModal();
      fetchData();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  ModalOutClick(ref, closeModal);

  return (
    <Dialog ref={ref}>
      <Alert>정말 삭제하시겠습니까?</Alert>
      <Buttons>
        <No onClick={closeModal}>아니오</No>
        <Yes onClick={handleDelete}>네</Yes>
      </Buttons>
    </Dialog>
  );
});

ContentDeleteModal.displayName = 'ContentDeleteModal';

export default ContentDeleteModal;
