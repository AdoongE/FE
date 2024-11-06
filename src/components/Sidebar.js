import styled from 'styled-components';
import { useState } from 'react';
import seedIcon from '../assets/icons/seed.png';
import treeIcon from '../assets/icons/tree.png';
import forestIcon from '../assets/icons/forest.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IOSSwitch } from '../components/switch/PublicCategorySwitch';
import Dropdown from '../components/dropdown/CategoryDropdown';
import { Icon } from '@iconify/react';
import EditCategoryModal from '../components/modal/EditCategoryModal';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('collect');
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true); // 토글 공개 여부
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openBookmarkDropdowns, setOpenBookmarkDropdowns] = useState({});

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsCategoryOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  const handleConfirm = () => {
    const newCategoryName = categoryName || '새로운 카테고리'; // 입력이 없을 때 추가 내용
    setCategories([...categories, newCategoryName]); // 카테고리 추가
    closeModal();
  };

  const handleBookmarkAdd = (categoryName) => {
    if (!bookmarks.includes(categoryName)) {
      setBookmarks([...bookmarks, categoryName]);
    }
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

  return (
    <StMainPage>
      <SideDiv>
        <BtnDiv>
          <CollectBtn
            active={activeButton === 'collect'}
            onClick={() => setActiveButton('collect')}
          >
            <ImgIcon src={seedIcon} alt="seed icon" />
            모아보기
          </CollectBtn>
          <ManageBtn
            active={activeButton === 'manage'}
            onClick={() => setActiveButton('manage')}
          >
            <ImgIcon src={treeIcon} alt="seed icon" />
            관리하기
          </ManageBtn>
          <ExploreBtn
            active={activeButton === 'explore'}
            onClick={() => setActiveButton('explore')}
          >
            <ImgIcon src={forestIcon} alt="seed icon" />
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
                    key={index}
                    onMouseEnter={() => setHoveredCategoryIndex(index)}
                    onMouseLeave={() => setHoveredCategoryIndex(null)}
                  >
                    {bookmark}
                    {hoveredCategoryIndex === index && (
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
                      />
                    )}
                  </CategoryItem>
                ))}
              </>
            )}

            <AccordionTitle
              className="category"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
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
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalDiv>
                <TopDiv>
                  <ModalTitle>카테고리 추가</ModalTitle>
                  <Icon
                    icon="line-md:close"
                    style={{
                      width: '36px',
                      height: '36px',
                      cursor: 'pointer',
                    }}
                    onClick={closeModal}
                  />
                </TopDiv>
                <Label>
                  공개 카테고리
                  <IOSSwitch checked={isPublic} onChange={handleToggle} />
                </Label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder=" 카테고리 이름을 입력하세요. (선택)"
                />
                <ButtonContainer>
                  <ModalButton className="no" onClick={closeModal}>
                    취소
                  </ModalButton>
                  <ModalButton className="ok" onClick={handleConfirm}>
                    확인
                  </ModalButton>
                </ButtonContainer>
              </ModalDiv>
            </ModalContent>
          </ModalOverlay>
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

const AddIconWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #9f9f9f;
  color: #555;
  margin-right: 13px;
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
  &:hover ${AddIconWrapper} {
    display: flex;
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
  /* margin-left: 8px; */
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
    background-color: #dcdada;
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

// 모달 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 46.625rem;
  height: 21.875rem;
`;

const ModalDiv = styled.div`
  margin: 3.125rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 22px;
  font-family: 'Pretendard-Regular';
  color: #4f4f4f;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 11px;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
  height: 4.25rem;
  margin-top: 26px;
  margin-bottom: 18px;
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  height: 3.375rem;
  width: 6.188rem;
  font-size: 22px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 10px;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #dcdada;
    color: black;
  }
`;

export default Sidebar;
