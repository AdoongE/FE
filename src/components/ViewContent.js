import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import axios from 'axios';

function ViewContent() {
  const [contentInfo, setContentInfo] = useState({
    contentId: '',
    contentDataType: '',
    contentName: '',
    contentLink: '',
    contentImage: '',
    contentDoc: '',
    thumbnailImage: '',
    boardCategory: '',
    tags: '',
    dDay: '',
    contentDetail: '',
  });

  useEffect(() => {
    // handleViewContent();
    console.log(contentInfo);
  }, []);

  const handleViewContent = async () => {
    const token = localStorage.getItem('jwtToken');
    const api = axios.create({
      baseURL: 'http://52.78.221.255',
      headers: { Authorization: `${token}` },
    });
    try {
      const contentId = 5;
      const response = await api.get(`/api/v1/content/all/${contentId}`);

      const results = response.data.results;
      console.log('hihihi', results);
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
        dDay: results.dDay,
        contentDetail: results.contentDetail,
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
  return (
    <>
      <ContentPage>
        <Contents>
          <UpperDiv>
            <TitleDiv>에어비엔비 광고 레퍼런스</TitleDiv>
            <ButtonDiv>
              <LinkShare>링크공유</LinkShare>
              <CloseBtn onClick={handleClose}>닫기</CloseBtn>
            </ButtonDiv>
          </UpperDiv>
          <ContentDiv>
            <Name>카테고리</Name>
            <CategoryTag>카테고리1</CategoryTag>
            <CategoryTag>카테고리2</CategoryTag>
          </ContentDiv>
          <ContentDiv>
            <Name>링크</Name>
            <Link
              onClick={() =>
                handleLinkClick('https://www.youtube.com/watch?v=0cICRaWZFxk')
              }
            >
              <Icon
                icon="ic:twotone-link"
                width="24"
                height="24"
                style={{
                  color: '#4f4f4f',
                  marginRight: '10px',
                  paddingBottom: '3px',
                  verticalAlign: 'middle',
                }}
              />
              https://www.youtube.com/watch?v=0cICRaWZFxk
            </Link>
          </ContentDiv>
          <ContentDiv>
            <Name>태그 (2개 이상)*</Name>
            <CategoryTag>광고</CategoryTag>
            <CategoryTag>여행</CategoryTag>
            <CategoryTag>에어비엔비</CategoryTag>
            <CategoryTag>3D일러스트</CategoryTag>
          </ContentDiv>
          <Dday>
            <Long>
              <Name className="dday">
                디데이
                <Short>
                  디데이를 입력하면 해당 날짜에 알림을 받을 수 있습니다.
                </Short>
              </Name>
            </Long>
            <DdayDiv>
              <RemainDay>D-1</RemainDay>
              <Calendar>
                <Icon
                  icon="lucide:calendar"
                  width="24px"
                  height="24px"
                  style={{
                    color: '#4f4f4f',
                    paddingBottom: '3px',
                    marginRight: '10px',
                  }}
                />
                <Date>2024 / 11 / 30</Date>
              </Calendar>
            </DdayDiv>
          </Dday>
          <Memo>
            <Name>메모 입력</Name>
            <Text>에어비엔비의 광고.여행 관련 브랜드 광고 시 참고할 것.</Text>
          </Memo>
        </Contents>
        <Button onClick={handleViewContent}>수정하기</Button>
      </ContentPage>
    </>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: -60px;
`;

const LinkShare = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #21a58c;
  border-radius: 10px;
  background-color: #def3f1;
  width: 143px;
  height: 57px;
  color: #21a58c;
  font-size: 24px;
`;
const CloseBtn = styled.button`
  background-color: #dcdada;
  color: #9f9f9f;
  width: 102px;
  height: 57px;
  border: none;
  border-radius: 10px;
  font-size: 24px;
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
  margin-top: 57px;
  margin-bottom: 80px;
`;

const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleDiv = styled.p`
  font-size: 40px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #41c3ab;
  width: auto;
  height: 44px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin-right: 20px;
  padding: 0 16px;
`;

const Link = styled.div`
  font-size: 20px;
  color: #4f4f4f;
  border-bottom: 1px solid #9f9f9f;
  padding-bottom: 8px;
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  &:hover {
    color: #41c3ab;
  }
`;

const Text = styled.textarea`
  width: 1334px;
  height: 238px;
  border-radius: 10px;
  border: 1px solid #9f9f9f;
  font-size: 20px;
  padding-left: 27px;
  padding-top: 26px;
`;

const Dday = styled.div``;

const DdayDiv = styled.div`
  display: flex;
  gap: 21px;
`;

const RemainDay = styled.div`
  background-color: #9f9f9f;
  border-radius: 10px;
  width: 74px;
  height: 48px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Calendar = styled.div`
  display: flex;
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  width: 238px;
  height: 50px;
  color: #4f4f4f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Date = styled.div`
  color: #4f4f4f;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Short = styled.span`
  font-weight: 400;
  font-size: 20px;
  color: #8b8b8b;
  margin-left: 10px;
  width: 300px;
`;

const Long = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 22px;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 30px;
  width: 238px;
  &.dday {
    width: 550px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 289px;
  height: 76px;
  border-radius: 10px;
  border: 0;
  background-color: #41c3ab;
  color: white;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 98px;
`;

export default ViewContent;
