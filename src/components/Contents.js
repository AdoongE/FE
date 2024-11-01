import styled from 'styled-components';
import { React } from 'react';
import { Icon } from '@iconify/react';

function Contents() {
  return (
    <Main>
      <Title>내 콘텐츠 모아보기</Title>
      <Bar>
        <Filter>
          <div>최신순</div>
          <div>|</div>
          <div>이름순</div>
        </Filter>
        <SearchContainer>
          <Icon
            icon="mage:filter"
            style={{
              width: ' 1.6875rem',
              height: ' 1.6875rem',
              position: 'relative',
              left: '3.75rem',
              top: '0.9125rem',
              color: 'black',
            }}
          />
          <Search placeholder="찾고 싶은 콘텐츠를 검색하세요." />
          <Icon
            icon="stash:search-solid"
            style={{
              width: ' 1.5rem',
              height: ' 1.5rem',
              position: 'relative',
              right: '9.375rem',
              top: '0.975rem',
              color: 'black',
            }}
          />
        </SearchContainer>
      </Bar>
      <Page>
        <Sentence>
          다시 보고 싶은 링크와 사진들,
          <br />
          여기저기 저장하지 말고 이젠 한 곳에서 관리하세요!
        </Sentence>
        <NewButton>+ 새 콘텐츠 저장하기</NewButton>
      </Page>

      {/* 페이지네이션 */}
      <Pagination>&lt; 1 &gt;</Pagination>
    </Main>
  );
}

const Main = styled.div`
  position: relative;
  padding-left: 2.8125rem;
  padding-top: 5.1875rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2.75rem;
  position: absolute;
  left: 0;
  margin-left: 2.8125rem;
`;

const Filter = styled.div`
  display: flex;
  margin-top: 3.3125rem;
  /* margin-left: 2.8125rem; */
  column-gap: 0.625rem;
  text-align: center;

  /* 선택되었다고 가정 */
  font-size: 1.25rem;
  font-weight: 700;
`;

const Search = styled.input`
  width: 30.8125rem;
  height: 3.125rem;
  border-radius: 1.5625rem;
  margin-right: 6.25rem;
  background-color: #f2f2f2;
  border: 1px solid #9f9f9f;
  opacity: 0.3;
  padding-top: 5px;

  &::placeholder {
    font-weight: 400;
    /* text-align: center; */
    font-size: 1.125rem;
    color: #9f9f9f;
    padding-left: 4.925rem;
    padding-top: 1.0625rem;
  }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 3.3125rem;
`;

const Sentence = styled.div`
  font-weight: 500;
  font-size: 2rem;
  text-align: center;
  color: #4f4f4f;
`;

const NewButton = styled.button`
  width: 25.25rem;
  height: 4.75rem;
  margin-top: 2.75rem;
  color: white;
  background-color: #41c3ab;
  text-align: center;
  border-radius: 1.25rem;
  font-weight: 600;
  font-size: 1.875rem;
  border: 0;
`;

const Page = styled.div`
  position: absolute;
  top: 25.75rem;
  /* left: 24.1875rem; */
  right: 31.625rem;
`;

const SearchContainer = styled.div`
  display: flex;
  position: relative;
`;

const Pagination = styled.div`
  position: absolute;
  right: 52.9575rem;
  top: 55.1875rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

export default Contents;
