import React, { forwardRef, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import checkIcon from '../../assets/icons/Check.png';
import AddLinkModal from './AddLinkModal';
import ImageUploadModal from './ImageUploadModal';
import PdfUploadModal from './PdfUploadModal';

const CheckboxModal = forwardRef((_, ref) => {
  const [dataType, setDataType] = useState(null);

  const linkDialogRef = useRef(null);
  const imageDialogRef = useRef(null);
  const pdfDialogRef = useRef(null);
  //   const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    ref.current?.close();
    setDataType(null);
  };

  const handleCheckboxChange = (event) => {
    const option = event.target.name;
    setDataType(option);
  };

  useEffect(() => {
    console.log('dataType: ', dataType);
  }, [dataType]);

  const handleChangeModal = () => {
    if (dataType) {
      closeModal(); // 체크박스 모달 닫기
      setTimeout(() => {
        // 데이터 타입에 따라 선택한 모달 열기
        if (dataType === 'LINK') {
          linkDialogRef.current?.showModal();
        } else if (dataType === 'IMAGE') {
          imageDialogRef.current?.showModal();
        } else if (dataType === 'PDF') {
          pdfDialogRef.current?.showModal();
        }
      }, 200);
    }
  };

  const closeNextModal = (ref) => {
    ref.current?.close(); // 현재 열려 있는 모달 닫기
    setDataType(null); // 상태 초기화
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

      dialogElement.addEventListener('mousedown', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [ref]);

  return (
    <>
      <Dialog ref={ref}>
        <TopDiv>
          <ModalTitle>씨드 추가</ModalTitle>
          <Icon
            icon="line-md:close"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
            onClick={() => closeModal()}
          />
        </TopDiv>
        <Title>저장 형식을 선택하세요.</Title>
        <Group>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="LINK"
              checked={dataType === 'LINK'}
              onChange={handleCheckboxChange}
            />
            <span>링크</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="IMAGE"
              checked={dataType === 'IMAGE'}
              onChange={handleCheckboxChange}
            />
            <span>이미지</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="PDF"
              checked={dataType === 'PDF'}
              onChange={handleCheckboxChange}
            />
            <span>PDF</span>
          </CheckboxLabel>
        </Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleChangeModal}>다음</Button>
        </div>
      </Dialog>
      <AddLinkModal
        ref={linkDialogRef}
        onClose={() => closeNextModal(linkDialogRef)}
      />
      <ImageUploadModal
        ref={imageDialogRef}
        onClose={() => closeNextModal(imageDialogRef)}
      />
      <PdfUploadModal
        ref={pdfDialogRef}
        onClose={() => closeNextModal(pdfDialogRef)}
      />
    </>
  );
});

CheckboxModal.displayName = 'CheckboxModal';

const Dialog = styled.dialog`
  width: 580px;
  height: 280px;
  border-radius: 50px;
  background: #fff;
  border: 0;
  padding: 40px 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const Button = styled.button`
  border-radius: 50px;
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 22px;
  font-weight: 500;
  width: 99px;
  height: 54px;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  font-family: 'Pretendard-Regular';
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;

const Title = styled.div`
  color: #4f4f4f;
  font-family: 'Pretendard Variable';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 21px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 40px;
  margin-bottom: 44px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-size: 24px;
    color: #4f4f4f;
  }
`;

const TypeBox = styled.input`
  width: 28px;
  height: 28px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #9f9f9f;
  border-radius: 5px;

  &:checked {
    background-color: #41c3ab;
    border: none;
    background-image: url(${checkIcon});
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default CheckboxModal;
