import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import circleCheckIcon from 'assets/icons/circleCheck.png';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '@iconify/react';
import FilterDropdown from './Dropdown/FilterDropdown';
import TagFilterModal from './Modal/TagFilterModal';
import { axiosInstance } from 'apis/axiosInstance';

import TabButton from './TabButton/index';
import AllCategory from './AllCategory/index';
import { CategoriesProvider } from './CategoryContext';

const Sidebar = ({ setFilterId, setFilterName }) => {
  const [activeTab, setActiveTab] = useState('');
  const [hoveredFilterIndex, setHoveredFilterIndex] = useState(null);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null);
  const [customFilter, setCustomFilter] = useState([]);
  const [customFilterIds, setCustomFilterIds] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setActiveTab('나의 씨드');
  }, [setActiveTab]);

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
        console.log('Custom 필터 조회 성공:', response.data);
      } else {
        console.error('Custom 필터 조회 실패:', response.data);
      }
    } catch (error) {
      console.error('Custom 필터 조회 오류 발생:', error);
    }
  };

  useEffect(() => {
    CustomFilterView();
  }, []);

  return (
    <StMainPage>
      <SideDiv>
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} />
        <Line />
        <CategoriesProvider>
          <AllCategory setActiveTab={setActiveTab} />
        </CategoriesProvider>
        <Line />
        {/* 맞춤 필터 */}
        <CustomFilter>
          <CustomUp>
            <CategoryP>나의 맞춤 필터</CategoryP>
            {customFilter.length < 5 && (
              <AddButton className="filter" onClick={() => showModal()}>
                <AddRoundedIcon fontSize="1.042vw;" />
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
                <img
                  src={circleCheckIcon}
                  style={{ width: '3.49vw' }}
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
  width: 18.28125vw;
  background-color: #f8fbfb;
  display: inline-block;
  position: relative;
`;

const CategoryP = styled.p`
  font-size: 1.25vw; /* 24px */
  font-weight: 600;
  margin-left: 1.106vw; /* 2.125rem */
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

const Line = styled.div`
  margin-top: 1.563vw; /* 30px */
  border-top: 0.052vw solid #dcdada; /* 1px */
  margin-left: 1.042vw; /* 20px */
  margin-right: 1.042vw; /* 20px */
`;

const CustomFilter = styled.div`
  margin-top: 1.563vw; /* 30px */
`;

const CustomUp = styled.div`
  display: flex;
  align-items: center;
`;

const CustomDiv = styled.div`
  margin-top: 1.042vw; /* 20px */
`;

const FilterContent = styled.div`
  font-size: 0.833vw; /* 16px */
  font-family: 'Pretendard-Regular';
  color: #9f9f9f;
  margin-left: 1.615vw; /* 31px */
`;

const Custom = styled.div`
  margin-left: 1.615vw; /* 31px */
  font-size: 1.042vw; /* 20px */
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.677vw; /* 13px */
  font-family: 'Pretendard-Regular';
  background: transparent;
  border: none;
  cursor: pointer;
  padding-left: 0.365vw; /* 7px */
  margin-right: 0.365vw; /* 7px */
  height: 2.292vw; /* 44px */

  &:hover {
    background-color: ${({ active }) => {
      return active ? 'rgba(188, 188, 188, 0.2)' : '#dcdada';
    }};
    border-radius: 0.521vw; /* 10px */
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
  top: 13%; /* 12% */
  left: 45%; /* 45% */
  background-color: #f2f2f2;
  color: #333;
  font-size: 1.458vw; /* 28px */
  border-radius: 0.625vw; /* 12px */
  box-shadow: 0 0 0.26vw #4f4f4f; /* 0 0 5px */
  z-index: 100000;
  width: auto; /* 435px */
  height: 3.49vw; /* 67px */
  gap: 1.042vw; /* 20px */
  padding: 0.833vw 2.604vw; /* 16px 50px */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInOut} 2s forwards;
`;

export default Sidebar;
