import { useState, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { axiosInstance } from 'apis/axiosInstance';
import { useCategories } from '../../CategoryContext';
import {
  Accordion,
  AccordionTitle,
  Icons,
  RightArrowIcon,
  AddButton,
  CategoryList,
  AccordionContent,
  CategoryItem,
  DotBox,
} from '../style';

const Category = ({
  setActiveTab,
  setCategoryId,
  setCateName,
  // categoryCounts, // 이후에 메인페이지에서 가져옴
  setIsModalOpen,
  setOpenDropdown,
}) => {
  const { categories, setCategories } = useCategories();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [bookmarks] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [bookcateIds] = useState([]);

  const handleViewCategory = async (source) => {
    if (source === 'click') {
      setIsCategoryOpen((prev) => {
        if (!prev) {
          console.log('카테고리를 처음 열었따!');
        }
        return !prev;
      });
    }

    try {
      const response = await axiosInstance.get('/api/v1/category');
      const results = response.data.results;
      const ids = results.map((item) => item.categoryId);
      setCategoryIds(ids);
      const names = results.map((item) => item.name);
      setCategories(names); // 카테고리 조회 연동

      if (response.status === 200) {
        console.log('카테고리 조회 성공');
      } else {
        console.error('카테고리 조회 실패');
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

  const openModal = () => {
    setIsModalOpen(true);
    setIsCategoryOpen(true);
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
    }
    // else if (listType === 'bookmarks') {
    //   const updatedBookmarks = [...bookmarks];
    //   const [movedItem] = updatedBookmarks.splice(sourceIndex, 1);
    //   updatedBookmarks.splice(dropIndex, 0, movedItem);
    //   setBookmarks(updatedBookmarks);
    // }

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

    handleViewCategory('categoryClick');
  };

  useEffect(() => {
    handleViewCategory();
  }, []);

  return (
    <Accordion>
      <AccordionTitle
        className="category"
        onClick={() => handleViewCategory('click')}
        onMouseEnter={() => setHoveredCategory(true)}
        onMouseLeave={() => setHoveredCategory(false)}
      >
        <Icons icon="ion:grid-outline" />
        {`내 카테고리`}
        <RightArrowIcon open={isCategoryOpen} />
        {hoveredCategory && (
          <AddButton className="category" onClick={openModal}>
            <AddRoundedIcon />
          </AddButton>
        )}
      </AccordionTitle>
      {isCategoryOpen && (
        <CategoryList>
          {categories.length === 0 && (
            <AccordionContent>카테고리를 생성하세요.</AccordionContent>
          )}
          {categories &&
            categories.map((category, index) => (
              <CategoryItem
                onClick={() => handleCategoryClick(category, 'category')}
                draggable
                onDragStart={(e) => onDragStart(e, index, 'categories')}
                onDragOver={onDragOver}
                onDrop={(e) => onDragDrop(e, index, 'categories')}
                active={draggingIndex === index}
                key={index}
                onMouseEnter={() => setHoveredCategoryIndex(index)}
                onMouseLeave={() => setHoveredCategoryIndex(null)}
              >
                {category}
                {/* {` (${categoryCounts[category] || 0})`} */}
                {hoveredCategoryIndex === index && (
                  <DotBox onClick={() => setOpenDropdown(index)}>
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

export default Category;
