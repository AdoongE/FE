import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Document, Page } from 'react-pdf';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ViewImagePdfModal = ({ file, files, onClose, seedType }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow direction="left" seedType={seedType} />,
    nextArrow: <CustomArrow direction="right" seedType={seedType} />,
  };
  console.log(seedType);

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
    <ModalDiv
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
      }}
    >
      <ModalHeader>
        <SaveButton
          className="only"
          onClick={() => window.open(file, '_blank')}
        >
          이 파일만 저장
        </SaveButton>
        <SaveButton className="all" onClick={() => handleDownloadAll(files)}>
          모든 파일 저장
        </SaveButton>
      </ModalHeader>
      <SliderWrapper>
        <Slider {...settings}>
          {files.map((file, index) =>
            seedType === 'PDF' ? (
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
    </ModalDiv>
  );
};

export default ViewImagePdfModal;

const CustomArrow = ({ seedType, direction, onClick }) => {
  return (
    <ArrowButton seedType={seedType} direction={direction} onClick={onClick}>
      {direction === 'left' ? (
        <IoIosArrowBack size={'50px'} />
      ) : (
        <IoIosArrowForward size={'50px'} />
      )}
    </ArrowButton>
  );
};

const ModalDiv = styled(Modal)`
  background-color: #fff;
  position: relative;
  inset: auto;
  margin: auto;
  width: 800px;
  height: 580px;
  padding: 16px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const SaveButton = styled.button`
  border: none;
  padding: 8px 30px;
  border-radius: 6px;
  font-size: 12px;
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
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;

  canvas {
    margin: auto;
    max-width: 800px;
    max-height: 470px;
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
  top: ${({ seedType }) => (seedType === 'PDF' ? '43%' : '40%')};
  z-index: 1000;
  cursor: pointer;
  color: #9f9f9f;
  ${({ direction }) => (direction === 'left' ? `left: 0;` : `right: 0;`)}
`;
