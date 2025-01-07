import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

function PdfUploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(null);
  const [error, setError] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: file.name,
        label: file.name,
      }));
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        if (updatedFiles.length === newFiles.length) {
          setRepresentativeIndex(0);
        }
        return updatedFiles;
      });
      setError(false);
    },
    accept: 'application/pdf',
    maxSize: 10 * 1024 * 1024,
  });

  const handleDeleteFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);

    if (updatedFiles.length > 0 && id === files[representativeIndex]?.id) {
      setRepresentativeIndex(0);
    }
  };

  const handleSetRepresentative = (index, event) => {
    event.stopPropagation();
    setRepresentativeIndex(index);
  };

  const handleConfirm = () => {
    if (files.length === 0) {
      setError(true);
      return;
    }

    const finalRepresentativeIndex =
      representativeIndex !== null ? representativeIndex : 0;

    navigate('/content-add', {
      state: { files, representativeIndex: finalRepresentativeIndex },
    });
    onClose();
  };

  const handleScrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(0, prevIndex - 1)); // 스크롤 인덱스 감소
  };

  const handleScrollRight = () => {
    setScrollIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(0, files.length - 4)),
    ); // 스크롤 인덱스 증가, 파일 개수를 초과하지 않도록 제한
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>PDF 추가</Title>
          <Icon
            icon="line-md:close"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={onClose}
          />
        </Header>
        <Body>
          <DescriptionText>
            PDF를 업로드하고 썸네일을 지정하세요.
          </DescriptionText>
          <DescriptionNote>
            *썸네일을 기준으로 제목과 태그, 요약 내용이 자동 입력됩니다.
          </DescriptionNote>
          <DropArea {...getRootProps()} hasError={error}>
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <>
                <Icon
                  icon="material-symbols:upload-rounded"
                  style={{ width: '59px', height: '59px', color: '#4F4F4F' }}
                />
                <DropText>
                  PDF 파일 선택
                  <br />
                  혹은 여기로 파일을 끌어오세요.
                </DropText>
              </>
            ) : (
              <FilesWrapper>
                {scrollIndex > 0 && (
                  <ScrollButtonLeft onClick={handleScrollLeft}>
                    <Icon
                      icon="material-symbols:arrow-back-ios"
                      style={{ fontSize: '20px', color: '#666' }}
                    />
                  </ScrollButtonLeft>
                )}
                {files
                  .slice(scrollIndex, scrollIndex + 4)
                  .map((file, index) => (
                    <FileContainer
                      key={file.id}
                      onClick={(event) =>
                        handleSetRepresentative(scrollIndex + index, event)
                      }
                    >
                      {index + scrollIndex === representativeIndex && (
                        <RepresentativeLabel>대표</RepresentativeLabel>
                      )}
                      <FileIcon>
                        <Icon
                          icon="mdi-light:file"
                          width="50"
                          height="50"
                          style={{ color: '#9F9F9F' }}
                        />
                      </FileIcon>
                      <FileName>{file.label}</FileName>
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                      >
                        ×
                      </DeleteButton>
                    </FileContainer>
                  ))}
                {scrollIndex + 4 < files.length && (
                  <ScrollButtonRight onClick={handleScrollRight}>
                    <Icon
                      icon="material-symbols:arrow-forward-ios"
                      style={{ fontSize: '20px', color: '#666' }}
                    />
                  </ScrollButtonRight>
                )}
              </FilesWrapper>
            )}
          </DropArea>
          <FileLimit>최대 OOMB 이하의 PDF 파일만 첨부할 수 있습니다.</FileLimit>
          {error && <ErrorMessage>PDF 파일을 업로드하세요</ErrorMessage>}
        </Body>
        <Footer>
          <Button onClick={handleConfirm}>완료</Button>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default PdfUploadModal;

// 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 680px;
  height: 620px;
  padding: 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const DescriptionText = styled.p`
  color: var(--Color-4, #4f4f4f);
  font-size: 24px;
  font-style: normal;
  margin-bottom: 8px;
`;

const DescriptionNote = styled.small`
  color: var(--Color-5, #9f9f9f);
  font-size: 16px;
  font-style: normal;
  margin-bottom: 20px;
`;

const DropArea = styled.div`
  height: 240px;
  border-radius: 10px;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

const DropText = styled.div`
  color: #aaa;
  margin-top: 12px;
  font-size: 16px;
  text-align: center;
`;

const FilesWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
`;

const ScrollButton = styled.button`
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  display: flex;
  margin-top: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 1;
`;

const ScrollButtonLeft = styled(ScrollButton)`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
`;

const ScrollButtonRight = styled(ScrollButton)`
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
`;

const FileContainer = styled.div`
  width: 130px;
  height: 130px;
  position: relative;
  background-color: #eaf4f4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #47c28b;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 12px;
  font-weight: bold;
`;

const FileIcon = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 20px;
`;

const FileLimit = styled.p`
  font-size: 16px;
  color: #9f9f9f;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #ff6b6b;
  margin-top: 8px;
  margin-bottom: -30px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-top: 120px;
  background-color: #41c3ab;
  width: 99px;
  height: 54px;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 22px;
  cursor: pointer;
`;
