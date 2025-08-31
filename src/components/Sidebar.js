import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import seedIcon from '../assets/icons/seed_sidebar.png';
import reminderIcon from '../assets/icons/reminder_sidebar.png';
import circleCheckIcon from '../assets/icons/circleCheck.png';
import ArrowRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from '../components/dropdown/CategoryDropdown';
import FilterDropdown from '../components/dropdown/FilterDropdown';
import { Icon } from '@iconify/react';
import AddCategoryModal from '../components/modal/AddCategoryModal';
import EditCategoryModal from '../components/modal/EditCategoryModal';
import RemoveCategoryModal from '../components/modal/RemoveCategoryModal';
import TagFilterModal from '../components/modal/TagFilterModal';
import { axiosInstance } from './api/axios-instance';
import { font } from '../styles/font';

const Sidebar = ({
  setCategoryId,
  setFilterId,
  setCateName,
  setFilterName,
  categoryCounts,
  activeTab,
  setActiveTab,
}) => {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [hoveredBookdmarkIndex, setHoveredBookmarkIndex] = useState(null);
  const [hoveredFilterIndex, setHoveredFilterIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openBookmarkDropdowns, setOpenBookmarkDropdowns] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [bookcateIds, setBookcateIds] = useState([]);
  const [editIds, setEditIds] = useState([]);
  const [customFilter, setCustomFilter] = useState([]);
  const [customFilterIds, setCustomFilterIds] = useState([]);
  const [message, setMessage] = useState('');

  const handleViewCategory = async (source) => {
    if (source === 'click') {
      setIsCategoryOpen((prev) => !prev);
    }

    try {
      const response = await axiosInstance.get('/api/v1/category');
      const results = response.data.results;
      const ids = results.map((item) => item.categoryId);
      setCategoryIds(ids);
      const names = results.map((item) => item.name);
      setCategories(names); // 카테고리 조회 연동

      console.log('카테고리 조회 성공');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  const handleViewBookmark = async (source) => {
    if (source === 'click') {
      setIsBookmarkOpen((prev) => !prev);
    }

    try {
      const response = await axiosInstance.get(
        '/api/v1/bookmark/category/bookmark',
      );
      const results = response.data.results;
      const ids = results.map((item) => item.bookmarkId);
      setBookmarkIds(ids);
      const ids_ = results.map((item) => item.categoryId);
      setBookcateIds(ids_); // 북마크의 카테고리 id
      const names = results.map((item) => item.name);
      setBookmarks(names);

      console.log('북마크 조회 성공');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    if (isAddingBookmark || isEditModalOpen || isDeleteModalOpen) {
      setHoveredCategoryIndex(null);
      setHoveredBookmarkIndex(null);
    }
  }, [isAddingBookmark, isEditModalOpen, isDeleteModalOpen]);

  useEffect(() => {
    setActiveTab('나의 씨드');
  }, [setActiveTab]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  const handleConfirm = (newCategoryName) => {
    if (!newCategoryName) return;
    handleViewCategory();
    closeModal();
  };

  const handleBookmarkAdd = async (categoryName) => {
    const categoryIndex = categories.indexOf(categoryName);
    const categoryId = categoryIds[categoryIndex];
    setIsAddingBookmark(true);

    try {
      const response = await axiosInstance.post(
        `/api/v1/bookmark/category/${categoryId}`,
      );
      console.log('북마크 추가 성공', response.data.results);
      await handleViewBookmark();
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setIsAddingBookmark(false);
    }
  };

  const handleEditCategory = (categoryName) => {
    setEditCategoryName(categoryName);
    setEditModalOpen(true);
    const categoryIndex = categories.indexOf(categoryName);
    const editId = categoryIds[categoryIndex];
    setEditIds(editId);
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

  const handleBookmarkDotBoxClick = (index) => {
    setOpenBookmarkDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleBookmarkCloseDropdown = (index) => {
    setOpenBookmarkDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
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
        `/api/v1/bookmark/category/${bookmarkId}`,
      );
      console.log('북마크 삭제 성공', response.data.results);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleRemoveCategory = (categoryNameToRemove) => {
    setCategoryName(categoryNameToRemove);
    setDeleteModalOpen(true);
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
      await axiosInstance.delete(`/api/v1/category/${categoryId}`);
      console.log('카테고리 삭제 성공');
    } catch (error) {
      console.error('에러 발생:', error);
    }
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

  const handleTabClick = (tabName) => {
    if (tabName === '리마인더') {
      // "리마인더" 클릭 시 activeTab을 "리마인더"로 변경
      setActiveTab('리마인더');
    } else if (tabName === '나의 씨드') {
      // "나의 씨드" 클릭 시 페이지 새로고침
      setActiveTab('나의 씨드');
      window.location.reload(); // 페이지 새로고침
    }
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

  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const addCustomCondition = async (modalData) => {
    const newCondition = `맞춤 조건 ${customFilter.length + 1}`;

    try {
      const response = await axiosInstance.post('api/v1/filter', {
        name: newCondition,
        ...modalData,
      });
      if (response.status === 200) {
        console.log('맞춤 필터 생성 성공');
        CustomFilterView();
      } else {
        console.error('맞춤 필터 생성 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleEditFilter = (index, newConditionName) => {
    setCustomFilter((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index ? newConditionName : condition,
      ),
    );
  };

  const handleRemoveFilter = (index) => {
    setCustomFilter((prevConditions) =>
      prevConditions.filter((_, i) => i !== index),
    );
  };

  const CustomFilterClick = async (condition) => {
    const filterIndex = customFilter.indexOf(condition);
    const filterId = customFilterIds[filterIndex];

    setFilterName(condition);
    setActiveTab('맞춤필터');
    setFilterId(filterId);
    setMessage(`${condition}이 적용되었습니다.`);
    setTimeout(() => setMessage(''), 2000);
  };

  const CustomFilterView = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/filter');

      const filterId = response.data.results.map((item) => item.id);
      const filterNames = response.data.results.map((item) => item.name);
      setCustomFilterIds(filterId);
      setCustomFilter(filterNames);

      if (response.status === 200) {
        console.log('Custom 필터 조회 성공:');
      } else {
        console.error('Custom 필터 조회 실패:', response.data);
      }
    } catch (error) {
      console.error('Custom 필터 조회 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleViewCategory();
    handleViewBookmark();
    CustomFilterView();
  }, []);

  return (
    <StMainPage>
      <SideDiv>
        <BtnDiv>
          <CollectBtn
            active={activeTab === '나의 씨드'}
            onClick={() => handleTabClick('나의 씨드')}
          >
            <ImgIcon src={seedIcon} alt="seed icon" />
            나의 씨드
          </CollectBtn>
          <ManageBtn
            active={activeTab === '리마인더'}
            onClick={() => handleTabClick('리마인더')}
          >
            <ImgIcon src={reminderIcon} alt="reminder icon" />
            리마인더
          </ManageBtn>
        </BtnDiv>
        <Line />
        <CategoryDiv>
          <CategoryP>모든 카테고리 ({categoryIds.length})</CategoryP>
          <Accordion>
            <AccordionTitle onClick={() => handleViewBookmark('click')}>
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
                    {` (${categoryCounts[bookmark] || 0})`}
                    {hoveredBookdmarkIndex === index && (
                      <DotBox onClick={() => handleBookmarkDotBoxClick(index)}>
                        <MoreVertIcon />
                      </DotBox>
                    )}
                    {openBookmarkDropdowns[index] && (
                      <Dropdown
                        isOpen={openBookmarkDropdowns[index]}
                        onClose={() => handleBookmarkCloseDropdown(index)}
                        categoryName={bookmark}
                        categoryLength={bookmark.length}
                        isBookmarked={bookmarks.includes(bookmark)}
                        onBookmarkAdd={handleBookmarkAdd}
                        onBookmarkRemove={handleBookmarkRemove}
                        onEditCategory={handleEditCategory}
                        onRemoveCategory={handleRemoveCategory}
                      />
                    )}
                  </CategoryItem>
                ))}
              </CategoryList>
            )}

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
                <AddButton
                  className="category"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                >
                  <AddRoundedIcon />
                </AddButton>
              )}
            </AccordionTitle>
            {isCategoryOpen && (
              <>
                {categories.length === 0 && (
                  <AccordionContent>카테고리를 생성하세요.</AccordionContent>
                )}
                <CategoryList>
                  {categories.map((category, index) => (
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
                      {` (${categoryCounts[category] || 0})`}
                      {hoveredCategoryIndex === index && (
                        <DotBox
                          onClick={(e) => {
                            setOpenDropdown(index);
                            e.stopPropagation();
                          }}
                        >
                          <MoreVertIcon />
                        </DotBox>
                      )}
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
                    </CategoryItem>
                  ))}
                </CategoryList>
              </>
            )}
          </Accordion>
        </CategoryDiv>
        {/* 카데고리 추가 모달 창 */}
        {isModalOpen && (
          <AddCategoryModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirm}
            categories={categories}
          />
        )}
        {/* 편집 모달 창 */}
        {categories.map((category) => (
          <Dropdown
            key={category}
            categoryName={category}
            onEditCategory={handleEditCategory}
          />
        ))}
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialCategoryName={editCategoryName}
          onConfirm={handleConfirmEdit}
          categoryId={editIds}
          categories={categories}
        />
        {/* 삭제 모달 창 */}
        {categories.map((category) => (
          <Dropdown
            key={category}
            categoryName={category}
            onRemoveCategory={handleRemoveCategory}
          />
        ))}
        {isDeleteModalOpen && (
          <RemoveCategoryModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            categoryId={categoryIds[categories.indexOf(categoryName)]}
            categoryName={categoryName}
            onConfirm={handleConfirmRemove}
          />
        )}
        {/* 맞춤 필터 */}
        <Line />
        <CustomFilter>
          <CustomUp>
            <CategoryP>나의 맞춤 필터</CategoryP>
            {customFilter.length < 5 && (
              <AddButton className="filter" onClick={() => showModal()}>
                <AddRoundedIcon />
              </AddButton>
            )}
          </CustomUp>
          <CustomDiv>
            {customFilter.length === 0 && (
              <FilterContent>
                맞춤 조건은 최대 5개까지 설정 가능합니다.
              </FilterContent>
            )}
            {message && (
              <MessageBox>
                <CheckIcon src={circleCheckIcon} alt="circle check icon" />
                {message}
              </MessageBox>
            )}
            <CustomList>
              {customFilter.map((condition, index) => (
                <CustomItem
                  key={index}
                  onMouseEnter={() => setHoveredFilterIndex(index)}
                  onMouseLeave={() => setHoveredFilterIndex(null)}
                  onClick={() => CustomFilterClick(condition)}
                >
                  <Icon icon="ri:align-left" width="1.25vw" height="1.25vw" />
                  <Right>
                    {condition}
                    {hoveredFilterIndex === index && (
                      <DotBox onClick={() => setOpenFilterDropdown(index)}>
                        <MoreVertIcon />
                      </DotBox>
                    )}
                    {openFilterDropdown === index && (
                      <FilterDropdown
                        isOpen={openFilterDropdown === index}
                        onClose={() => setOpenFilterDropdown(null)}
                        initialFilterName={condition}
                        onEditFilter={(newName) =>
                          handleEditFilter(index, newName)
                        }
                        onRemoveFilter={() => handleRemoveFilter(index)}
                        customFilter={customFilter}
                        filterIds={customFilterIds}
                      />
                    )}
                  </Right>
                </CustomItem>
              ))}
            </CustomList>
          </CustomDiv>
        </CustomFilter>
        <TagFilterModal
          ref={dialogRef}
          onSave={(modalData) => {
            addCustomCondition(modalData);
          }}
        />
      </SideDiv>
    </StMainPage>
  );
};

