import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const MAX_FILES = 3;

const PdfUploadComponent = ({ onSetRepresentative }) => {
  const [files, setFiles] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 파일 인덱스

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: file.name,
      label: file.name,
      type: file.type,
    }));

    if (files.length + newFiles.length <= MAX_FILES) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // 첫 번째 파일을 대표로 설정
      if (files.length === 0) {
        setRepresentativeIndex(0);
        if (onSetRepresentative) {
          onSetRepresentative(0); // 대표 파일 인덱스 전달
        }
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    maxSize: 10 * 1024 * 1024, // 10 MB 제한
  });

  const handleDeleteFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);

    if (representativeIndex >= updatedFiles.length) {
      setRepresentativeIndex(0); // 파일이 삭제될 경우, 첫 파일로 대표 설정
      if (onSetRepresentative) {
        onSetRepresentative(0); // 대표 파일이 없으면 첫 파일로 재설정
      }
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index);
    if (onSetRepresentative) {
      onSetRepresentative(index); // 선택된 대표 파일 인덱스 전달
    }
  };

  return (
    <>
      <Instructions>
        PDF 파일 업로드*{' '}
        <span>최대 10MB 이하의 PDF 파일만 첨부할 수 있습니다.</span>
      </Instructions>
      <FilesWrapper>
        {files.map((file, index) => (
          <FileContainer key={file.id}>
            <FileBox onClick={() => handleSetRepresentative(index)}>
              {index === representativeIndex && (
                <RepresentativeLabel>대표</RepresentativeLabel>
              )}
              <FileIcon>
                <Icon
                  icon="file-icons:pdf"
                  width="40"
                  height="40"
                  style={{ color: '#4CAF50' }}
                />
              </FileIcon>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 버블링 방지
                  handleDeleteFile(file.id);
                }}
              >
                ×
              </DeleteButton>
            </FileBox>
            <FileName>{file.label}</FileName>
          </FileContainer>
        ))}
        {files.length < MAX_FILES && (
          <AddFileBox {...getRootProps()}>
            <input {...getInputProps()} />
            <AddCircle>
              <Icon
                icon="iconoir:plus"
                width="35"
                height="35"
                style={{ color: '#aaa' }}
              />
            </AddCircle>
            <AddText>PDF 추가하기</AddText>
          </AddFileBox>
        )}
      </FilesWrapper>
    </>
  );
};

export default PdfUploadComponent;

// 스타일 컴포넌트
const Instructions = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 15px;

  span {
    font-size: 18px;
    color: #999;
    font-weight: normal;
  }
`;

const FilesWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileBox = styled.div`
  width: 159px;
  height: 177px;
  position: relative;
  background-color: #eaf4f4;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
`;

const FileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4caf50;
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

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  width: 140px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddFileBox = styled.div`
  width: 159px;
  height: 177px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
`;

const AddCircle = styled.div`
  width: 76px;
  height: 76px;
  border: 1px dashed #aaa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AddText = styled.div`
  color: #aaa;
  font-size: 12px;
`;
