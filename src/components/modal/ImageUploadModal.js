import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const ImageUploadModal = ({ onClose, onConfirm }) => {
  const [images, setImages] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0); // 대표 이미지 인덱스
  const [error, setError] = useState(false); // 에러 메시지 상태

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: file.name,
        label: file.name,
        preview: URL.createObjectURL(file),
      }));

      setImages([...images, ...newImages]);
      setError(false); // 파일 업로드 시 에러 상태 초기화
    },
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxSize: 10 * 1024 * 1024, // 10MB 제한
  });

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    // 대표 이미지가 삭제되었을 경우 첫 번째 이미지를 대표로 설정
    if (updatedImages.length > 0 && id === images[representativeIndex]?.id) {
      setRepresentativeIndex(0);
    }
  };

  const handleSetRepresentative = (index) => {
    setRepresentativeIndex(index); // 클릭한 이미지를 대표 이미지로 설정
  };

  const handleConfirm = () => {
    if (images.length === 0) {
      setError(true); // 이미지 업로드 에러 메시지 표시
    } else {
      onConfirm(images, representativeIndex); // 대표 이미지 인덱스와 함께 확인
      onClose();
    }
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
          <DescriptionText>
            이미지를 업로드하고 썸네일을 지정하세요.
          </DescriptionText>
          <DescriptionNote>
            *썸네일을 기준으로 제목과 태그, 요약 내용이 자동 입력됩니다.
          </DescriptionNote>
          <DropArea {...getRootProps()} hasError={error}>
            <input {...getInputProps()} />
            {images.length === 0 ? (
              <>
                <Icon
                  icon="material-symbols:upload-rounded"
                  style={{ width: '59px', height: '59px', color: '#4F4F4F' }}
                />
                <DropText>
                  이미지 선택
                  <br />
                  혹은 여기로 파일을 끌어오세요.
                </DropText>
              </>
            ) : (
              <ImagesWrapper>
                {images.map((image, index) => (
                  <ImageBox
                    key={image.id}
                    onClick={() => handleSetRepresentative(index)}
                  >
                    {representativeIndex === index && (
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
              </ImagesWrapper>
            )}
          </DropArea>
          <FileLimit>
            최대 10MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수 있습니다.
          </FileLimit>
          {error && <ErrorMessage>이미지를 업로드하세요</ErrorMessage>}
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
  overflow-x: auto;
`;

const DropText = styled.div`
  color: #aaa;
  margin-top: 12px;
  font-size: 16px;
  text-align: center;
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

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  padding: 10px 0;
`;

const ImageBox = styled.div`
  width: 130px;
  height: 130px;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
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

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
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
