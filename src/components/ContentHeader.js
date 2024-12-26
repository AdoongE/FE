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
  // 상태 관리
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem('recentSearches')) || [];
  });
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [tags, setTags] = useState([]);
  const dialogRef = useRef(null);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // YY 형식
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM 형식
    const day = String(date.getDate()).padStart(2, '0'); // DD 형식
    return `${year}.${month}.${day}`;
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // 검색어 상태 업데이트
  };

  // 검색어 저장
  const saveSearchQuery = (query) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newSearch = { query, date: currentDate };

    const updatedSearches = [newSearch, ...recentSearches].slice(0, 6); // 최대 6개 저장
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 검색어 삭제
  const deleteSearch = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Enter로 검색
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      saveSearchQuery(searchQuery.trim());
      setSearchQuery(''); // 검색 후 입력값 초기화
    }
  };

  // 태그 검색 모달 열기
  const showModal = () => {
    dialogRef.current?.showModal();
  };

  // 정렬 변경
  const handleSortChange = (option) => {
    setSelectedFilter(option);
    setSortOrder(option);
    setShowSortDropdown(false);
  };

  // 저장 형식 변경
  const handleFormatChange = (option) => {
    setSelectedFormat(option);
    setShowFormatDropdown(false);
  };

  // 태그 제출 처리
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

  // 태그 변경 시 처리
  useEffect(() => {
    if (tags.length > 0) {
      handleSubmit(tags);
    }
  }, [tags]);

  // 태그 상태 로그 확인
  useEffect(() => console.log('선택한 태그: ', tags), [tags]);

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
            {/* 필터 옵션 */}
            <DropdownContainer>
              <Dropdown>
                <DropdownButton
                  onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                  isDefault={
                    !selectedFormat
                  } /* 값이 선택되지 않았을 때 연한 색상 적용 */
                  width="137px"
                >
                  저장형식{' '}
                  <Icon icon="uil:angle-down" style={{ marginLeft: '8px' }} />
                </DropdownButton>
                {showFormatDropdown && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleFormatChange('링크')}>
                      링크
                    </DropdownItem>
                    <DropdownItem onClick={() => handleFormatChange('이미지')}>
                      이미지
                    </DropdownItem>
                    <DropdownItem onClick={() => handleFormatChange('PDF')}>
                      PDF
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>

              <Dropdown>
                <DropdownButton
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  isDefault={
                    !selectedFilter
                  } /* 값이 선택되지 않았을 때 연한 색상 적용 */
                  width="106px"
                >
                  정렬{' '}
                  <Icon icon="uil:angle-down" style={{ marginLeft: '8px' }} />
                </DropdownButton>
                {showSortDropdown && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleSortChange('최신순')}>
                      최신순
                    </DropdownItem>
                    <DropdownItem onClick={() => handleSortChange('이름순')}>
                      이름순
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </DropdownContainer>
            {/* 검색 영역 */}
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
              <Search
                placeholder="찾고 싶은 콘텐츠를 검색하세요."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => setShowRecentSearches(true)} // 검색바 클릭 시 최근 검색어 표시
                onBlur={() =>
                  setTimeout(() => setShowRecentSearches(false), 200)
                } // 클릭 해제 시 숨기기
              />
              <SearchButton type="button" onClick={() => showModal()}>
                #태그 검색
              </SearchButton>
              {showRecentSearches && (
                <RecentSearchList>
                  <RecentSearchTitle>최근 검색어</RecentSearchTitle>
                  {recentSearches.map((search, index) => (
                    <RecentSearchItem key={index}>
                      <span>{search.query}</span>
                      <span>{formatDate(search.date)}</span>
                      <DeleteButton onClick={() => deleteSearch(index)}>
                        X
                      </DeleteButton>
                    </RecentSearchItem>
                  ))}
                </RecentSearchList>
              )}
            </SearchContainer>
          </Bar>
          {/* 태그 검색 모달 */}
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
          <TagFilterModal ref={dialogRef} />
        </FilterDiv>
      )}
    </Main>
  );
}

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

const DropdownContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 22px; /* 글씨 크기 */
  color: ${(props) =>
    props.isDefault ? '#9f9f9f' : '#333'}; /* 기본값일 때 연한 색상 */
  cursor: pointer;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 텍스트를 중앙에 정렬 */
  height: 48px; /* 버튼 높이 */
  width: ${(props) => props.width || '200px'}; /* 버튼 너비 */
  position: relative; /* 화살표를 절대 위치로 배치하기 위해 설정 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f9f9f9;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px); /* 버튼 아래에 여백 추가 */
  left: 0;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 200px; /* 메뉴 너비를 버튼과 동일하게 설정 */
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  font-size: 22px;
  color: ${(props) =>
    props.isSelected ? '#333' : '#666'}; /* 선택된 항목 진하게 */
  font-weight: ${(props) =>
    props.isSelected ? '700' : '400'}; /* 선택된 항목 진하게 */
  cursor: pointer;
  text-align: left;
  height: 48px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SearchContainer = styled.div`
  width: 493px;
  height: 50px;
  border-radius: 25px;
  margin-right: 100px;
  background-color: (0, 0, 0, 0.3);
  border: 1px solid #9f9f9f;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Search = styled.input`
  width: 300px;
  border: none;
  text-align: start;
  font-size: 25px;
  &::placeholder {
    font-size: 18px;
    color: #9f9f9f;
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 110px;
  height: 40px;
  border: 0;
  border-radius: 40.32px;
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: 500;
  color: #9f9f9f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 80px;
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
`;

const FilterEditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 13px;
`;

const RecentSearchList = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

const RecentSearchTitle = styled.div`
  font-weight: bold;
  padding: 10px;
`;

const RecentSearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  font-size: 18px;
  color: #333;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 16px;
  cursor: pointer;
`;

export default ContentHeader;
