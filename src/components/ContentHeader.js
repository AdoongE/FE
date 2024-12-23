import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddTagModal from './modal/AddTagModal';

function ContentHeader({ setSortOrder, categoryId, categoryName }) {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const handleSortChange = (option) => {
    setSelectedFilter(option);
    setSortOrder(option);
    setShowSortDropdown(false);
  };

  const handleFormatChange = (option) => {
    setSelectedFormat(option);
    setShowFormatDropdown(false);
  };

  return (
    <Main>
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
        <DropdownContainer>
          <Dropdown>
            <DropdownButton
              onClick={() => setShowFormatDropdown(!showFormatDropdown)}
              isDefault={
                !selectedFormat
              } /* 값이 선택되지 않았을 때 연한 색상 적용 */
              width="137px"
            >
              {selectedFormat || '저장형식'} ▼
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
              {selectedFilter || '정렬'} ▼
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
      <AddTagModal ref={dialogRef} title={'검색할 태그를 선택하세요.'} />
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

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 53px;
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
  color: #333;
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
  z-index: 1;
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
  z-index: 2;
`;

export default ContentHeader;
