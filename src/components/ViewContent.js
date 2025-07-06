import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ViewImagePdfModal from './modal/ViewImagePDFModal';
import { axiosInstance } from './api/axios-instance';
import { font } from '../styles/font';

function ViewContent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [contentInfo, setContentInfo] = useState({
    contentId: '',
    seedType: '',
    seedName: '',
    seedLink: '',
    contentImage: [],
    contentDoc: [],
    thumbnailImage: '',
    categoryNames: [],
    tags: [],
    dDay: '',
    seedDetail: '',
  });
  const [remainingDays, setRemainingDays] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => setSelectedFile(file);
  const closeModal = () => setSelectedFile(null);

  useEffect(() => {
    handleViewContent();
    if (contentInfo.dDay) {
      calRemainingDays(contentInfo.dDay);
    }
  }, []);

  const calRemainingDays = () => {
    const currentDate = new globalThis.Date();
    const dDayDate = new globalThis.Date(contentInfo.dDay);
    const timeDiff = dDayDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setRemainingDays(dayDiff);
  };

  const handleViewContent = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/seed/${state.contentId}`,
      );
      const results = response.data.results[0];
      setContentInfo({
        contentId: results.seedId,
        seedType: results.seedType,
        seedName: results.seedName,
        seedLink: results.seedLink,
        contentImage: results.fileLinks,
        contentDoc: results.fileLinks,
        thumbnailImage: results.thumbnailImage,
        categoryNames: results.categoryNames,
        tags: results.tagNames,
        dDay: results.dDay,
        seedDetail: results.seedDetail,
        filename: results.titles,
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

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };
  const handleClose = () => {
    window.history.back();
  };

  const editContent = () => {
    navigate(`/content-edit/${contentInfo.contentId}`, {
      replace: false,
      state: {
        Id: contentInfo.contentId,
        seedType: contentInfo.seedType,
      },
    });
  };

  return (
    <>
      <ContentPage>
        <Contents>
          <UpperDiv>
            <TitleDiv>{contentInfo.seedName}</TitleDiv>
            <ButtonDiv>
              <LinkShare>링크공유</LinkShare>
              <CloseBtn onClick={handleClose}>닫기</CloseBtn>
            </ButtonDiv>
          </UpperDiv>
          <ContentDiv>
            <Name>카테고리</Name>
            {contentInfo.categoryNames.map((category) => (
              <CategoryTag key={category}>{category}</CategoryTag>
            ))}
          </ContentDiv>
          <ContentDiv
            style={{
              flexDirection:
                contentInfo.seedType === 'PDF' ||
                contentInfo.seedType === 'IMAGE'
                  ? 'column'
                  : 'row',
            }}
          >
            <Name
              style={{
                alignSelf:
                  contentInfo.seedType === 'PDF' ||
                  contentInfo.seedType === 'IMAGE'
                    ? 'flex-start'
                    : 'center',
              }}
            >
              {contentInfo.seedType === 'LINK'
                ? '링크'
                : contentInfo.seedType === 'IMAGE'
                  ? '이미지'
                  : 'PDF 파일'}
            </Name>
            {contentInfo.seedType === 'LINK' && (
              <Link onClick={() => handleLinkClick(`${contentInfo.seedLink}`)}>
                <LinkIcon icon="ic:twotone-link" />
                {contentInfo.seedLink}
              </Link>
            )}
            {contentInfo.seedType === 'IMAGE' && (
              <ImagesWrapper>
                {contentInfo.contentImage.map((image, index) => (
                  <ImageContainer key={image}>
                    <ImageBox onClick={() => openModal(image)}>
                      {index === contentInfo.thumbnailImage && (
                        <RepresentativeLabel>대표</RepresentativeLabel>
                      )}
                      <ImagePreview src={image} alt="" />
                    </ImageBox>
                    {contentInfo.filename[index] && (
                      <FileName key={contentInfo.filename[index]}>
                        {contentInfo.filename[index]}
                      </FileName>
                    )}
                  </ImageContainer>
                ))}
              </ImagesWrapper>
            )}
            {contentInfo.seedType === 'PDF' && (
              <FilesWrapper>
                {contentInfo.contentDoc.map((file, index) => (
                  <FileContainer key={file}>
                    <FileBox onClick={() => openModal(file)}>
                      {index === contentInfo.thumbnailImage && (
                        <RepresentativeLabel>대표</RepresentativeLabel>
                      )}
                      <FileIcon icon="prime:file" />
                    </FileBox>
                    <FileName key={contentInfo.filename[index]}>
                      {contentInfo.filename[index]}
                    </FileName>
                  </FileContainer>
                ))}
              </FilesWrapper>
            )}
            {selectedFile && (
              <ViewImagePdfModal
                file={selectedFile}
                files={
                  contentInfo.seedType === 'PDF'
                    ? contentInfo.contentDoc
                    : contentInfo.contentImage
                }
                onClose={closeModal}
                seedType={contentInfo.seedType}
              />
            )}
          </ContentDiv>
          <ContentDiv>
            <Name>태그 (2개 이상)</Name>
            {contentInfo.tags.map((tag) => (
              <CategoryTag key={tag}>{tag}</CategoryTag>
            ))}
          </ContentDiv>
          <Dday>
            <Long>
              <Name className="dDay">디데이</Name>
            </Long>
            <DdayDiv>
              {remainingDays !== null ? (
                <RemainDay>
                  {`D${remainingDays >= 0 ? `-${remainingDays}` : `+${Math.abs(remainingDays)}`}`}
                </RemainDay>
              ) : null}
              <Calendar>
                <CalendarIcon icon="lucide:calendar" />
                {remainingDays ? <Date>{contentInfo.dDay}</Date> : `yyyy-mm-dd`}
              </Calendar>
            </DdayDiv>
          </Dday>
          <Memo>
            <Name>메모</Name>
            <Text>{contentInfo.seedDetail}</Text>
          </Memo>
        </Contents>
        <Button onClick={editContent}>수정하기</Button>
      </ContentPage>
    </>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 114px;
  margin-right: 72px;
`;

