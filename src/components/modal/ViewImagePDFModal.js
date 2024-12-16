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

const ViewImagePdfModal = ({ file, files, onClose, contentDataType }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <CustomArrow direction="left" contentDataType={contentDataType} />
    ),
    nextArrow: (
      <CustomArrow direction="right" contentDataType={contentDataType} />
    ),
  };
  console.log(contentDataType);

  const handleDownloadAll = async (files) => {
    for (const file of files) {
      try {
        const response = await fetch(file);
        if (!response.ok) {
          console.error(`Failed to fetch file: ${file}`);
          continue;
        }
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);

        const fileName = file.split('/').pop() || 'downloaded_file';
        a.download = decodeURIComponent(fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      } catch (error) {
        console.error(`Error downloading file: ${file}`, error);
      }
    }
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
          width: '1047px',
          height: '758px',
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
        <SaveButton
          top="50px"
          className="all"
          onClick={() => handleDownloadAll(files)}
        >
          모든 파일 저장
        </SaveButton>
      </ModalHeader>
      <SliderWrapper>
        <Slider {...settings}>
          {files.map((file, index) =>
            contentDataType === 'PDF' ? (
              <DocumentWrapper key={index}>
                <Documents file={file}>
                  <Page pageNumber={1} />
                </Documents>
              </DocumentWrapper>
            ) : (
              <ImageWrapper key={index}>
                <img src={file} alt={`Preview ${index + 1}`} />
              </ImageWrapper>
            ),
          )}
        </Slider>
      </SliderWrapper>
    </Modal>
  );
};

export default ViewImagePdfModal;

const CustomArrow = ({ contentDataType, direction, onClick }) => {
  return (
    <ArrowButton
      contentDataType={contentDataType}
      direction={direction}
      onClick={onClick}
    >
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
  margin-bottom: 47px;
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
  /* margin-top: 20px; */
`;

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  canvas {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Documents = styled(Document)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    width: 60%;
    height: 60%;
  }
`;

const ArrowButton = styled.div`
  position: absolute;
  top: ${({ contentDataType }) => (contentDataType === 'PDF' ? '43%' : '50%')};
  z-index: 1000;
  cursor: pointer;
  color: #9f9f9f;
  ${({ direction }) => (direction === 'left' ? `left: 10px;` : `right: 10px;`)}
`;
