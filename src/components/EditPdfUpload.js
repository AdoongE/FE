import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { axiosInstance } from './api/axios-instance';

const MAX_FILES = 3;

const EditPdfUpload = ({ onSetRepresentative, setFiles, Id }) => {
  const [blobImage, setBlobUrls] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 파일 인덱스
  const [contentInfo, setContentInfo] = useState({
    filename: [],
    contentDoc: [],
  });

  useEffect(() => {
    const fetchContentInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/content/all/${Id}`);
        const results = response.data.results[0];
        console.log('결과', results);

        setContentInfo({
          filename: results.title,
          contentDoc: results.contentDoc,
        });

        if (response.status === 200) {
          console.log('콘텐츠 상세 조회 성공');
        } else {
          console.error('콘텐츠 상세 조회 실패');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchContentInfo();
  }, []);

  async function s3pdf2blob(images) {
    try {
      const blobUrls = await Promise.all(
        images.map(async (imageUrl, index) => {
          const response = await axios.get(imageUrl, {
            responseType: 'blob',
            withCredentials: true,
            headers: {
              'Cache-Control': 'no-cache',
            },
          });
          const blob = response.data;
          return {
            id: contentInfo.filename[index],
            preview: URL.createObjectURL(blob),
          };
        }),
      );
      return blobUrls;
    } catch (error) {
      console.error('이미지를 Blob URL로 변환하는 데 실패했습니다:', error);
      return [];
    }
  }
  useEffect(() => {
    async function fetchBlob() {
      console.log('pdf 배열:', contentInfo.contentDoc);
      const blob = await s3pdf2blob(contentInfo.contentDoc);
      const formattedImages = contentInfo.contentDoc.map((image, index) => ({
        id: contentInfo.filename[index],
        label: contentInfo.filename[index],
        preview: blob[index]?.preview || image.preview,
      }));
      setFiles(formattedImages);
      setBlobUrls(formattedImages);
    }
    fetchBlob();
  }, [contentInfo.contentDoc]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return {
        id: file.name,
        label: file.name,
        preview,
      };
    });

    if (blobImage.length + newFiles.length <= MAX_FILES) {
      const updatedFiles = [...blobImage, ...newFiles];
      setBlobUrls(updatedFiles);
      setFiles(updatedFiles);

      // 첫 번째 파일을 대표로 설정
      if (blobImage.length === 0) {
        setRepresentativeIndex(0);
        if (onSetRepresentative) {
          onSetRepresentative(0);
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
    const updatedBlobImages = blobImage.filter((file) => file.id !== id);
    const updatedImages = contentInfo.contentDoc.filter(
      (image) => image.id !== id,
    );
    setBlobUrls(updatedBlobImages);
    setFiles(updatedBlobImages);

    if (representativeIndex >= updatedImages.length) {
      setRepresentativeIndex(0);
      if (onSetRepresentative) {
        onSetRepresentative(0);
      }
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index);
    if (onSetRepresentative) {
      onSetRepresentative(index);
    }
  };

  return (
    <Wrapper>
      <Instructions>
        PDF 파일 업로드*{' '}
        <span>최대 10MB 이하의 PDF 파일만 첨부할 수 있습니다.</span>
      </Instructions>
      {blobImage.length === 0 ? (
        <DropArea {...getRootProps()}>
          <input {...getInputProps()} />
          <IconWrapper>
            <Icon
              icon="iconoir:upload"
              width="40"
              height="40"
              style={{ color: '#aaa' }}
            />
          </IconWrapper>
          <DropText>PDF 파일 선택 혹은 여기로 파일을 끌어오세요.</DropText>
        </DropArea>
      ) : (
        <FilesWrapper>
          {blobImage.map((file, index) => (
            <FileContainer key={file.id}>
              <FileBox onClick={() => handleSetRepresentative(index)}>
                {index === representativeIndex && (
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
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.id);
                  }}
                >
                  ×
                </DeleteButton>
              </FileBox>
              <FileName>{file.label}</FileName>
            </FileContainer>
          ))}
          {blobImage.length < MAX_FILES && (
            <AddFileBox {...getRootProps()}>
              <input {...getInputProps()} />
              <AddCircle>
                <Icon
                  icon="mdi-light:file"
                  width="50"
                  height="50"
                  style={{ color: '#9F9F9F' }}
                />
              </AddCircle>
              <AddText>PDF 추가하기</AddText>
            </AddFileBox>
          )}
        </FilesWrapper>
      )}
    </Wrapper>
  );
};

export default EditPdfUpload;

// 스타일 컴포넌트
const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Instructions = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 16px;

  span {
    font-size: 18px;
    color: #999;
    font-weight: normal;
  }
`;

const DropArea = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 200px;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
`;

const DropText = styled.div`
  color: #aaa;
  font-size: 16px;
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
  flex-direction: column;
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
  color: #4caf50;
  font-size: 50px; /* 아이콘 크기 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
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
