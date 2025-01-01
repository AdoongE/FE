import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const ImageUploadComponent = ({ onSetRepresentative, images, setImages }) => {
  const [representativeIndex, setRepresentativeIndex] = useState(null); // 대표 이미지 인덱스

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        return {
          id: file.name,
          label: file.name,
          preview,
        };
      });

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
    },
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxSize: 10 * 1024 * 1024, // 10 MB 제한
  });

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    if (representativeIndex >= updatedImages.length) {
      setRepresentativeIndex(0);
      onSetRepresentative(updatedImages[0] || null);
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index);
    onSetRepresentative(images[index]);
  };

  // 첫 번째 이미지 자동 설정
  useEffect(() => {
    if (images.length > 0 && representativeIndex === null) {
      setRepresentativeIndex(0);
      onSetRepresentative(images[0]);
    }
  }, [images, representativeIndex, onSetRepresentative]);

  return (
    <Wrapper>
      <Instructions>
        이미지 업로드*{' '}
        <span>
          최대 10MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수 있습니다.
        </span>
      </Instructions>
      {images.length === 0 ? (
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
          <DropText>이미지 선택 혹은 여기로 파일을 끌어오세요.</DropText>
        </DropArea>
      ) : (
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
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                >
                  ×
                </DeleteButton>
              </ImageBox>
              <FileName>{image.label}</FileName>
            </ImageContainer>
          ))}
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
        </ImagesWrapper>
      )}
    </Wrapper>
  );
};

export default ImageUploadComponent;

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
  width: 140px;
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
