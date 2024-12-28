import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import seedIcon from '../assets/icons/seed_sidebar.png';
import reminderIcon from '../assets/icons/reminder_sidebar.png';
import circleCheckIcon from '../assets/icons/circleCheck.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
import axios from 'axios';

const Sidebar = ({
  setCategoryId,
  setFilterId,
  setCateName,
  setFilterName,
  categoryCounts,
  activeTab,
  setActiveTab,
}) => {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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

  const token = localStorage.getItem('jwtToken');
  const api = axios.create({
    baseURL: 'http://52.78.221.255',
    headers: { Authorization: `${token}` },
  });

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
      const response = await api.get('/api/v1/category');
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
  const handleViewBookmark = async () => {
    setIsBookmarkOpen(!isBookmarkOpen);

    try {
      const response = await api.get('/api/v1/bookmark');
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
    setIsCategoryOpen(true);
  };
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
    const categoryIndex = categories.indexOf(categoryName);
    const categoryId = categoryIds[categoryIndex];

    if (!bookmarks.includes(categoryName)) {
      setBookmarks([...bookmarks, categoryName]);
    }
    setIsAddingBookmark(true);
    console.log(`Bookmark added: Category ID = ${categoryId}`);

    try {
      const response = await api.post(
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
      const response = await api.delete(`/api/v1/bookmark/${bookmarkId}`);
      if (response.status === 200) {
        console.log('북마크 삭제 성공');
      } else {
        console.error('북마크 삭제 실패');
      }
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
      const response = await api.delete(`/api/v1/category/${categoryId}`);
      if (response.status === 200) {
        console.log('카테고리 삭제 성공');
      } else {
        console.error('카테고리 삭제 실패');
      }
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
    setActiveTab(tabName);
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

  const CustomFilterView = async (condition) => {
    const filterIndex = customFilter.indexOf(condition);
    const filterId = customFilterIds[filterIndex];

    setFilterName(condition);
    setActiveTab('맞춤필터');
    setFilterId(filterId);
    setMessage(`${condition}이(가) 적용되었습니다.`);
    setTimeout(() => setMessage(''), 2000);
  };

  /******************************************************************************************/
  // 맨처음 페이지 렌더링 이후 '/api/v1/filter'로 요청을 보내지만
  // 다음과 같은 오류 발생, Custom 필터 조회 오류 발생: TypeError: Cannot read properties of undefined (reading 'map') at CustomFilterViews
  // 한번 새로고침을 해야지만 필터 조회 성공
  const CustomFilterViews = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/filter');

      const filterId = response.data.results.map((item) => item.id);
      const filterNames = response.data.results.map((item) => item.name);
      setCustomFilterIds(filterId);
      setCustomFilter(filterNames);

      if (response.status === 200) {
        console.log('Custom 필터 조회 성공:', response.data);
      } else {
        console.error('Custom 필터 조회 실패:', response.data);
      }
    } catch (error) {
      console.error('Custom 필터 조회 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleViewCategory();
    CustomFilterViews();
  }, []);
  /******************************************************************************************/

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
        <CategoryDiv>
          <CategoryP>모든 카테고리 ({categoryIds.length})</CategoryP>
          <Accordion>
            <AccordionTitle onClick={handleViewBookmark}>
              <Icons icon="material-symbols:bookmark-outline" />
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
                        isBookmarked={bookmarks.includes(bookmark)}
                        onBookmarkAdd={handleBookmarkAdd}
                        onBookmarkRemove={handleBookmarkRemove}
                        onEditCategory={handleEditCategory}
                        onRemoveCategory={handleRemoveCategory}
                      />
                    )}
                  </CategoryItem>
                ))}
              </>
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
                <>
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
                        <DotBox onClick={() => setOpenDropdown(index)}>
                          <MoreVertIcon />
                        </DotBox>
                      )}
                      {openDropdown === index && (
                        <Dropdown
                          isOpen={openDropdown === index}
                          onClose={() => setOpenDropdown(null)}
                          categoryName={category}
                          onBookmarkAdd={handleBookmarkAdd}
                          onEditCategory={handleEditCategory}
                          onRemoveCategory={handleRemoveCategory}
                        />
                      )}
                    </CategoryItem>
                  ))}
                </>
              </>
            )}
          </Accordion>
        </CategoryDiv>
        {/* 카데고리 추가 모달 창 */}
        {isModalOpen && (
          <AddCategoryModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirm}
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
        <Line></Line>
        <CustomFilter>
          <CustomUp>
            <CategoryP>나의 맞춤 필터</CategoryP>
            <AddButton className="filter" onClick={() => showModal()}>
              <AddRoundedIcon />
            </AddButton>
          </CustomUp>
          <CustomDiv>
            {customFilter.length === 0 && (
              <FilterContent>
                맞춤 조건은 최대 5개까지 설정 가능합니다.
              </FilterContent>
            )}
            {message && (
              <MessageBox>
                <img
                  src={circleCheckIcon}
                  style={{ width: '4.188rem' }}
                  alt="circle check icon"
                />
                {message}
              </MessageBox>
            )}
            {customFilter.map((condition, index) => (
              <Custom
                key={index}
                onMouseEnter={() => setHoveredFilterIndex(index)}
                onMouseLeave={() => setHoveredFilterIndex(null)}
                onClick={() => CustomFilterView(condition)}
              >
                <Icon icon="ri:align-left" width="24px" height="24px" />
                {condition}
                <Right>
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
              </Custom>
            ))}
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
  width: 21.563rem;
  background-color: #f8fbfb;
  display: inline-block;
  position: relative;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12.5rem;
  border-bottom: 1px solid #dcdada;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 9px;
`;

const Button = styled.button`
  height: 3.5rem;
  width: 18.938rem;
  border-radius: 10px;
  border: none;
  background-color: ${({ active }) => (active ? '#def3f1' : 'transparent')};
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  position: relative;
  padding-left: 19px;
  margin-bottom: 4px;
`;

const CollectBtn = styled(Button)``;
const ManageBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 10px;
  position: relative;
  left: 0;
`;

const CategoryDiv = styled.div`
  margin-top: 28px;
`;

const CategoryP = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-left: 2.125rem;
  font-family: 'Pretendard-Regular';
`;

const Accordion = styled.div`
  margin-top: 32px;
`;

const AccordionTitle = styled.div`
  margin: 10px 21px;
  font-size: 20px;
  font-family: 'Pretendard-Regular';
  font-weight: 580;
  padding: 10px 0;
  padding-left: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;

  &.category:hover {
    background-color: #dcdada;
    border-radius: 10px;
  }
`;

const Icons = styled(Icon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 13px;
`;

const RightArrowIcon = styled(KeyboardArrowRightIcon)`
  transition: transform 0.3s;
  transform: rotate(${({ open }) => (open ? '90deg' : '0deg')});
  size: 24px;
  margin-left: 13px;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 8px;

  &.category {
    width: 32px;
    height: 32px;
    background-color: #9f9f9f;
    border-radius: 7px;
    position: absolute;
  }
  &.filter {
    position: absolute;
    padding-right: 15px;
  }
`;

const AccordionContent = styled.div`
  padding-bottom: 35px;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  color: #9f9f9f;
  margin-left: 78px;
`;

const CategoryItem = styled.button`
  margin-bottom: 18px;
  margin: auto;
  font-size: 20px;
  font-family: 'Pretendard-Regular';
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 56px;
  width: 303px;
  height: 44px;
  &:hover {
    background-color: ${({ active }) => {
      return active ? 'rgba(188, 188, 188, 0.2)' : '#dcdada';
    }};

    border-radius: 10px;
  }
`;

const DotBox = styled.div`
  width: 32px;
  height: 32px;
  background-color: #9f9f9f;
  border-radius: 7px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  margin-top: 30px;
  border-top: 1px solid #dcdada;
  margin-left: 20px;
  margin-right: 20px;
`;
const CustomFilter = styled.div`
  margin-top: 30px;
`;

const CustomUp = styled.div`
  display: flex;
  align-items: center;
`;

const CustomDiv = styled.div`
  margin-top: 20px;
`;

const FilterContent = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  color: #9f9f9f;
  margin-left: 31px;
`;

const Custom = styled.div`
  margin-left: 31px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 13px;
  font-family: 'Pretendard-Regular';
  background: transparent;
  border: none;
  cursor: pointer;
  padding-left: 7px;
  margin-right: 17px;
  height: 44px;

  &:hover {
    background-color: ${({ active }) => {
      return active ? 'rgba(188, 188, 188, 0.2)' : '#dcdada';
    }};

    border-radius: 10px;
  }
`;

const Right = styled.div`
  margin-left: 105px;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const MessageBox = styled.div`
  position: fixed;
  top: 12%;
  left: 50%;
  background-color: #f2f2f2;
  color: #333;
  font-size: 28px;
  border-radius: 12px;
  box-shadow: 0 0 5px #4f4f4f;
  z-index: 9999;
  width: 511px;
  height: 99px;
  gap: 20px;
  padding: 8px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInOut} 2s forwards;
`;

export default Sidebar;
