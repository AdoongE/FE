import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import filterEditIcon from '../assets/icons/filterEdit.png';
import { Icon } from '@iconify/react';
import AddTagModal from './modal/AddTagModal';
import TagFilterModal from '../components/modal/TagFilterModal';
import { axiosInstance } from './api/axios-instance';

function ContentHeader({
  setSortOrder,
  categoryId,
  filterName,
  categoryName,
  filterId,
}) {
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [tags, setTags] = useState([]);

  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const handleFilterClick = (filterOption) => {
    setSelectedFilter(filterOption);
    setSortOrder(filterOption);
  };

  useEffect(() => console.log('선택한 태그: ', tags), [tags]);

  const handleSubmit = async (newTags) => {
    try {
      const data = { tags: newTags };
      const response = await axiosInstance.post(
        '/api/v1/content/filtering',
        data,
      );
      if (response.data.status.code === 200) {
        console.log('검색 태그 전송 성공:', response.data.status.message);
        setTags([]); // 상태 초기화
      }
    } catch (error) {
      console.error('검색 태그 전송 중 오류 발생:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (tags.length > 0) {
      handleSubmit(tags);
    }
  }, [tags]);

  return (
    <Main>
      {filterId === null ? (
        <>
          <Title>
            {categoryId ? (
              <>
                나의 씨드<CategoryName>&gt; {categoryName}</CategoryName>
              </>
            ) : (
              '나의 씨드'
            )}
          </Title>
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
                icon="stash:search-solid"
                style={{
                  width: '24px',
                  height: '24px',
                  marginLeft: '15px',
                  color: 'black',
                }}
              />
              <Search placeholder="찾고 싶은 콘텐츠를 검색하세요." />
              <SearchButton type="button" onClick={() => showModal()}>
                #태그 검색
              </SearchButton>
            </SearchContainer>
          </Bar>
          <AddTagModal
            ref={dialogRef}
            title={'검색할 태그를 선택하세요.'}
            onConfirm={(newTags) => {
              setTags(newTags);
              handleSubmit(newTags);
            }}
          />
        </>
      ) : (
        <FilterDiv>
          <FilterTitle>나의 씨드</FilterTitle>
          <FilterBtn onClick={() => showModal()}>
            <FilterEditIcon
              src={filterEditIcon}
              alt="filter edit icon"
            ></FilterEditIcon>
            {filterName}
          </FilterBtn>
          <TagFilterModal
            ref={dialogRef}
            // onSave={(modalData) => {
            //   addCustomCondition(modalData);
            // }}
          />
        </FilterDiv>
      )}
    </Main>
  );
}

const Option = styled.div`
  cursor: pointer;
  font-weight: ${(props) => (props.$isSelected ? 700 : 400)};
`;

const Main = styled.div`
  position: relative;
  padding-top: 83px;
  padding-bottom: 70px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 44px;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryName = styled.span`
  font-weight: 400;
  font-size: 30px;
  margin-left: 11px;
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
  border-radius: 25px;
  margin-right: 100px;
  background-color: (0, 0, 0, 0.3);
  border: 1px solid #9f9f9f;
  display: flex;
  position: relative;

  justify-content: space-around;
  align-items: center;
`;

const Search = styled.input`
  width: 300px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  text-align: start;
  overflow: auto;
  z-index: -1;
  font-size: 25px;

  &::placeholder {
    font-weight: 400;
    font-size: 18px;
    color: #9f9f9f;
    transform: translateY(-4px);
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 110px;
  height: 40px;
  padding: 10px 20px;
  border: 0;
  border-radius: 40.32px;
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: 500;
  color: #9f9f9f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 53px;
`;

const FilterDiv = styled.div`
  display: block;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 44px;
`;

const FilterBtn = styled.button`
  margin-top: 50px;
  width: 165px;
  height: 44px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  background-color: #def3f1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 550;
  padding: 9px 2.5px;
`;

const FilterEditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 13px;
`;

export default ContentHeader;
