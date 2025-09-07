import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { axiosInstance } from './api/axios-instance';
import { font } from '../styles/font';

const MAX_IMAGES = 5;

const EditImageUploadComponent = ({ onSetRepresentative, setImages, Id }) => {
  const [blobImage, setBlobUrls] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 이미지 인덱스
  const [contentInfo, setContentInfo] = useState({
    filename: [],
    contentImage: [],
  });

  useEffect(() => {
    const fetchContentInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/seed/${Id}`);
        const results = response.data.results[0];

        setContentInfo({
          filename: results.titles,
          contentImage: results.fileLinks,
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

  async function s3image2blob(images) {
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
      console.log('이미지 배열:', contentInfo.contentImage);
      const blob = await s3image2blob(contentInfo.contentImage);
      const formattedImages = contentInfo.contentImage.map((image, index) => ({
        id: contentInfo.filename[index],
        label: contentInfo.filename[index],
        preview: blob[index]?.preview || image.preview,
      }));
      setImages(formattedImages);
      setBlobUrls(formattedImages);
    }
    fetchBlob();
  }, [contentInfo.contentImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: file.name,
        label: file.name,
        preview: URL.createObjectURL(file),
      }));

      if (blobImage.length + newImages.length <= MAX_IMAGES) {
        const updatedImages = [...blobImage, ...newImages];
        setBlobUrls(updatedImages);
        setImages(updatedImages);

        // 첫 이미지 업로드 시 자동으로 대표 이미지 설정
        if (blobImage.length === 0) {
          setRepresentativeIndex(0);
          onSetRepresentative(0);
        }
      }
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': [],
    },
    maxSize: 10 * 1024 * 1024, // 10 MB 제한
  });

  const handleDeleteImage = (id) => {
    const updatedBlobImages = blobImage.filter((image) => image.id !== id);
    setBlobUrls(updatedBlobImages);
    setImages(updatedBlobImages);

    if (representativeIndex >= updatedBlobImages.length) {
      const newRepresentativeIndex = updatedBlobImages.length > 0 ? 0 : null;
      setRepresentativeIndex(newRepresentativeIndex);
      onSetRepresentative(newRepresentativeIndex);
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index);
    onSetRepresentative(index);
  };

  return (
    <Wrapper>
      <Instructions>
        이미지 업로드*{' '}
        <span>
          최대 10MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수 있습니다.
        </span>
      </Instructions>

      <ImagesWrapper>
        {blobImage.map((image, index) => (
          <ImageContainer key={image.id}>
            <ImageBox onClick={() => handleSetRepresentative(index)}>
              {index === representativeIndex && (
                <RepresentativeLabel>대표</RepresentativeLabel>
              )}
              <ImagePreview src={image.preview} alt={image.label} />
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(image.id);
                }}
              >
                <CancelIcon icon="ic:round-close" />
              </DeleteButton>
            </ImageBox>
            <FileName>{image.label}</FileName>
          </ImageContainer>
        ))}
        {blobImage.length < MAX_IMAGES && (
          <AddImageBox {...getRootProps()}>
            <input {...getInputProps()} />
            <AddCircle>
              <Icon
                icon="iconoir:plus"
                width="1.823vw"
                height="1.823vw"
                style={{ color: '#aaa' }}
              />
            </AddCircle>
            <AddText>이미지 추가하기</AddText>
          </AddImageBox>
        )}
      </ImagesWrapper>
    </Wrapper>
  );
};

export default EditImageUploadComponent;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Instructions = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 15px;

  span {
    ${font.body2}
    color: var(--gray2);
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 100%;
  width: 1000px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 140px;
  height: 132px;
  position: relative;
  background-color: #f0f0f0;
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

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CancelIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  color: var(--gray1);
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

const AddImageBox = styled.div`
  width: 140px;
  height: 132px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
`;

const AddCircle = styled.div`
  width: 56px;
  height: 56px;
  border: 1px dashed #aaa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AddText = styled.div`
  color: var(--gray2);
  font-size: 10px;
`;
