import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const ViewImagePdfModal = ({ file, files, onClose }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
  };

  const handleSaveAllFiles = () => {
    files.forEach((file) => {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop();
      link.click();
    });
  };

  return (
    <Modal
      isOpen={!!file}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'relative',
          inset: 'auto',
          width: '70%',
          maxWidth: '800px',
          maxHeight: '80%',
          margin: 'auto',
          padding: '20px',
          background: '#fff',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <ModalHeader>
        <SaveButton
          className="only"
          onClick={() => window.open(file, '_blank')}
        >
          이 파일만 저장
        </SaveButton>
        <SaveButton className="all" onClick={handleSaveAllFiles}>
          모든 파일 저장
        </SaveButton>
      </ModalHeader>
      <SliderWrapper>
        <CustomSlider {...settings}>
          {files.map((file) => (
            <Slide key={file}>
              <Document file={file}>
                <Page pageNumber={1} width={600} />
              </Document>
            </Slide>
          ))}
        </CustomSlider>
      </SliderWrapper>
    </Modal>
  );
};

export default ViewImagePdfModal;

// 사용자 정의 화살표 컴포넌트
const CustomArrow = ({ direction, onClick }) => {
  return (
    <ArrowButton direction={direction} onClick={onClick}>
      {direction === 'left' ? (
        <FaChevronLeft size={20} />
      ) : (
        <FaChevronRight size={20} />
      )}
    </ArrowButton>
  );
};

// 스타일 정의
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
`;

const SaveButton = styled.button`
  border: none;
  width: 170.92px;
  height: 39px;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
  &.only {
    color: #9f9f9f;
    background-color: #dcdada;
  }
  &.all {
    color: white;
    background-color: #41c3ab;
  }
`;

const SliderWrapper = styled.div`
  margin-top: 20px;
`;

const CustomSlider = styled(Slider)`
  .slick-list {
    padding: 0 50px; // 화살표가 PDF에 겹치지 않도록 여백 추가
  }
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ direction }) => (direction === 'left' ? `left: 10px;` : `right: 10px;`)}

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