const StMainPage = styled.div`
  background-color: white;
`;

const SideDiv = styled.div`
  height: 100vh;
  width: 262px;
  padding: 0 16px;
  background-color: var(--sidebar);
  display: inline-block;
  position: relative;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 143px;
  gap: 7px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 12px;
  gap: 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  ${({ active }) => (active ? font.title2 : font.title3)}
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const CollectBtn = styled(Button)``;
const ManageBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 18px;
  height: 18px;
  position: relative;
  left: 0;
`;

const CategoryDiv = styled.div``;

const CategoryP = styled.p`
  ${font.title2}
  padding: 0 14px;
`;

const Accordion = styled.div`
  margin-top: 24px;
`;

const AccordionTitle = styled.div`
  ${font.title3}
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;
  gap: 8px;
  padding: 9px;
  padding-left: 14px;
  padding-right: 6px;

  &.category:hover {
    background-color: #eaebeb;
    border-radius: 8px;
  }
`;

const Icons = styled(Icon)`
  width: 18px;
  height: 18px;
`;

const RightArrowIcon = styled(ArrowRoundedIcon)`
  transition: transform 0.3s;
  transform: rotate(${({ open }) => (open ? '270deg' : '180deg')});
  width: 14px;
  height: 14px;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.category {
    background-color: #c5c5c5;
    border-radius: 4px;
    position: absolute;
    right: 6px;
  }
  &.filter {
    position: absolute;
    right: 25px;
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 14px;
`;

