import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const ViewThumbnailModal = ({ file, onClose, seedType }) => {
  return (
    <ModalDiv
      ariaHideApp={false}
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
      {seedType === 'PDF' ? (
        <DocumentWrapper>
          <Document file={file} loading={<div>Loading PDF...</div>}>
            <Page pageNumber={1} />
          </Document>
        </DocumentWrapper>
      ) : (
        <ImageWrapper>
          <img src={file} alt="Preview" />
        </ImageWrapper>
      )}
    </ModalDiv>
  );
};

export default ViewThumbnailModal;

const ModalDiv = styled(Modal)`
  background-color: #fff;
  position: relative;
  width: 800px;
  height: 580px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  canvas {
    margin: auto;
    max-width: 800px;
    max-height: 580px;
    object-fit: contain;
  }
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
    width: 80%;
    height: 80%;
  }
`;
