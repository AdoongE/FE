import SelectTag from 'components/common/Modal/SelectTag';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Button, Dialog, Line } from './style';
import useTagStore from 'context/tagStore';

const AddTagModal = forwardRef(({ onConfirm, originalTags }, ref) => {
  const { selectedTags, setSelectedTags } = useTagStore();
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(), // 모달 열기
    close: () => {
      setSelectedTags([]); // 선택한 태그 초기화
      dialogRef.current?.close(); // 모달 닫기
    },
  }));

  const handleClose = () => {
    setSelectedTags([]);
    dialogRef.current?.close();
  };

  const handleApply = () => {
    onConfirm([
      ...originalTags,
      ...selectedTags.filter((tag) => !originalTags.includes(tag)),
    ]);
    dialogRef.current?.close();
    console.log('모달 tag: ', selectedTags);
  };

  return (
    <Dialog ref={dialogRef}>
      <SelectTag
        title="검색태그"
        originalTags={originalTags}
        handleClose={handleClose}
      />
      <Line />
      <Button type="button" onClick={handleApply}>
        선택완료
      </Button>
    </Dialog>
  );
});

AddTagModal.displayName = 'AddTagModal';
export default AddTagModal;
