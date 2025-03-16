import { useState, useEffect, useRef } from 'react';
import { axiosInstance } from 'apis/axiosInstance';
import circleCheckIcon from 'assets/icons/circleCheck.png';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterDropdown from '../Dropdown/FilterDropdown';
import TagFilterModal from '../Modal/TagFilterModal';
// import { useCategories } from '../CategoryContext';
import { AddButton, DotBox, Icons } from '../AllCategory/style';
import {
  CustomFilterContainer,
  CustomUp,
  CategoryP,
  CustomDiv,
  FilterContent,
  CustomList,
  CustomItem,
  Right,
  MessageBox,
  CheckIcon,
} from './style';

const CustomFilter = ({ setActiveTab, setFilterId, setFilterName }) => {
  const [hoveredFilterIndex, setHoveredFilterIndex] = useState(null);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null);
  const [customFilter, setCustomFilter] = useState([]);
  const [customFilterIds, setCustomFilterIds] = useState([]);
  const [message, setMessage] = useState('');

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
    <CustomFilterContainer>
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
              <Icons icon="ri:align-left" />
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
                    onEditFilter={(newName) => handleEditFilter(index, newName)}
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
      <TagFilterModal
        ref={dialogRef}
        onSave={(modalData) => {
          addCustomCondition(modalData);
        }}
      />
    </CustomFilterContainer>
  );
};

export default CustomFilter;
