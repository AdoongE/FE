import styled from 'styled-components';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '@iconify/react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { axiosInstance } from 'apis/axiosInstance';
import { useCategories } from '../../CategoryContext';

const Category = ({
  setActiveTab,
  setCategoryId,
  setCateName,
  categoryCounts,
  setIsModalOpen,
  setOpenDropdown,
  // categories,
  // setCategories,
}) => {
  const { categories, setCategories } = useCategories();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [hoveredCategoryIndex] = useState(null);
  // const [categories, setCategories] = useState([]);
  const [bookmarks] = useState([]);
  // const [draggingIndex, setDraggingIndex] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [bookcateIds] = useState([]);

  const handleViewCategory = async (source) => {
    console.log('당근당근', categories);
    if (source === 'click') {
      setIsCategoryOpen((prev) => {
        if (!prev) {
          console.log('카테고리를 처음 열었따!'); // 삭제삭제
        }
        return !prev;
      });
    }

    try {
      const response = await axiosInstance.get('/api/v1/category');
      console.log('getgetget', response);
      const results = response.data.results;
      const ids = results.map((item) => item.categoryId);
      setCategoryIds(ids);
      console.log('여기는????', categories);
      const names = results.map((item) => item.name);
      setCategories(names); // 카테고리 조회 연동
      console.log('특강', categories);

      if (response.status === 200) {
        console.log('카테고리 조회 성공');
      } else {
        console.error('카테고리 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    handleViewCategory();
    console.log('환경:', categories);
  }, [categories]);

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
  // const onDragStart = (e, id, listType) => {
  //   e.dataTransfer.effectAllowed = 'move';
  //   e.dataTransfer.setData('index', String(id));
  //   e.dataTransfer.setData('listType', listType);
  //   setDraggingIndex(id);
  // };

  // const onDragDrop = (e, dropIndex, listType) => {
  //   e.preventDefault();

  //   const sourceIndex = Number(e.dataTransfer.getData('index'));
  //   const sourceListType = e.dataTransfer.getData('listType');

  //   if (sourceIndex === dropIndex && sourceListType === listType) return;

  //   if (listType === 'categories') {
  //     const updatedCategories = [...categories];
  //     const [movedItem] = updatedCategories.splice(sourceIndex, 1);
  //     updatedCategories.splice(dropIndex, 0, movedItem);
  //     setCategories(updatedCategories);
  //   } else if (listType === 'bookmarks') {
  //     const updatedBookmarks = [...bookmarks];
  //     const [movedItem] = updatedBookmarks.splice(sourceIndex, 1);
  //     updatedBookmarks.splice(dropIndex, 0, movedItem);
  //     setBookmarks(updatedBookmarks);
  //   }

  //   setDraggingIndex(null);
  // };

  // const onDragOver = (e) => {
  //   e.preventDefault();
  // };

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
    // handleViewCategory();
    console.log('응????', categories);
  }, []);

  return (
    <CategoryDiv>
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
          <>
            {categories.length === 0 && (
              <AccordionContent>카테고리를 생성하세요.</AccordionContent>
            )}
            {['카테고리'] &&
              ['카테고리'].map((category, index) => (
                <CategoryItem
                  onClick={() => handleCategoryClick(category, 'category')}
                  key={category}
                >
                  {category}
                  {` (${categoryCounts[category] || 0})`}
                  {hoveredCategoryIndex === index && (
                    <DotBox onClick={() => setOpenDropdown(index)}>
                      <MoreVertIcon />
                    </DotBox>
                  )}
                </CategoryItem>
              ))}
          </>
        )}
      </Accordion>
    </CategoryDiv>
  );
};

export default Category;

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

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0.417vw; /* 8px */

  &.category {
    width: 1.667vw; /* 32px */
    height: 1.667vw; /* 32px */
    background-color: #9f9f9f;
    border-radius: 0.365vw; /* 7px */
    position: absolute;
  }
  &.filter {
    position: absolute;
    padding-right: 0.781vw; /* 15px */
  }
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
