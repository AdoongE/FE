import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import ViewImagePdfModal from './modal/ViewImagePDFModal';
import { axiosInstance } from './api/axios-instance';

function ViewContent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [contentInfo, setContentInfo] = useState({
    contentId: '',
    contentDataType: '',
    contentName: '',
    contentLink: '',
    contentImage: [],
    contentDoc: [],
    thumbnailImage: '',
    boardCategory: [],
    tags: [],
    dday: '',
    contentDetail: '',
  });
  const [remainingDays, setRemainingDays] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => setSelectedFile(file);
  const closeModal = () => setSelectedFile(null);

  useEffect(() => {
    handleViewContent();
    if (contentInfo.dday) {
      calRemainingDays(contentInfo.dday);
    }
  }, [contentInfo.dday]);

  const calRemainingDays = () => {
    const currentDate = new globalThis.Date();
    const ddayDate = new globalThis.Date(contentInfo.dday);
    const timeDiff = ddayDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setRemainingDays(dayDiff);
  };
  console.log('썸네일 인덱스', contentInfo.thumbnailImage);

  const handleViewContent = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/content/all/${state.contentId}`,
      );
      const results = response.data.results[0];
      console.log('결과', results);
      setContentInfo({
        contentId: results.contentId,
        contentDataType: results.contentDataType,
        contentName: results.contentName,
        contentLink: results.contentLink,
        contentImage: results.contentImage,
        contentDoc: results.contentDoc,
        thumbnailImage: results.thumbnailImage,
        boardCategory: results.boardCategory,
        tags: results.tags,
        dday: results.dday,
        contentDetail: results.contentDetail,
        filename: results.title,
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
        dataType: contentInfo.contentDataType,
      },
    });
  };

  return (
    <>
      <ContentPage>
        <Contents>
          <UpperDiv>
            <TitleDiv>{contentInfo.contentName}</TitleDiv>
            <ButtonDiv>
              <LinkShare>링크공유</LinkShare>
              <CloseBtn onClick={handleClose}>닫기</CloseBtn>
            </ButtonDiv>
          </UpperDiv>
          <ContentDiv>
            <Name>카테고리</Name>
            {contentInfo.boardCategory.map((category) => (
              <CategoryTag key={category}>{category}</CategoryTag>
            ))}
          </ContentDiv>
          <ContentDiv
            style={{
              flexDirection:
                contentInfo.contentDataType === 'PDF' ||
                contentInfo.contentDataType === 'IMAGE'
                  ? 'column'
                  : 'row',
            }}
          >
            <Name
              style={{
                alignSelf:
                  contentInfo.contentDataType === 'PDF' ||
                  contentInfo.contentDataType === 'IMAGE'
                    ? 'flex-start'
                    : 'center', // 이미지와 PDF 외에는 중앙 정렬 유지
              }}
            >
              {contentInfo.contentDataType === 'LINK'
                ? '링크'
                : contentInfo.contentDataType === 'IMAGE'
                  ? '이미지'
                  : 'PDF 파일'}
            </Name>
            {contentInfo.contentDataType === 'LINK' && (
              <Link
                onClick={() => handleLinkClick(`${contentInfo.contentLink}`)}
              >
                <Icon
                  icon="ic:twotone-link"
                  width="1.25vw"
                  height="1.25vw"
                  style={{
                    color: '#4f4f4f',
                    marginRight: '0.521vw',
                    paddingBottom: '0.156vw',
                    verticalAlign: 'middle',
                  }}
                />
                {contentInfo.contentLink}
              </Link>
            )}
            {contentInfo.contentDataType === 'IMAGE' && (
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
            {contentInfo.contentDataType === 'PDF' && (
              <FilesWrapper>
                {contentInfo.contentDoc.map((file, index) => (
                  <FileContainer key={file}>
                    <FileBox onClick={() => openModal(file)}>
                      {index === contentInfo.thumbnailImage && (
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
                  contentInfo.contentDataType === 'PDF'
                    ? contentInfo.contentDoc
                    : contentInfo.contentImage
                }
                onClose={closeModal}
                contentDataType={contentInfo.contentDataType}
              />
            )}
          </ContentDiv>
          <ContentDiv>
            <Name>태그 (2개 이상)*</Name>
            {contentInfo.tags.map((tag) => (
              <CategoryTag key={tag}>{tag}</CategoryTag>
            ))}
          </ContentDiv>
          <Dday>
            <Long>
              <Name className="dday">디데이</Name>
            </Long>
            <DdayDiv>
              {remainingDays !== null ? (
                <RemainDay>
                  {`D${remainingDays >= 0 ? `-${remainingDays}` : `+${Math.abs(remainingDays)}`}`}
                </RemainDay>
              ) : null}
              <Calendar>
                <Icon
                  icon="lucide:calendar"
                  width="1.25vw"
                  height="1.25vw"
                  style={{
                    color: '#4f4f4f',
                    paddingBottom: '0.156vw',
                    marginRight: '0.521vw',
                  }}
                />
                {remainingDays ? <Date>{contentInfo.dday}</Date> : `yyyy-mm-dd`}
              </Calendar>
            </DdayDiv>
          </Dday>
          <Memo>
            <Name>메모</Name>
            <Text>{contentInfo.contentDetail}</Text>
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
  gap: 1.04vw; /* 20px */
  margin-top: -3.13vw; /* -60px */
`;

