import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

function ContentHeader() {
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  const handleFilterClick = (filterOption) => {
    setSelectedFilter(filterOption);
  };

  return (
    <Main>
      <Title>내 콘텐츠 모아보기</Title>
      <Bar>
        <Filter>
          <Option
            $isSelected={selectedFilter === '최신순'}
            onClick={() => handleFilterClick('최신순')}
          >
            최신순
          </Option>
          <div>|</div>
          <Option
            $isSelected={selectedFilter === '이름순'}
            onClick={() => handleFilterClick('이름순')}
          >
            이름순
          </Option>
        </Filter>
        <SearchContainer>
          <Icon
            icon="mage:filter"
            style={{
              width: '27px',
              height: '27px',
              marginLeft: '22px',
              color: 'black',
            }}
          />
          <Search placeholder="찾고 싶은 콘텐츠를 검색하세요." />
          <Icon
            icon="stash:search-solid"
            style={{
              width: '24px',
              height: '24px',
              marginRight: '13px',
              color: 'black',
            }}
          />
        </SearchContainer>
      </Bar>
    </Main>
  );
}

const Option = styled.div`
  cursor: pointer;
  font-weight: ${(props) => (props.$isSelected ? 700 : 400)};
`;

const Main = styled.div`
  position: relative;
  padding-left: 45px;
  padding-top: 83px;
  padding-bottom: 70px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 44px;
  position: absolute;
  left: 0;
  margin-left: 45px;
`;

const Filter = styled.div`
  display: flex;
  margin-top: 53px;
  column-gap: 10px;
  text-align: center;
  font-size: 20px;
`;

const SearchContainer = styled.div`
  width: 493px;
  height: 50px;
  z-index: 1;
  border-radius: 25px;
  margin-right: 100px;
  background-color: (0, 0, 0, 0.3);
  border: 1px solid #9f9f9f;
  padding-top: 5px;
  display: flex;
  position: relative;

  justify-content: space-around;
  align-items: center;
`;

const Search = styled.input`
  width: 370px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  text-align: start;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 25px;

  &::placeholder {
    font-weight: 400;
    font-size: 18px;
    color: #9f9f9f;
    transform: translateY(-4px);
  }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 53px;
`;

export default ContentHeader;