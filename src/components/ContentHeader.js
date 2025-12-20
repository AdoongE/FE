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
  setKeyword,
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

  const [filteredData, setFilteredDataState] = useState([]);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // YY 형식
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM 형식
    const day = String(date.getDate()).padStart(2, '0'); // DD 형식
    return `${year}.${month}.${day}`;
  };

  const recentSearchesRef = useRef(null);

  const handleBlur = (e) => {
    if (
      recentSearchesRef.current &&
      recentSearchesRef.current.contains(e.relatedTarget)
    ) {
      return;
    }
    setShowRecentSearches(false);
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

  // 공통 API 호출 함수
  const fetchSearchResults = async (query) => {
    try {
      console.log('검색 요청 시작 - 키워드:', query); // 검색 키워드 확인

      const requestData = {
        keyword: query.trim(), // 검색어
        sortOrder: selectedFilter || undefined,
        seedType: localSelectedFormat || undefined,
        tags: tags.length > 0 ? tags : undefined,
      };

      const response = await axiosInstance.post(
        '/api/v1/seed/filtering',
        requestData,
      );

      console.log('검색 응답 데이터:', response.data); // API 응답 확인

      const results = response.data.results[0].seedInfoList.map((item) => ({
        id: item.seedId || 'ID 없음',
        seedName: item.seedName || '제목 없음',
        categoryName: item.categoryName || [],
        tagName: item.tagName || [],
        dDay: item.dDay ?? null,
        seedType: item.seedType || '타입 없음',
        thumbnailImage: item.thumbnailImage || null,
        updatedDt: item.updatedDt || '업데이트 정보 없음',
        seedDetail: item.seedDetail || '',
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

  // 엔터 키를 눌렀을 때 실행되는 함수
  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setKeyword(searchQuery.trim()); // 부모(MainPage)의 keyword 업데이트
      saveSearchQuery(searchQuery.trim()); // 최근 검색어 저장
      await fetchSearchResults(searchQuery.trim()); // 공통 검색 함수 호출
    }
  };

  // 최근 검색어 클릭 시 실행되는 함수
  const handleRecentSearchClick = async (query) => {
    setSearchQuery(query); // 검색어 업데이트
    setKeyword(query);
    saveSearchQuery(query); // 검색어 저장
    await fetchSearchResults(query); // 공통 검색 함수 호출
    setShowRecentSearches(false);

    // 결과가 없으면 빈 콘텐츠 화면으로 설정
    if (!filteredData || filteredData.length === 0) {
      setSearchState(true); // 검색 결과 없음
      setFilteredDataState([]); // 빈 결과 설정
    }
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
    if (tags.length === 1) {
      setActiveTab('나의 씨드'); // 검색 필터링 태그 모두 삭제하면, 회색 박스 없애기
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFormatDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFormatDropdown, showSortDropdown]);

  return (
    <Main>
      {filterId === null ? (
        <>
          <Title>
            {categoryId ? (
              <>
                나의 씨드{' '}
                <Icon
                  icon="uil:angle-right"
                  fontSize={28}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
                <CategoryName>{categoryName}</CategoryName>
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
                  context="saveFormat"
                  onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                  isDefault={!localSelectedFormat}
                >
                  {selectedFormatState} {/* 선택된 저장형식 표시 */}
                  <Icon icon="uil:angle-down" fontSize={18} />
                </DropdownButton>
                {showFormatDropdown && (
                  <DropdownMenu ref={dropdownRef}>
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
                  context="sort"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  isDefault={!selectedFilter}
                >
                  {selectedFilter} {/* 선택된 정렬 표시 */}
                  <Icon icon="uil:angle-down" fontSize={18} />
                </DropdownButton>
                {showSortDropdown && (
                  <DropdownMenu ref={dropdownRef}>
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
                  width: '18px',
                  height: '18px',
                  marginLeft: '8px',
                  color: 'black',
                }}
              />
              <Search
                placeholder="찾고 싶은 콘텐츠를 검색하세요."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress} // 엔터 키 누를 때 실행
                onFocus={() => setShowRecentSearches(true)} // 검색바 클릭 시 최근 검색어 표시
                onBlur={handleBlur}
              />
              <SearchButton type="button" onClick={() => showModal()}>
                #태그 검색
              </SearchButton>
              {showRecentSearches && recentSearches.length > 0 && (
                <RecentSearchList ref={recentSearchesRef}>
                  <RecentSearchTitle>최근 검색어</RecentSearchTitle>
                  {recentSearches.map((search, index) => (
                    <RecentSearchItem key={index}>
                      <button
                        onClick={() => handleRecentSearchClick(search.query)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'none',
                          border: 'none',
                          fontSize: 'inherit',
                          cursor: 'pointer',
                          color: '#666',
                        }}
                      >
                        <Icon
                          icon="ion:search-outline"
                          style={{ fontSize: 16 }}
                        />
                        {search.query}
                      </button>
                      <div>
                        <span>{formatDate(search.date)}</span>
                        <DeleteButton onClick={() => deleteSearch(index)}>
                          <Icon icon="mdi:close" />
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
          {activeTab === '검색필터' && tags.length > 0 && (
            <FilterContainer>
              <ParentContainer>
                <SearchTitle>
                  <img
                    src={filterIcon}
                    style={{ width: '16px', marginRight: '5px' }}
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
                          width: '16px',
                          marginLeft: '5px',
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
            <FilterName>{filterName}</FilterName>
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
  padding-top: 35px;
  padding-bottom: 44px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 28px;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryName = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: #666;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #9f9f9f;
  border-radius: 8px;
  font-size: 12px;
  color: var(--gray2);
  cursor: pointer;
  padding: 7px 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: ${({ context }) => (context === 'saveFormat' ? '96px' : '83px')};
`;

const DropdownMenu = styled.div`
  width: 100%;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 12px 33px 12px 16px;
  color: ${(props) => (props.isSelected ? '#333' : '#666')};
  font-size: 12px;
  font-weight: ${(props) => (props.isSelected ? '700' : '400')};
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    color: #21a58c;
    font-weight: 700;
  }
`;

const SearchContainer = styled.div`
  width: 370px;
  height: 36px;
  border-radius: 18.75px;
  margin-right: 40px;
  border: 0.75px solid var(--gray2);
  background-color: rgb(251, 251, 251);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const Search = styled.input`
  width: 220px;
  border: none;
  text-align: start;
  font-size: 12px;
  background-color: transparent;
  &::placeholder {
    font-size: 12px;
    color: #9f9f9f;
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 78px;
  height: 28px;
  border: 0;
  border-radius: 30.242px;
  font-size: 12px;
  color: #9f9f9f;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
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
  font-size: 28px;
`;

const FilterBtn = styled.button`
  margin-top: 50px;
  height: 36px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #def3f1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  gap: 12px;

  &:hover {
    background-color: #21a58c;
    color: #def3f1;
  }
`;

const FilterName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilterEditIcon = styled.img`
  width: 16px;
  height: 16px;
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
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 4px;
  width: 370px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.16);
  z-index: 10;
  height: auto;
`;

const RecentSearchTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 16px;
  position: relative;
  color: #4f4f4f;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background-color: #eaeaea;
  }
`;

const RecentSearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 14px;
  margin: 14px 4px;
  font-size: 12px;
  color: #9f9f9f;

  & > span {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2px;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #9f9f9f;
  margin-left: 8px;
  display: flex;
`;

// 검색 필터 스타일
const FilterContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 8px;
  width: 560px;
  min-height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  padding: 4px 16px;
  transition: height 0.3s ease;
  overflow: hidden;
`;

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchTitle = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: #9f9f9f;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #9f9f9f;
  cursor: pointer;
  position: relative;
  font-size: 12px;

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
  width: 22.292vw;
`;

const Tag = styled.div`
  display: inline-flex;
  padding: 7px 8px;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 12px;
  color: #4f4f4f;
  justify-content: center;
  align-items: center;
`;

export default ContentHeader;
