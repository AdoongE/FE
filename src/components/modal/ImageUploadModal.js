import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios-instance';
import BeatLoader from 'react-spinners/BeatLoader';
import { font } from '../../styles/font';
import ImpossibleAlert from '../../assets/icons/impossible-alert.svg';

function ImageUploadModal({ onClose }) {
  const [images, setImages] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0);
  const [error, setError] = useState(false); // 에러 메시지 상태
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        return {
          id: file.name,
          label: file.name,
          preview,
        };
      });
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        // 첫 이미지 업로드 시 대표 이미지 설정
        if (updatedImages.length === newImages.length) {
          setRepresentativeIndex(0);
        }
        return updatedImages;
      });
      setError(false); // 파일 업로드 시 에러 상태 초기화
    },
    onDropRejected: (fileRejections) => {
      const isOverSize = fileRejections.some((file) =>
        file.errors.some((err) => err.code === 'file-too-large'),
      );

      if (isOverSize) {
        setToastMessage('업로드 가능한 용량을 초과했습니다.');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxSize: 10 * 1024 * 1024, // 10MB 제한
    noClick: images.length > 0,
    noKeyboard: true,
  });

  const handleSetRepresentative = (index, event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setRepresentativeIndex(index);
  };

  const handleDeleteImage = (id, idx, e) => {
    if (e) e.stopPropagation();

    const isRepresentative = idx === representativeIndex;
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    // 현재 대표 이미지가 삭제된 경우, 첫 번째 이미지를 대표로 설정
    if (isRepresentative && updatedImages.length > 0) {
      setRepresentativeIndex(0);
    } else if (isRepresentative) {
      setRepresentativeIndex(null);
    } else if (idx < representativeIndex) {
      setRepresentativeIndex(representativeIndex - 1);
    }
  };

  const handleConfirm = async () => {
    if (images.length === 0) {
      setError(true); // 이미지 업로드 에러 메시지 표시
      return;
    }

    const finalRepresentativeIndex =
      representativeIndex !== null ? representativeIndex : 0;

    const formData = new FormData();
    const image = images[finalRepresentativeIndex];
    const blob = await fetch(image.preview).then((res) => res.blob());
    const file = new File([blob], image.label, { type: blob.type });

    formData.append('file', file);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        '/api/v1/simplification/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response:', response);

      // 태그 문자열을 배열로 변환
      const simplificationInfo = response.data?.results[0];
      const tagsString = simplificationInfo.tags || '';
      const tagsArray = tagsString.split(/,\s*/);

      // 결과 데이터를 상태로 전달
      navigate('/content-add', {
        state: {
          images,
          representativeIndex: finalRepresentativeIndex,
          title: simplificationInfo.title || '',
          summary: simplificationInfo.summary || '',
          tags: tagsArray || [],
        },
      });
      onClose();
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollRight = () => {
    setScrollIndex((prevIndex) => {
      const maxIndex = images.length - 4;
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  const handleScrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(0, prevIndex - 4));
  };

  return (
    <ModalOverlay onClick={onClose}>
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
              <EmptyState>
                <Icon
                  icon="material-symbols:upload-rounded"
                  style={{
                    width: '48px',
                    height: '48px',
                    color: '#4F4F4F',
                  }}
                />
                <DropText>
                  이미지 선택
                  <br />
                  혹은 여기로 파일을 끌어오세요.
                </DropText>
              </EmptyState>
            ) : (
              <FilesState>
                <ImagesWrapper>
                  {scrollIndex > 0 && images.length > 4 && (
                    <ScrollButtonLeft
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScrollLeft();
                      }}
                    >
                      <Icon
                        icon="fa-solid:angle-left"
                        style={{ fontSize: '20px', color: '#666' }}
                      />
                    </ScrollButtonLeft>
                  )}
                  {images
                    .slice(scrollIndex, scrollIndex + 4)
                    .map((image, index) => (
                      <ImageBox
                        key={image.id}
                        onClick={(e) =>
                          handleSetRepresentative(index + scrollIndex, e)
                        }
                      >
                        {index + scrollIndex === representativeIndex && (
                          <RepresentativeLabel>대표</RepresentativeLabel>
                        )}
                        <ImagePreview src={image.preview} alt={image.label} />
                        <DeleteButton
                          onClick={(e) => handleDeleteImage(image.id, index, e)}
                        >
                          <CancelIcon icon="ic:round-close" />
                        </DeleteButton>
                      </ImageBox>
                    ))}
                  {scrollIndex > 0 && (
                    <ScrollButtonLeft
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 방지
                        handleScrollLeft();
                      }}
                    >
                      <Icon
                        icon="fa-solid:angle-left"
                        style={{ fontSize: '20px', color: '#666' }}
                      />
                    </ScrollButtonLeft>
                  )}
                  {scrollIndex + 4 < images.length && (
                    <ScrollButtonRight
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScrollRight();
                      }}
                    >
                      <Icon
                        icon="fa-solid:angle-right"
                        style={{ fontSize: '20px', color: '#666' }}
                      />
                    </ScrollButtonRight>
                  )}
                </ImagesWrapper>
              </FilesState>
            )}
            {images.length > 0 && (
              <AddButton onClick={open}>+ 이미지 추가</AddButton>
            )}
          </DropArea>
          <FileLimit>
            최대 10MB 이하의 JPG, JPEG, PNG 파일만 첨부할 수 있습니다.
          </FileLimit>
          {error && <ErrorMessage>이미지를 업로드하세요</ErrorMessage>}
        </Body>
        <Footer>
          <Button onClick={handleConfirm}>
            {isLoading ? (
              <BeatLoader color="rgba(255, 255, 255, 1)" margin={0} size={5} />
            ) : (
              <div>완료</div>
            )}
          </Button>
        </Footer>
      </ModalContent>
      {showToast && (
        <CustomToast>
          <ToastIcon>
            <img src={ImpossibleAlert} alt="Alert" />
          </ToastIcon>
          <ToastMessage>{toastMessage}</ToastMessage>
        </CustomToast>
      )}
    </ModalOverlay>
  );
}

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
  width: 542px;
  height: 500px;
  padding: 36px 32px;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  justify-content: space-between;
