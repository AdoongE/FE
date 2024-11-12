import styled from 'styled-components';
import { useState, useEffect } from 'react';
import seedIcon from '../assets/icons/seed.png';
import treeIcon from '../assets/icons/tree.png';
import forestIcon from '../assets/icons/forest.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from '../components/dropdown/CategoryDropdown';
import { Icon } from '@iconify/react';
import AddCategoryModal from '../components/modal/AddCategoryModal';
import EditCategoryModal from '../components/modal/EditCategoryModal';
import RemoveCategoryModal from '../components/modal/RemoveCategoryModal';
import axios from 'axios';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [hoveredBookdmarkIndex, setHoveredBookmarkIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openBookmarkDropdowns, setOpenBookmarkDropdowns] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleViewCategory = async () => {
    setIsCategoryOpen(!isCategoryOpen);
    const token = localStorage.getItem('jwtToken');
    const api = axios.create({
      baseURL: 'http://52.78.221.255',
      headers: { Authorization: `${token}` },
    });
    try {
      const response = await api.get('/api/v1/category');
      const results = response.data.results;
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

  useEffect(() => {
    if (isAddingBookmark || isEditModalOpen || isDeleteModalOpen) {
      setHoveredCategoryIndex(null);
      setHoveredBookmarkIndex(null);
    }
  }, [isAddingBookmark, isEditModalOpen, isDeleteModalOpen]);

  useEffect(() => {
    setActiveTab('모아보기');
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

  const handleBookmarkAdd = (categoryName) => {
    if (!bookmarks.includes(categoryName)) {
      setBookmarks([...bookmarks, categoryName]);
    }
    setIsAddingBookmark(true);
  };

  const handleEditCategory = (categoryName) => {
    setEditCategoryName(categoryName);
    setEditModalOpen(true);
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

  const handleBookmarkRemove = (category) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((item) => item !== category),
    );
  };

  const handleRemoveCategory = (categoryNameToRemove) => {
    setCategoryName(categoryNameToRemove);
    setDeleteModalOpen(true); // 모달 열기
  };

  const handleConfirmRemove = (categoryName) => {
    const updatedCategories = categories.filter(
      (category) => category !== categoryName,
    );
    setCategories(updatedCategories);

    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark !== categoryName,
    );
    setBookmarks(updatedBookmarks);
    setDeleteModalOpen(false);
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

  return (
    <StMainPage>
      <SideDiv>
        <BtnDiv>
          <CollectBtn
            active={activeTab === '모아보기'}
            onClick={() => handleTabClick('모아보기')}
          >
            <ImgIcon src={seedIcon} alt="seed icon" />
            모아보기
          </CollectBtn>
          <ManageBtn
            active={activeTab === '관리하기'}
            onClick={() => handleTabClick('관리하기')}
          >
            <ImgIcon src={treeIcon} alt="tree icon" />
            관리하기
          </ManageBtn>
          <ExploreBtn
            active={activeTab === '탐색하기'}
            onClick={() => handleTabClick('탐색하기')}
          >
            <ImgIcon src={forestIcon} alt="forest icon" />
            탐색하기
          </ExploreBtn>
        </BtnDiv>
        <CategoryDiv>
          <CategoryP>모든 카테고리 (30)</CategoryP> {/*숫자 임시 지정*/}
          <Accordion>
            <AccordionTitle onClick={() => setIsBookmarkOpen(!isBookmarkOpen)}>
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
              onClick={handleViewCategory}
              onMouseEnter={() => setHoveredCategory(true)}
              onMouseLeave={() => setHoveredCategory(false)}
            >
              <Icons icon="ion:grid-outline" />
              {`내 카테고리`}
              <RightArrowIcon open={isCategoryOpen} />
              {hoveredCategory && (
                <AddButton onClick={openModal}>
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

            <AccordionTitle
              onClick={() => setIsSubscribeOpen(!isSubscribeOpen)}
            >
              <Icons icon="iconamoon:file-add-light" />
              구독한 카테고리
              <RightArrowIcon open={isSubscribeOpen} />
            </AccordionTitle>

            {isSubscribeOpen && (
              <AccordionContent>카테고리를 구독하세요.</AccordionContent>
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
            categoryName={categoryName}
            onConfirm={handleConfirmRemove}
          />
        )}
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
const ExploreBtn = styled(Button)``;

const ImgIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 10px;
  position: relative;
  left: 0;
`;

const CategoryDiv = styled.div`
  margin-top: 26px;
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
  width: 32px;
  height: 32px;
  background-color: #9f9f9f;
  border-radius: 7px;
  position: absolute;
  right: 8px;
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

export default Sidebar;
