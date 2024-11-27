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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1000,
        },
        content: {
          position: 'relative',
          inset: 'auto',
          width: '637px',
          height: '893px',
          maxWidth: '80%',
          maxHeight: '80%',
          margin: 'auto',
          padding: '20px',
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
        },
      }}
    >
      <ModalHeader>
        <SaveButton
          top="0px"
          className="only"
          onClick={() => window.open(file, '_blank')}
        >
          이 파일만 저장
        </SaveButton>
        <SaveButton top="50px" className="all" onClick={handleSaveAllFiles}>
          모든 파일 저장
        </SaveButton>
      </ModalHeader>
      <SliderWrapper>
        <Slider {...settings}>
          {files.map((file, index) => (
            <DocumentWrapper key={index}>
              <Document file={file}>
                <Page pageNumber={1} />
              </Document>
            </DocumentWrapper>
          ))}
        </Slider>
      </SliderWrapper>
    </Modal>
  );
};

export default ViewImagePdfModal;

const CustomArrow = ({ direction, onClick }) => {
  return (
    <ArrowButton direction={direction} onClick={onClick}>
      {direction === 'left' ? (
        <FaChevronLeft size={40} />
      ) : (
        <FaChevronRight size={40} />
      )}
    </ArrowButton>
  );
};

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 112px;
  gap: 10px;
`;

const SaveButton = styled.button`
  position: absolute;
  top: ${({ top }) => top || '10px'};
  right: 0px;
  border: none;
  width: 170.92px;
  height: 39px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
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

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 645px;
  width: 600px;

  canvas {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; // 할, 말??
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  z-index: 1000;
  cursor: pointer;
  color: #9f9f9f;
  ${({ direction }) => (direction === 'left' ? `left: 10px;` : `right: 10px;`)}
`;
