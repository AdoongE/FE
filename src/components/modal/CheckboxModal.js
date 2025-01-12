import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import checkIcon from '../../assets/icons/Check.png';
import AddLinkModal from './AddLinkModal';
import ImageUploadModal from './ImageUploadModal';
import PdfUploadModal from './PdfUploadModal';

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
  width: 30.208vw; /* 580px */
  height: 14.583vw; /* 280px */
  border-radius: 2.604vw; /* 50px */
  background: #fff;
  border: 0;
  padding: 2.083vw 2.604vw; /* 40px 50px */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const Button = styled.button`
  border-radius: 2.604vw; /* 50px */
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 0.729vw 1.563vw; /* 14px 30px */
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  width: 5.156vw; /* 99px */
  height: 2.813vw; /* 54px */
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 700;
  font-family: 'Pretendard-Regular';
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.229vw; /* 62px */
`;

const Title = styled.div`
  color: #4f4f4f;
  font-family: 'Pretendard Variable';
  font-size: 1.25vw; /* 24px */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1.094vw; /* 21px */
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 2.083vw; /* 40px */
  margin-bottom: 2.292vw; /* 44px */
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625vw; /* 12px */

  span {
    font-size: 1.25vw; /* 24px */
    color: #4f4f4f;
  }
`;

const TypeBox = styled.input`
  width: 1.458vw; /* 28px */
  height: 1.458vw; /* 28px */
  cursor: pointer;
  appearance: none;
  border: 0.052vw solid #9f9f9f; /* 1px */
  border-radius: 0.26vw; /* 5px */

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