const LinkShare = styled.button`
  padding: 12px 24px;
  border: 1px solid var(--green2);
  border-radius: 8px;
  background-color: #def3f1;
  color: var(--green2);
  font-size: 18px;
`;

const CloseBtn = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: var(--gray3);
  color: var(--gray2);
  font-size: 18px;
`;

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 60px;
  margin-bottom: 60px;
`;

const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleDiv = styled.p`
  font-size: 24px;
`;

const ContentDiv = styled.div`
  display: flex;
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green2);
  padding: 6.5px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  ${font.title3}
  margin-right: 12px;
`;

const Link = styled.div`
  ${font.title4}
  color: var(--gray1);
  border-bottom: 1px solid var(--gray2);
  padding-right: 10px;
  padding-bottom: 8px;
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  max-width: 800px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: var(--green2);
  }
`;

const LinkIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  color: var(--gray1);
  margin-right: 12px;
  padding-bottom: 2px;
  vertical-align: middle;
`;

const Text = styled.div`
  width: 1000px;
  height: 182px;
  border-radius: 8px;
  border: 0.6px solid var(--gray2);
  ${font.title4}
  padding: 14px 16px;
`;

const Dday = styled.div``;

const DdayDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const RemainDay = styled.div`
  background-color: var(--gray2);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.title3}
`;

const Calendar = styled.div`
  display: flex;
  border: 0.6px solid var(--gray2);
  border-radius: 8px;
  padding: 11px 14px;
  color: var(--gray1);
  align-items: center;
  justify-content: center;
  ${font.title4}
  padding-right: 30px;
`;

const CalendarIcon = styled(Icon)`
  color: var(--gray1);
  width: 18px;
  height: 18px;
  margin-right: 10px;
  padding-bottom: 2px;
`;

const Date = styled.div`
  color: #4f4f4f;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Long = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
  width: 161px;
  padding-top: 3px;
  &.dDay {
    width: 550px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 90px;
  border-radius: 8px;
  border: none;
  background-color: var(--green2);
  color: white;
  ${font.title1}
  margin-bottom: 54px;
`;

// 이미지 조회 컴포넌트
const ImagesWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  border: 0.6px solid var(--gray2);
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
  margin-top: 15px;
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
  border-radius: 3.95px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background-color: var(--green2);
  color: white;
  padding: 3px 7px;
  font-size: 10px;
  border-radius: 20px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 3.95px;
  object-fit: cover;
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: var(--gray2);
  text-align: center;
  width: 120px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// pdf 조회 관련 스타일
const FilesWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  border: 0.6px solid var(--gray2);
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
  margin-top: 15px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileBox = styled.div`
  width: 140px;
  height: 132px;
  position: relative;
  background-color: var(--green4);
  border-radius: 3.95px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FileIcon = styled(Icon)`
  color: var(--gray2);
  width: 40px;
  height: 40px;
`;

export default ViewContent;