`;

const DescriptionText = styled.p`
  color: var(--gray1);
  font-size: 20px;
  font-style: normal;
  margin-bottom: 8px;
`;

const DescriptionNote = styled.small`
  color: var(--Color-5, #9f9f9f);
  font-size: 12px;
  font-style: normal;
  margin-bottom: 10px;
`;

const DropArea = styled.div`
  position: relative;
  height: 202px;
  border-radius: 8px;
  background-color: var(--gray6);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FilesState = styled.div`
  display: flex;
`;

const DropText = styled.div`
  color: #aaa;
  margin-top: 16px;
  font-size: 18px;
  text-align: center;
`;

const ImagesWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 5px;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 57%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ScrollButtonLeft = styled(ScrollButton)`
  left: -20px;
`;

const ScrollButtonRight = styled(ScrollButton)`
  right: -20px;
`;

const ImageBox = styled.div`
  width: 110px;
  height: 110px;
  margin-top: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #47c28b;
  color: white;
  padding: 2px 6px;
  font-size: 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const ImagePreview = styled.img`
  width: 110px;
  height: 110px;
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

const AddButton = styled.button`
  position: absolute;
  margin-top: 154px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 10px;
  background: var(--Color-5, #9f9f9f);
  color: white;
  cursor: pointer;
  font-size: 12px;
  border: none;
`;

const FileLimit = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: #9f9f9f;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #ff6b6b;
  margin-top: 8px;
  margin-bottom: -20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  position: fixed;
  background-color: #41c3ab;
  margin-top: 40px;
  padding: 12px 24px;
  color: white;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.title3}
`;

const CustomToast = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  padding: 14px 24px;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  background: var(--gray-gray4, #f2f2f2);
  box-shadow: 0 0 4.808px 0 rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation:
    fadeIn 0.3s,
    fadeOut 0.3s 2.7s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`;

const ToastIcon = styled.div`
  width: 40px;
  height: 40px;
`;

const ToastMessage = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
