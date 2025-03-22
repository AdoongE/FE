import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import checkIcon from '../../assets/icons/Check.png';
import AddLinkModal from './AddLinkModal';
import ImageUploadModal from './ImageUploadModal';
import PdfUploadModal from './PdfUploadModal';
import { font } from '../../styles/font';

const CheckboxModal = forwardRef((_, ref) => {
  const [dataType, setDataType] = useState(null);
  //   const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState({
    LINK: false,
    IMAGE: false,
    PDF: false,
  });

  const closeModal = () => {
    ref.current?.close();
    setDataType(null);
  };

  const handleCheckboxChange = (event) => {
    setDataType(event.target.name);
  };

  const handleChangeModal = () => {
    if (dataType) {
      closeModal();
      setTimeout(() => {
        setIsModalOpen((prev) => ({
          ...prev,
          [dataType]: true,
        }));
      }, 200);
    }
  };

  const closeNextModal = (type) => {
    setIsModalOpen((prev) => ({
      ...prev,
      [type]: false,
    }));
    setDataType(null);
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
            style={{ width: '1.875vw', height: '1.875vw', cursor: 'pointer' }}
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
      {isModalOpen.LINK && (
        <AddLinkModal onClose={() => closeNextModal('LINK')} />
      )}
      {isModalOpen.IMAGE && (
        <ImageUploadModal onClose={() => closeNextModal('IMAGE')} />
      )}
      {isModalOpen.PDF && (
        <PdfUploadModal onClose={() => closeNextModal('PDF')} />
      )}
    </>
  );
});

CheckboxModal.displayName = 'CheckboxModal';

const Dialog = styled.dialog`
  width: 542px;
  border-radius: 36px;
  background: #fff;
  border: 0;
  padding: 30px 50px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const Button = styled.button`
  ${font.title3}
  border-radius: 40px;
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.div`
  color: #4f4f4f;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 24px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 40px;
  margin-bottom: 52px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    font-size: 20px;
    color: #4f4f4f;
  }
`;

const TypeBox = styled.input`
  width: 20px;
  height: 20px;
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
