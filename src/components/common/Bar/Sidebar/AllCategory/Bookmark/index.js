import styled from 'styled-components';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '@iconify/react';
import { axiosInstance } from 'apis/axiosInstance';

const Bookmark = ({
  setActiveTab,
  setCategoryId,
  setCateName,
  // categoryCounts,
  setOpenBookmarkDropdowns,
}) => {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [hoveredBookdmarkIndex, setHoveredBookmarkIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [categoryIds] = useState([]);
  const [, setBookmarkIds] = useState([]);
  const [bookcateIds, setBookcateIds] = useState([]);

  const handleViewBookmark = async () => {
    setIsBookmarkOpen(!isBookmarkOpen);

    try {
      const response = await axiosInstance.get('/api/v1/bookmark');
      const results = response.data.results;
      const ids = results.map((item) => item.bookmarkId);
      setBookmarkIds(ids);
      const ids_ = results.map((item) => item.categoryId);
      setBookcateIds(ids_); // 북마크의 카테고리 id
      const names = results.map((item) => item.name);
      setBookmarks(names);

      if (response.status === 200) {
        console.log('북마크 조회 성공');
      } else {
        console.error('북마크 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  // useEffect(() => {
  //   if (isAddingBookmark || isEditModalOpen || isDeleteModalOpen) {
  //     setHoveredCategoryIndex(null);
  //     setHoveredBookmarkIndex(null);
  //   }
  // }, [isAddingBookmark, isEditModalOpen, isDeleteModalOpen]);

  useEffect(() => {
    setActiveTab('나의 씨드');
  }, [setActiveTab]);

  const handleBookmarkDotBoxClick = (index) => {
    setOpenBookmarkDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 드래그 앤 드롭
  const onDragStart = (e, id, listType) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('index', String(id));
    e.dataTransfer.setData('listType', listType);
    setDraggingIndex(id);
  };

  const onDragDrop = (e, dropIndex, listType) => {
    e.preventDefault();

    const sourceIndex = Number(e.dataTransfer.getData('index'));
    const sourceListType = e.dataTransfer.getData('listType');

    if (sourceIndex === dropIndex && sourceListType === listType) return;

    if (listType === 'categories') {
      const updatedCategories = [...categories];
      const [movedItem] = updatedCategories.splice(sourceIndex, 1);
      updatedCategories.splice(dropIndex, 0, movedItem);
      setCategories(updatedCategories);
    } else if (listType === 'bookmarks') {
      const updatedBookmarks = [...bookmarks];
      const [movedItem] = updatedBookmarks.splice(sourceIndex, 1);
      updatedBookmarks.splice(dropIndex, 0, movedItem);
      setBookmarks(updatedBookmarks);
    }

    setDraggingIndex(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (categoryName, listType) => {
    let categoryIndex, categoryId;

    if (listType === 'category') {
      categoryIndex = categories.indexOf(categoryName);
      categoryId = categoryIds[categoryIndex];
    } else if (listType === 'bookmark') {
      categoryIndex = bookmarks.indexOf(categoryName);
      categoryId = bookcateIds[categoryIndex];
    }

    if (categoryId) {
      setCategoryId(categoryId);
      setCateName(categoryName); // 메인페이지로 전달하는 카테고리 이름
      setActiveTab('카테고리');
      console.log('선택한 카테고리 ID:', categoryId);
    } else {
      console.error('해당 카테고리 ID를 찾을 수 없습니다.');
    }

    // handleViewCategory('categoryClick');
  };

  useEffect(() => {
    handleViewBookmark();
  }, []);

  return (
    <>
      <CategoryDiv>
        <Accordion>
          <AccordionTitle onClick={handleViewBookmark}>
            <Icons icon="meteor-icons:bookmark" />
            북마크
            <RightArrowIcon open={isBookmarkOpen} />
          </AccordionTitle>
          {isBookmarkOpen && (
            <>
              {bookmarks.length === 0 && (
                <AccordionContent>북마크를 추가하세요.</AccordionContent>
              )}
              {bookmarks.map((bookmark, index) => (
                <CategoryItem
                  onClick={() => handleCategoryClick(bookmark, 'bookmark')}
                  draggable
                  onDragStart={(e) => onDragStart(e, index, 'bookmarks')}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDragDrop(e, index, 'bookmarks')}
                  active={draggingIndex === index}
                  key={index}
                  onMouseEnter={() => setHoveredBookmarkIndex(index)}
                  onMouseLeave={() => setHoveredBookmarkIndex(null)}
                >
                  {bookmark}
                  {/* {` (${categoryCounts[bookmark] || 0})`} */}
                  {hoveredBookdmarkIndex === index && (
                    <DotBox onClick={() => handleBookmarkDotBoxClick(index)}>
                      <MoreVertIcon />
                    </DotBox>
                  )}
                </CategoryItem>
              ))}
            </>
          )}
        </Accordion>
      </CategoryDiv>
    </>
  );
};

export default Bookmark;

const CategoryDiv = styled.div`
  margin-top: 1.458vw; /* 28px */
`;

const Accordion = styled.div`
  margin-top: 1.667vw; /* 32px */
`;

const AccordionTitle = styled.div`
  margin: 0.521vw 1.094vw; /* 10px 21px */
  font-size: 1.042vw; /* 20px */
  font-weight: 600;
  padding: 0.521vw 0; /* 10px 0 */
  padding-left: 1.042vw; /* 20px */
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;

  &.category:hover {
    background-color: #dcdada;
    border-radius: 0.521vw; /* 10px */
  }
`;

const Icons = styled(Icon)`
  width: 1.25vw;
  height: 1.25vw;
  margin-right: 0.677vw; /* 13px */
`;

const RightArrowIcon = styled(KeyboardArrowRightIcon)`
  transition: transform 0.3s;
  transform: rotate(${({ open }) => (open ? '90deg' : '0deg')});
  width: 1.25vw; /* 24px */
  height: 1.25vw; /* 24px */
  margin-left: 0.677vw; /* 13px */
`;

const AccordionContent = styled.div`
  padding-bottom: 1.823vw; /* 35px */
  font-size: 0.833vw; /* 16px */
  color: #9f9f9f;
  margin-left: 4.063vw; /* 78px */
`;

const CategoryItem = styled.button`
  margin-bottom: 0.938vw; /* 18px */
  margin: auto;
  font-size: 1.042vw; /* 20px */
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2.917vw; /* 56px */
  width: 15.781vw; /* 303px */
  height: 2.292vw; /* 44px */
  &:hover {
    background-color: ${({ active }) => {
      return active ? 'rgba(188, 188, 188, 0.2)' : '#dcdada';
    }};
    border-radius: 0.521vw; /* 10px */
  }
`;

const DotBox = styled.div`
  width: 1.667vw; /* 32px */
  height: 1.667vw; /* 32px */
  background-color: #9f9f9f;
  border-radius: 0.365vw; /* 7px */
  margin-right: 0.417vw; /* 8px */
  display: flex;
  align-items: center;
  justify-content: center;
`;