const AccordionContent = styled.div`
  ${font.body2}
  color: var(--gray2);
  margin-top: 5px;
  margin-left: 40px;
`;

const CategoryItem = styled.button`
  ${font.title4}
  margin: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px;
  padding-left: 40px;
  &:hover {
    background-color: ${({ active }) =>
      active ? 'rgba(188, 188, 188, 0.2)' : '#eaebeb'};
    border-radius: 8px;
  }
`;

const DotBox = styled.div`
  background-color: #c5c5c5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  margin-top: 10px;
  margin-bottom: 24px;
  border-top: 1px solid var(--gray3);
`;

const CustomFilter = styled.div``;

const CustomUp = styled.div`
  display: flex;
  align-items: center;
`;

const CustomDiv = styled.div`
  margin-top: 24px;
  padding: 0 4px;
`;

const FilterContent = styled.div`
  ${font.body2}
  color: var(--gray2);
  padding: 0 10px;
  line-height: 0;
`;

const CustomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 10px;
`;

const CustomItem = styled.div`
  ${font.title3}
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  gap: 13px;
  &:hover {
    width: 105%;
    background-color: ${({ active }) =>
      active ? 'rgba(188, 188, 188, 0.2)' : '#eaebeb'};
    border-radius: 8px;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const MessageBox = styled.div`
  position: fixed;
  top: 13%;
  left: 45%;
  background-color: #f2f2f2;
  font-size: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5.075px 0px rgba(0, 0, 0, 0.4);
  z-index: 100000;
  gap: 12px;
  flex-shrink: 0;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInOut} 2s forwards;
`;

const CheckIcon = styled.img`
  width: 44px;
`;

export default Sidebar;
