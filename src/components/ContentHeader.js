import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import filterEditIcon from '../assets/icons/filterEdit.png';
import { Icon } from '@iconify/react';
import AddTagModal from './modal/AddTagModal';
import EditFilterModal from './modal/EditFilterModal';
import filterIcon from '../assets/icons/filter.png';
import { axiosInstance } from './api/axios-instance';

function ContentHeader({
  setSortOrder,
  setSelectedFormat,
  categoryId,
  filterName,
  filterId,
  categoryName,
  activeTab,
  setActiveTab,
  tags = [],
  setTags,
  setFilteredData,
  setSearchState,
}) {
  const [localSelectedFormat, setLocalSelectedFormat] = useState('');
  const [selectedFormatState, setSelectedFormatState] = useState('저장형식'); // 저장형식 상태
  const [selectedFilter, setSelectedFilter] = useState('정렬');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem('recentSearches')) || [];
  });
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const dialogRef = useRef(null);
  const visibleTags = isExpanded ? tags : tags.slice(0, 4);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // YY 형식
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM 형식
    const day = String(date.getDate()).padStart(2, '0'); // DD 형식
    return `${year}.${month}.${day}`;
  };

  // 검색어 저장
  const saveSearchQuery = (query) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newSearch = { query, date: currentDate };

    // 중복 검색어 방지
    const existingSearchIndex = recentSearches.findIndex(
      (item) => item.query === query,
    );

    const updatedSearches =
      existingSearchIndex >= 0
        ? [
            newSearch,
            ...recentSearches.filter((_, i) => i !== existingSearchIndex),
          ].slice(0, 6)
        : [newSearch, ...recentSearches].slice(0, 6);

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 검색어 삭제
  const deleteSearch = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 검색 실행 로직
  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      saveSearchQuery(searchQuery.trim());
      try {
        const requestData = {
          keyword: searchQuery.trim(),
          sortOrder: selectedFilter || undefined,
          dataType: localSelectedFormat || undefined,
          tags: tags.length > 0 ? tags : undefined,
        };

        const response = await axiosInstance.post(
          '/api/v1/content/filtering',
          requestData,
        );

        const results = response.data.results || [];

        if (results.length === 0) {
          setSearchState(true); // 검색 결과 없음 상태로 설정
          setFilteredData([]); // filteredData 초기화
        } else {
          setSearchState(false); // 검색 결과 있음
          setFilteredData(
            results.map((item) => ({
              id: item.contentId || 'ID 없음',
              title: item.contentName || '제목 없음',
              categoryName: item.categoryName || [],
              tagName: item.tagName || [],
              dDay: item.dday ?? null,
              contentDateType: item.contentDateType || '타입 없음',
              thumbnailImage: item.thumbnailImage || null,
              updatedDt: item.updatedDt || '업데이트 정보 없음',
            })),
          );
        }
        setSearchQuery(''); // 입력 초기화
      } catch (error) {
        console.error('검색 실패:', error);
      }
    }
  };

  const fetchSearchResults = async (query = searchQuery) => {
    try {
      console.log('검색 요청 시작 - 키워드:', query); // 검색 키워드 확인

      const requestData = {
        keyword: query.trim(), // 검색어
        sortOrder: selectedFilter || undefined,
        dataType: localSelectedFormat || undefined,
        tags: tags.length > 0 ? tags : undefined,
      };

      const response = await axiosInstance.post(
        '/api/v1/content/filtering',
        requestData,
      );

      console.log('검색 응답 데이터:', response.data); // API 응답 확인

      const results = response.data.results.map((item) => ({
        id: item.contentId || 'ID 없음',
        title: item.contentName || '제목 없음',
        category: item.categoryName || [],
        tags: item.tagName || [],
        dDay: item.dday ?? null,
        contentDateType: item.contentDateType || '타입 없음',
        thumbnailImage: item.thumbnailImage || null,
        updatedDt: item.updatedDt || '업데이트 정보 없음',
        message: item.contentDetail || '',
      }));

      if (results.length === 0) {
        setSearchState(true); // 검색 결과 없음
        setFilteredData([]); // 빈 결과로 설정
      } else {
        setSearchState(false); // 검색 결과 있음
        setFilteredData(results); // 검색 결과 저장
      }

      console.log('검색 후 매핑된 데이터:', results);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = async (query) => {
    setSearchQuery(query); // 검색어 업데이트
    saveSearchQuery(query); // 검색어 저장

    await fetchSearchResults(query);
  };

  // 태그 검색 모달 열기
  const showModal = () => {
    dialogRef.current?.showModal();
  };

  // 저장 형식 변경
  const handleFormatChange = (option) => {
    setLocalSelectedFormat(option); // 내부 상태 업데이트
    setSelectedFormat(option); // 부모로 전달
    setSelectedFormatState(option); // 선택된 저장 형식 상태 업데이트
    setShowFormatDropdown(false); // 드롭다운 닫기
  };

  // 정렬 변경
  const handleSortChange = (option) => {
    setSelectedFilter(option); // 선택된 필터 상태 업데이트
    setSortOrder(option); // 기존 동작 유지
    setShowSortDropdown(false); // 드롭다운 닫기
  };

  // 태그 제출 처리
  const handleSubmit = () => {
    setActiveTab('검색필터');
  };

  // 태그 변경 시 처리
  useEffect(() => {
    if (tags.length > 0) {
      handleSubmit(tags);
    }
  }, [tags]);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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
                  isDefault={!localSelectedFormat}
                  width="137px"
                >
                  {selectedFormatState} {/* 선택된 저장형식 표시 */}
                  <Icon icon="uil:angle-down" style={{ marginLeft: '8px' }} />
                </DropdownButton>
                {showFormatDropdown && (
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => handleFormatChange('전체보기')}
                    >
                      전체보기
                    </DropdownItem>
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
                  isDefault={!selectedFilter}
                  width="106px"
                >
                  {selectedFilter} {/* 선택된 정렬 표시 */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                      <button
                        onClick={() => handleRecentSearchClick(search.query)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'none',
                          border: 'none',
                          padding: '0',
                          fontSize: 'inherit',
                          cursor: 'pointer',
                          color: '#666',
                        }}
                      >
                        <Icon
                          icon="ion:search-outline"
                          style={{ fontSize: '20px' }}
                        />
                        {search.query}
                      </button>
                      <div>
                        <span>{formatDate(search.date)}</span>
                        <DeleteButton onClick={() => deleteSearch(index)}>
                          X
                        </DeleteButton>
                      </div>
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
          {/* 검색 필터링 */}
          {activeTab === '검색필터' && (
            <FilterContainer>
              <ParentContainer>
                <SearchTitle>
                  <img
                    src={filterIcon}
                    style={{ width: '1.25rem', marginRight: '0.5rem' }}
                    alt="circle check icon"
                  />
                  검색 필터
                </SearchTitle>
                <TagContainer>
                  {visibleTags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                      <Icon
                        icon="ic:round-close"
                        style={{
                          width: '1.25rem',
                          marginLeft: '0.25rem',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#9f9f9f',
                        }}
                        onClick={() => removeTag(tag)}
                      />
                    </Tag>
                  ))}
                </TagContainer>
              </ParentContainer>
              <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '닫기' : '전체보기'}
              </ToggleButton>
            </FilterContainer>
          )}
        </>
      ) : (
        <FilterDiv>
          <FilterTitle>나의 씨드</FilterTitle>
          <FilterBtn onClick={() => showModal()}>
            {filterName}
            <FilterEditIcon
              src={filterEditIcon}
              alt="filter edit icon"
            ></FilterEditIcon>
          </FilterBtn>
          <EditFilterModal filterId={filterId} ref={dialogRef} />
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
  font-size: 22px;
  color: ${(props) => (props.isDefault ? '#9f9f9f' : '#333')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: ${(props) => props.width || '200px'};
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f9f9f9;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 200px;
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  font-size: 22px;
  color: ${(props) => (props.isSelected ? '#333' : '#666')};
  font-weight: ${(props) => (props.isSelected ? '700' : '400')};
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
  margin-right: 50px;
  border: 1px solid #9f9f9f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative; /* 부모 요소 기준 위치 설정 */
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
  color: black;

  &:hover {
    background-color: #21a58c;
    color: #def3f1;
  }
`;

const FilterEditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 13px;
  filter: invert(48%) sepia(59%) saturate(518%) hue-rotate(119deg)
    brightness(98%) contrast(89%);

  ${FilterBtn}:hover & {
    filter: invert(95%) sepia(7%) saturate(308%) hue-rotate(125deg)
      brightness(98%) contrast(98%);
  }
`;

const RecentSearchList = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%);
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  width: 445px;
  max-height: 315px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const RecentSearchTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 19px;
  position: relative; /* border 조정을 위해 relative 추가 */

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background-color: #eaeaea; /* 구분선 색상 */
  }
