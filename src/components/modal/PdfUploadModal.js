import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios-instance';
import BeatLoader from 'react-spinners/BeatLoader';
import { font } from '../../styles/font';

function PdfUploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0);
  const [error, setError] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        return {
          id: file.name,
          label: file.name,
          preview,
        };
      });
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
    noClick: files.length > 0, // 파일이 있을 때 클릭 비활성화
    noKeyboard: true, // 키보드 동작 비활성화
  });

  const handleSetRepresentative = (index, event) => {
    event.stopPropagation();
    setRepresentativeIndex(index);
  };

  // 삭제 시 대표 이미지 유지 로직 수정
  const handleDeleteFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);

    // 현재 대표 이미지가 삭제된 경우, 첫 번째 이미지를 대표로 설정
    if (updatedFiles.length > 0 && id === files[representativeIndex]?.id) {
      setRepresentativeIndex(0); // 첫 번째 이미지를 대표 이미지로 설정
    } else if (updatedFiles.length === 0) {
      setRepresentativeIndex(null); // 파일이 모두 삭제된 경우 대표 이미지 초기화
    }
  };

  const handleConfirm = async () => {
    if (files.length === 0) {
      setError(true);
      return;
    }

    const finalRepresentativeIndex =
      representativeIndex !== null ? representativeIndex : 0;

    const formData = new FormData();
    const pdf = files[finalRepresentativeIndex];
    const blob = await fetch(pdf.preview).then((res) => res.blob());
    const file = new File([blob], pdf.label, { type: blob.type });

    formData.append('file', file);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        '/api/v1/simplification/pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response:', response);

      const simplificationInfo = response.data?.results[0];
      const tagsString = simplificationInfo.tags || '';
      const tagsArray = tagsString.split(/,\s*/);

      navigate('/content-add', {
        state: {
          files,
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

  const handleScrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(0, prevIndex - 1)); // 스크롤 인덱스 감소
  };

  const handleScrollRight = () => {
    setScrollIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(0, files.length - 4)),
    ); // 스크롤 인덱스 증가, 파일 개수를 초과하지 않도록 제한
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
            PDF를 업로드하고 썸네일을 지정하세요.
          </DescriptionText>
          <DescriptionNote>
            *썸네일을 기준으로 제목과 태그, 요약 내용이 자동 입력됩니다.
          </DescriptionNote>
          <DropArea {...getRootProps()} hasError={error}>
            <input {...getInputProps()} />
            {files.length === 0 ? (
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
                  PDF 파일 선택
                  <br />
                  혹은 여기로 파일을 끌어오세요.
                </DropText>
              </EmptyState>
            ) : (
              <FilesState>
                <FilesWrapper>
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
                  {files
                    .slice(scrollIndex, scrollIndex + 4)
                    .map((file, index) => (
                      <FileContainer
                        key={file.id}
                        onClick={(e) =>
                          handleSetRepresentative(index + scrollIndex, e)
                        }
                      >
                        {index + scrollIndex === representativeIndex && (
                          <RepresentativeLabel>대표</RepresentativeLabel>
                        )}
                        <FileIcon>
                          <Icon
                            icon="mdi-light:file"
                            style={{ fontSize: '20px', color: '#666' }}
                          />
                        </FileIcon>
                        <FileName>{file.label}</FileName>
                        <DeleteButton
                          onClick={(e) => handleDeleteFile(file.id, e)}
                        >
                          ×
                        </DeleteButton>
                      </FileContainer>
                    ))}
                  {scrollIndex + 4 < files.length && (
                    <ScrollButtonRight
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 방지
                        handleScrollRight();
                      }}
                    >
                      <Icon
                        icon="fa-solid:angle-right"
                        style={{ fontSize: '20px', color: '#666' }}
                      />
                    </ScrollButtonRight>
                  )}
                </FilesWrapper>
              </FilesState>
            )}
            {files.length > 0 && (
              <AddButton onClick={open}>+ PDF 추가</AddButton>
            )}
          </DropArea>
          <FileLimit>최대 1OMB 이하의 PDF 파일만 첨부할 수 있습니다.</FileLimit>
          {error && <ErrorMessage>PDF 파일을 업로드하세요</ErrorMessage>}
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
  width: 542px;
  height: 500px;
  padding: 30px 50px;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
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

const FilesWrapper = styled.div`
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

const FileContainer = styled.div`
  width: 110px;
  height: 110px;
  margin-top: 20px;
  background: #eaf4f4;
  border-radius: 5px;
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
  margin-top: 70px;
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
