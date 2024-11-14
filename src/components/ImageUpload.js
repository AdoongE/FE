import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const MAX_IMAGES = 5;

const ImageUploadComponent = ({ onSetRepresentative }) => {
  const [images, setImages] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 이미지 인덱스

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return {
        id: file.name,
        label: file.name,
        preview,
      };
    });

    if (images.length + newImages.length <= MAX_IMAGES) {
      setImages((prevImages) => [...prevImages, ...newImages]);
      if (images.length === 0) setRepresentativeIndex(0); // 첫 이미지가 대표로 설정됨
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxSize: 10 * 1024 * 1024, // 10 MB 제한
  });

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    if (representativeIndex >= updatedImages.length) {
      setRepresentativeIndex(0); // 이미지가 삭제될 경우, 첫 이미지로 대표 설정
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index); // 클릭 시 대표 이미지 변경
    onSetRepresentative(index);
  };

  return (
    <>
      <Instructions>
        이미지 업로드*{' '}
        <span>
          최대 OOMB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수 있습니다.
        </span>
      </Instructions>
      <ImagesWrapper>
        {images.map((image, index) => (
          <ImageContainer key={image.id}>
            <ImageBox onClick={() => handleSetRepresentative(index)}>
              {index === representativeIndex && (
                <RepresentativeLabel>대표</RepresentativeLabel>
              )}
              <ImagePreview src={image.preview} alt={image.label} />
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 버블링 방지
                  handleDeleteImage(image.id);
                }}
              >
                x
              </DeleteButton>
            </ImageBox>
            <FileName>{image.label}</FileName>
          </ImageContainer>
        ))}
        {images.length < MAX_IMAGES && (
          <AddImageBox {...getRootProps()}>
            <input {...getInputProps()} />
            <AddCircle>
              <Icon
                icon="iconoir:plus"
                width="35"
                height="35"
                style={{ color: '#aaa' }}
              />
            </AddCircle>
            <AddText>이미지 추가하기</AddText>
          </AddImageBox>
        )}
      </ImagesWrapper>
    </>
  );
};

export default ImageUploadComponent;

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

const ImagesWrapper = styled.div`
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 159px;
  height: 177px;
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
  color: #666;
  cursor: pointer;
  font-size: 20px;
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  width: 140px; // 사진 크기에 맞게 조정
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddImageBox = styled.div`
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