`;

const RecentSearchItem = styled.div`
  display: flex;
  justify-content: space-between; /* 검색어와 오른쪽 요소를 양쪽 정렬 */
  align-items: center;
  padding: 15px 19px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #666;

  & > span {
    display: flex;
    align-items: center;
    gap: 16px; /* 아이콘과 텍스트 간격 */
  }

  /* 오른쪽 영역 (날짜와 삭제 버튼) */
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 오른쪽 정렬 */
    gap: 6px; /* 날짜와 삭제 버튼 간 간격 */
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// 검색 필터 스타일
const FilterContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 632px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  /* align-items: flex-start; */
  margin-top: 24px;
  padding: 4px 16px;
  transition: height 0.3s ease;
  overflow: hidden;
`;

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const SearchTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #9f9f9f;
  display: flex;
  align-items: center;
  /* flex-shrink: 0; */
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #9f9f9f;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  /* flex-shrink: 0; */

  &:after {
    content: '';
    display: block;
    width: calc(100% - 10px);
    height: 1px;
    background-color: #9f9f9f;
    position: absolute;
    left: 5px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: hidden;
  width: 428px;
`;

const Tag = styled.div`
  padding: 3px 12px;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 16px;
  color: #4f4f4f;
  display: inline-flex;
  height: 34.33px;
  justify-content: center;
  align-items: center;
`;

export default ContentHeader;
