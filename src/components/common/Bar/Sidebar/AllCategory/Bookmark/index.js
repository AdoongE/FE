import { useState, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { axiosInstance } from 'apis/axiosInstance';
import {
  Accordion,
  AccordionTitle,
  Icons,
  RightArrowIcon,
  CategoryList,
  AccordionContent,
  CategoryItem,
  DotBox,
} from '../style';

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
    <Accordion>
      <AccordionTitle onClick={handleViewBookmark}>
        <Icons icon="meteor-icons:bookmark" />
        북마크
        <RightArrowIcon open={isBookmarkOpen} />
      </AccordionTitle>
      {isBookmarkOpen && (
        <CategoryList>
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
        </CategoryList>
      )}
    </Accordion>
  );
};

export default Bookmark;
