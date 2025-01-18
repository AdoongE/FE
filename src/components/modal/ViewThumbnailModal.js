import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// const pdfVersion = '2.6.347';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from './pdf.worker.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ViewThumbnailModal = ({ file, onClose, contentDataType }) => {
  console.log('ViewThumbnailModal file:', contentDataType);
  // const fileObject = useMemo(
  //   () => ({
  //     url: file,
  //     withCredentials: true,
  //   }),
  //   [file],
  // );
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
          width: '54.53vw',
          height: '39.48vw',
          maxWidth: '80%',
          maxHeight: '80%',
          margin: 'auto',
          padding: '1.04vw',
          background: '#fff',
          borderRadius: '1.04vw',
          overflow: 'hidden',
        },
      }}
    >
      {contentDataType === 'PDF' ? (
        // <DocumentWrapper>
        //   <Document
        //     file={file}
        //     // options={{
        //     //   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
        //     //   cMapPacked: true,
        //     // }}
        //     onLoadError={(error) => console.error('PDF Load Error:', error)}
        //     onSourceError={(error) => console.error('PDF Source Error:', error)}
        //   >
        //     <Page pageNumber={1} />
        //   </Document>
        // </DocumentWrapper>
        <Icon
          icon="iconamoon:file-thin"
          width="24vw"
          height="24vw"
          color="#aaa"
        />
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
    margin: auto;
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
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    width: 60%;
    height: 60%;
  }
`;