const LinkShare = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.052vw solid #21a58c; /* 1px */
  border-radius: 0.52vw; /* 0.521vw */
  background-color: #def3f1;
  width: 7.45vw; /* 143px */
  height: 2.97vw; /* 57px */
  color: #21a58c;
  font-size: 1.25vw; /* 1.25vwpx */
`;

const CloseBtn = styled.button`
  background-color: #dcdada;
  color: #9f9f9f;
  width: 5.31vw; /* 102px */
  height: 2.97vw; /* 57px */
  border: none;
  border-radius: 0.52vw; /* 0.521vw */
  font-size: 1.25vw; /* 1.25vwpx */
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
  row-gap: 3.13vw; /* 60px */
  margin-top: 2.97vw; /* 57px */
  margin-bottom: 4.17vw; /* 80px */
`;

const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleDiv = styled.p`
  font-size: 2.08vw; /* 40px */
`;

const ContentDiv = styled.div`
  display: flex;
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #41c3ab;
  width: auto;
  height: 2.29vw; /* 44px */
  color: white;
  border: none;
  border-radius: 0.26vw; /* 5px */
  font-size: 1.04vw; /* 20px */
  margin-right: 1.04vw; /* 20px */
  padding: 0 0.83vw; /* 16px */
`;

const Link = styled.div`
  font-size: 1.04vw; /* 20px */
  color: #4f4f4f;
  border-bottom: 0.052vw solid #9f9f9f; /* 1px */
  padding-bottom: 0.42vw; /* 8px */
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  max-width: 41.67vw; /* 800px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #41c3ab;
  }
`;

const Text = styled.div`
  width: 69.58vw; /* 1334px */
  height: 12.4vw; /* 238px */
  border-radius: 0.52vw; /* 0.521vw */
  border: 0.052vw solid #9f9f9f; /* 1px */
  font-size: 1.04vw; /* 20px */
  padding-left: 1.41vw; /* 27px */
  padding-top: 1.35vw; /* 26px */
`;

const Dday = styled.div``;

const DdayDiv = styled.div`
  display: flex;
  gap: 1.09vw; /* 21px */
`;

const RemainDay = styled.div`
  background-color: #9f9f9f;
  border-radius: 0.52vw; /* 0.521vw */
  width: 3.85vw; /* 74px */
  height: 2.5vw; /* 48px */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.04vw; /* 20px */
`;

const Calendar = styled.div`
  display: flex;
  border: 0.052vw solid #9f9f9f; /* 1px */
  border-radius: 0.52vw; /* 0.521vw */
  width: 12.4vw; /* 238px */
  height: 2.6vw; /* 50px */
  color: #4f4f4f;
  align-items: center;
  justify-content: center;
  font-size: 1.04vw; /* 20px */
  padding-right: 0.78vw; /* 15px */
`;

const Date = styled.div`
  color: #4f4f4f;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.83vw; /* 16px */
`;

const Long = styled.div`
  display: flex;
  column-gap: 0.52vw; /* 0.521vw */
  margin-bottom: 1.15vw; /* 22px */
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 1.56vw; /* 30px */
  width: 12.4vw; /* 238px */
  padding-top: 0.26vw; /* 5px */
  &.dday {
    width: 28.65vw; /* 550px */
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.05vw; /* 289px */
  height: 3.96vw; /* 76px */
  border-radius: 0.52vw; /* 0.521vw */
  border: 0;
  background-color: #41c3ab;
  color: white;
  font-size: 1.56vw; /* 30px */
  font-weight: 500;
  margin-bottom: 5.1vw; /* 98px */
`;

// 이미지 조회 컴포넌트
// 이미지 조회 컴포넌트
const ImagesWrapper = styled.div`
  display: flex;
  gap: 1.56vw; /* 30px */
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.78vw; /* 15px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.42vw; /* 8px */
  width: 100%;
  max-width: 57.29vw; /* 1100px */
  margin-top: 0.83vw; /* 16px */
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 8.28vw; /* 159px */
  height: 9.21vw; /* 177px */
  position: relative;
  background-color: #f0f0f0;
  border-radius: 0.21vw; /* 4px */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 0.26vw; /* 5px */
  left: 0.26vw; /* 5px */
  background-color: #47c28b;
  color: white;
  padding: 0.1vw 0.31vw; /* 2px 6px */
  font-size: 0.63vw; /* 12px */
  border-radius: 0.63vw; /* 12px */
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.21vw; /* 4px */
  object-fit: cover;
`;

const FileName = styled.div`
  margin-top: 0.42vw; /* 8px */
  font-size: 0.73vw; /* 14px */
  color: #666;
  text-align: center;
  width: 7.29vw; /* 140px */
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 링크 조회 관련 스타일
const FilesWrapper = styled.div`
  display: flex;
  gap: 1.56vw; /* 30px */
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.78vw; /* 15px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.42vw; /* 8px */
  width: 100%;
  max-width: 57.29vw; /* 1100px */
  margin-top: 0.83vw; /* 16px */
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FileBox = styled.div`
  width: 8.28vw; /* 159px */
  height: 9.21vw; /* 177px */
  position: relative;
  background-color: #eaf4f4;
  border-radius: 0.21vw; /* 4px */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4caf50;
`;

export default ViewContent;
