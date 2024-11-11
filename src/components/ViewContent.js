import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

function ViewContent() {
  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <>
      <ContentPage>
        <ButtonDiv>
          <LinkShare>링크공유</LinkShare>
          <CloseBtn>닫기</CloseBtn>
        </ButtonDiv>
        <Contents>
          <TitleDiv>에어비엔비 광고 레퍼런스</TitleDiv>
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
          </Dday>
          <Memo>
            <Name>메모 입력</Name>
            <Text placeholder="메모를 입력하세요"></Text>
          </Memo>
        </Contents>
        <Button>수정하기</Button>
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
`;

export default ViewContent;
