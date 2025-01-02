import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const ViewThumbnailModal = ({ file, onClose, contentDataType }) => {
  console.log('ViewThumbnailModal file:', contentDataType);

  return (
    <Modal
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
      {contentDataType === 'PDF' ? (
        <DocumentWrapper>
          <Document file={file}>
            <Page pageNumber={1} />
          </Document>
        </DocumentWrapper>
      ) : (
        <ImageWrapper>
          <img src={file} alt="Preview" />
        </ImageWrapper>
      )}
    </Modal>
  );
};

export default ViewThumbnailModal;

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  canvas {
    max-width: 100%;
    max-height: 100%;
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
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    width: 593px;
    height: 645px;
  }
`;
