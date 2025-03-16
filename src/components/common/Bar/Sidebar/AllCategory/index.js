import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import AddCategoryModal from '../Modal/AddCategoryModal';
import EditCategoryModal from '../Modal/EditCategoryModal';
import RemoveCategoryModal from '../Modal/RemoveCategoryModal';
import Dropdown from '../Dropdown/CategoryDropdown';

import Bookmark from './Bookmark/index';
import Category from './Category/index';
import { useCategories } from '../CategoryContext';
import { CategoryP } from './style';

const AllCategory = ({ setActiveTab }) => {
  const { categories, setCategories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [categoryIds] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [editIds, setEditIds] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openBookmarkDropdowns, setOpenBookmarkDropdowns] = useState({});
  // const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [, setIsAddingBookmark] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [, setCateName] = useState('');

  // useEffect(() => {
  //   if (isAddingBookmark || isEditModalOpen || isDeleteModalOpen) {
  //     setHoveredCategoryIndex(null);
  //     setHoveredBookmarkIndex(null);
  //   }
  // }, [isAddingBookmark, isEditModalOpen, isDeleteModalOpen]);

  useEffect(() => {
    setActiveTab('나의 씨드');
  }, [setActiveTab]);

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  const handleConfirm = (newCategoryName) => {
    if (!newCategoryName) return;
    setCategories([...categories, newCategoryName]);
    closeModal();
  };

  const handleBookmarkAdd = async (categoryName) => {
    // const categoryIndex = categories.indexOf(categoryName);
    // const categoryId = categoryIds[categoryIndex];

    if (!bookmarks.includes(categoryName)) {
      setBookmarks([...bookmarks, categoryName]);
    }
    setIsAddingBookmark(true);
    console.log(`Bookmark added: Category ID = ${categoryId}`);

    try {
      const response = await axiosInstance.post(
        `/api/v1/category/${categoryId}/bookmark`,
      );
      if (response.status === 200) {
        console.log('북마크 생성 성공');
      } else {
        console.error('북마크 생성 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleEditCategory = (categoryName) => {
    setEditCategoryName(categoryName);
    setEditModalOpen(true);
    const categoryIndex = categories.indexOf(categoryName);
    const editId = categoryIds[categoryIndex];
    setEditIds(editId);
  };

  const handleRemoveCategory = (categoryNameToRemove) => {
    setCategoryName(categoryNameToRemove);
    setDeleteModalOpen(true);
  };

  const handleConfirmEdit = (newCategoryName) => {
    const updatedCategories = categories.map((category) =>
      category === editCategoryName ? newCategoryName : category,
    );
    setCategories(updatedCategories);

    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark === editCategoryName ? newCategoryName : bookmark,
    );
    setBookmarks(updatedBookmarks);
    setEditModalOpen(false);
  };
  const handleConfirmRemove = async (categoryId, categoryName) => {
    const updatedCategories = categories.filter(
      (category) => category !== categoryName,
    );
    setCategories(updatedCategories);

    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark !== categoryName,
    );
    setBookmarks(updatedBookmarks);

    const updatedBookmarkIds = bookmarkIds.filter((id) => id !== categoryId);
    setBookmarkIds(updatedBookmarkIds);

    setDeleteModalOpen(false);

    try {
      const response = await axiosInstance.delete(
        `/api/v1/category/${categoryId}`,
      );
      if (response.status === 200) {
        console.log('카테고리 삭제 성공');
      } else {
        console.error('카테고리 삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleBookmarkRemove = async (category) => {
    const bookmarkIndex = bookmarks.indexOf(category);
    const bookmarkId = bookmarkIds[bookmarkIndex];
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((item) => item !== category),
    );
    console.log(`Bookmark remove: bookmark ID = ${bookmarkId}`);

    try {
      const response = await axiosInstance.delete(
        `/api/v1/bookmark/${bookmarkId}`,
      );
      if (response.status === 200) {
        console.log('북마크 삭제 성공');
      } else {
        console.error('북마크 삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleBookmarkCloseDropdown = (index) => {
    setOpenBookmarkDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <>
      <CategoryDiv>
        <CategoryP>모든 카테고리 ({categoryIds.length})</CategoryP>
        <Bookmark
          setActiveTab={setActiveTab}
          setIsModalOpen={setIsModalOpen}
          setOpenBookmarkDropdowns={setOpenBookmarkDropdowns}
          setBookmarkIds={setBookmarkIds}
        />
        <Category
          setActiveTab={setActiveTab}
          setCategoryId={setCategoryId}
          categoryIds={categoryIds}
          setCategoryIds={setCategoryIds}
          setCateName={setCateName}
          // categoryCounts={categoryCounts} // 이후 메인페이지
          setIsModalOpen={setIsModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      </CategoryDiv>
      {isModalOpen && (
        <AddCategoryModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
      {isEditModalOpen && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialCategoryName={editCategoryName}
          onConfirm={handleConfirmEdit}
          categoryId={editIds}
        />
      )}
      {isDeleteModalOpen && (
        <RemoveCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          categoryId={categoryIds[categories.indexOf(categoryName)]}
          categoryName={categoryName}
          onConfirm={handleConfirmRemove}
        />
      )}

      {categories?.map((category, index) => (
        <>
          {openDropdown === index && (
            <Dropdown
              isOpen={openDropdown === index}
              onClose={() => setOpenDropdown(null)}
              categoryName={category}
              categoryLength={category.length}
              onBookmarkAdd={handleBookmarkAdd}
              onEditCategory={handleEditCategory}
              onRemoveCategory={handleRemoveCategory}
            />
          )}
        </>
      ))}

      {bookmarks?.map((bookmark, index) => (
        <>
          {openBookmarkDropdowns[index] && (
            <Dropdown
              isOpen={openBookmarkDropdowns[index]}
              onClose={() => handleBookmarkCloseDropdown(index)} // 이거 바꾸는 거 고려해보자
              categoryName={bookmark}
              categoryLength={bookmark.length}
              isBookmarked={bookmarks.includes(bookmark)}
              onBookmarkAdd={handleBookmarkAdd}
              onBookmarkRemove={handleBookmarkRemove}
              onEditCategory={handleEditCategory}
              onRemoveCategory={handleRemoveCategory}
            />
          )}
        </>
      ))}
    </>
  );
};

export default AllCategory;

const CategoryDiv = styled.div``;
