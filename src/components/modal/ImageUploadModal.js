import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const ImageUploadModal = ({ onClose, onConfirm }) => {
  const [images, setImages] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 이미지 인덱스

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: file.name,
        label: file.name,
        preview: URL.createObjectURL(file),
      }));

      setImages([...images, ...newImages]);

      // 첫 이미지 업로드 시 자동으로 대표 이미지 설정
      if (images.length === 0) {
        setRepresentativeIndex(0);
      }
    },
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxSize: 10 * 1024 * 1024, // 10MB 제한
  });

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    if (representativeIndex >= updatedImages.length) {
      setRepresentativeIndex(0);
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index);
  };

  const handleConfirm = () => {
    onConfirm(images);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>씨드 추가</Title>
          <Icon
            icon="line-md:close"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={onClose}
          />
        </Header>
        <Body>
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
                <ImageBox
                  key={image.id}
                  onClick={() => handleSetRepresentative(index)}
                >
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
        </Body>
        <Footer>
          <Button onClick={handleConfirm}>완료</Button>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageUploadModal;

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
  width: 500px;
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DropArea = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
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
  gap: 10px;
  flex-wrap: wrap;
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
  margin-bottom: 10px;
`;

const AddText = styled.div`
  color: #aaa;
  font-size: 12px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #41c3ab;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;
