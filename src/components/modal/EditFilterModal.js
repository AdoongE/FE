import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';
import { MyTag } from '../api/MyTagApi';
import checkIcon from '../../assets/icons/Check.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import { format, parseISO } from 'date-fns';
import { font } from '../../styles/font';

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div
    style={{
      width: '128px',
      height: '32px',
      fontWeight: '400',
      color: '#4f4f4f',
      fontSize: '12px',
      border: '0.825px solid var(--gray2, #9F9F9F)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
    }}
  >
    <Icon
      icon="uit:calender"
      style={{ width: '12px', height: '12px', marginRight: '6px' }}
      onClick={onClick}
    />
    <InputDate
      value={value || placeholder}
      ref={ref}
      type="text"
      onClick={onClick}
    />
  </div>
));

const EditFilterModal = forwardRef(({ filterId }, ref) => {
  const [selectedFilter, setSelectedFilter] = useState('기본 태그');
  const [usedTags, setUsedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [seedType, setSeedType] = useState([]);
  const dialogRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDday, setStartDday] = useState(null);
  const [endDday, setEndDday] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  //   const [originalFilterDetail, setOriginalFilterDetail] = useState({});

  const getFilterData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/filter/${filterId}/info`,
      );
      const results = response.data.results[0];
      console.log('수정 전 data: ', results);
      //   setOriginalFilterDetail(results);
      setSeedType(results.storageFormats || []);
      setSelectedTags(results.tags || []);
      setStartDate(results.startDate ? parseISO(results.startDate) : null);
      setEndDate(results.endDate ? parseISO(results.endDate) : null);
      setStartDday(results.fromDDay);
      setEndDday(results.toDDay || null);

      if (response.status === 200) {
        console.log('맞춤 필터 조회 성공');
      } else {
        console.error('맞춤 필터 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    getFilterData();
  }, [filterId]);

  useEffect(() => {
    if (startDday <= -1 || endDday <= -1 || endDday < startDday) {
      setIsValid(false);
    } else if (startDate && !endDate) {
      setIsValid(false);
    } else if (startDday && !endDday) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [startDate, endDate, startDday, endDday]);

  const handleChangeStartDay = (event) => {
    setStartDday(event.target.value);
  };

  const handleChangeEndDay = (event) => {
    setEndDday(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    resetTags: () => setSelectedTags([]),
    removeTags: (tag) =>
      setSelectedTags((prevTags) => prevTags.filter((item) => item !== tag)),
    showModal: () => {
      dialogRef.current?.showModal();
    },

    close: () => dialogRef.current?.close(),
  }));

  const handleCheckboxChange = (event) => {
    const option = event.target.name;
    setSeedType((prevDataType) =>
      prevDataType.includes(option)
        ? prevDataType.filter((t) => t !== option)
        : [...prevDataType, option],
    );
  };

  const handleClose = () => {
    setSelectedTags([]);
    setStartDate(null);
    setEndDate(null);
    setSeedType([]);
    dialogRef.current?.close();
  };

  const handleReset = () => {
    setSelectedTags([]);
    setStartDate(null);
    setEndDate(null);
    setSeedType([]);
  };

  const handleFilterClick = (filterOption) => {
    setSelectedFilter(filterOption);
  };

  const handleSelectTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const selectTag = async () => {
    try {
      const response = await axiosInstance.get('api/v1/tag/default/used');
      const result = response.data.results || [];
      if (response.status) {
        console.log('사용한 기본 태그 가져오기 성공');
        setUsedTags(result);
      } else {
        console.error('사용한 기본 태그 가져오기 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    selectTag();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const myTags = await MyTag();
      if (Array.isArray(myTags)) {
        setTags(myTags);
      } else {
        console.log('태그 데이터를 가져오지 못했습니다.');
        setTags([]);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (dialogElement) {
      const handleClickOutside = (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      };

      dialogElement.addEventListener('mousedown', handleClickOutside);

      return () => {
        dialogElement.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [dialogRef]);

  const handleSave = async () => {
    const modalData = {
      storageFormats: seedType,
      tags: selectedTags,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
      fromDDay: startDday,
      toDDay: endDday,
    };
    try {
      const result = await axiosInstance.patch(
        `/api/v1/filter/${filterId}`,
        modalData,
      );
      console.log(modalData);
      if (result?.data?.status?.code === 200) {
        console.log('맞춤 필터 수정 성공');
        dialogRef.current?.close();
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <Dialog ref={dialogRef}>
      <Head>
        <Title>맞춤 필터 조건 설정</Title>
        <Icons>
          <HeaderIcon icon="ri:reset-left-line" onClick={handleReset} />
          <HeaderIcon icon="mingcute:close-line" onClick={handleClose} />
        </Icons>
      </Head>
      <Word>태그 선택</Word>
      <div>
        <Options>
          <Option
            $isSelected={selectedFilter === '기본 태그'}
            onClick={() => handleFilterClick('기본 태그')}
          >
            기본 태그
          </Option>
          <div>|</div>
          <Option
            $isSelected={selectedFilter === '나의 태그'}
            onClick={() => handleFilterClick('나의 태그')}
          >
            나의 태그
          </Option>
        </Options>
        <Short>
          <CheckIcon icon="prime:check-square" />
          <div>적절한 태그를 선택해보세요!</div>
        </Short>
      </div>

      {selectedFilter === '기본 태그' ? (
        <TagContainer>
          {Array.isArray(usedTags) &&
            usedTags.map((usedTag) => (
              <TagItem
                type="button"
                key={usedTag.tagId}
                onClick={() => handleSelectTag(usedTag.name)}
                $isSelected={selectedTags.includes(usedTag.name)}
              >
                {usedTag.name}
              </TagItem>
            ))}
        </TagContainer>
      ) : (
        <TagContainer>
          {Array.isArray(tags) &&
            tags.map((tag) => (
              <TagItem
                type="button"
                key={tag.id}
                onClick={() => handleSelectTag(tag.name)}
                $isSelected={selectedTags.includes(tag.name)}
              >
                {tag.name}
              </TagItem>
            ))}
        </TagContainer>
      )}
      <Word>저장 형식</Word>
      <Group>
        <CheckboxLabel>
          <TypeBox
            type="checkbox"
            name="LINK"
            checked={seedType.includes('LINK')}
            onChange={handleCheckboxChange}
          />
          <span>링크</span>
        </CheckboxLabel>
        <CheckboxLabel>
          <TypeBox
            type="checkbox"
            name="IMAGE"
            checked={seedType.includes('IMAGE')}
            onChange={handleCheckboxChange}
          />
          <span>이미지</span>
        </CheckboxLabel>
        <CheckboxLabel>
          <TypeBox
            type="checkbox"
            name="PDF"
            checked={seedType.includes('PDF')}
            onChange={handleCheckboxChange}
          />
          <span>PDF</span>
        </CheckboxLabel>
      </Group>
      <Word>저장 날짜</Word>
      <Date>
        <DatePicker
          key={`start-${resetKey}`}
          locale={ko}
          selected={startDate}
          onChange={(date) => setStartDate(date || null)}
          placeholderText="시작일"
          dateFormat="yyyy/MM/dd"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="custom-date-picker"
          customInput={<CustomInput />}
        />
        <span>~</span>
        <DatePicker
          key={`end-${resetKey}`}
          locale={ko}
          selected={endDate}
          onChange={(date) => setEndDate(date || null)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="종료일"
          dateFormat="yyyy/MM/dd"
          customInput={<CustomInput />}
        />
      </Date>
      <Word>디데이 기간</Word>
      <Short style={{ marginBottom: '20px' }}>
        <CheckIcon icon="prime:check-square" />
        <div>D-day는 D-0입니다. ex) D-0 ~ D~10</div>
      </Short>
      <Date>
        <Dday>
          <span>D-</span>
          <DdayInput
            placeholder="직접입력"
            value={startDday}
            type="number"
            min={0}
            onChange={handleChangeStartDay}
          />
        </Dday>
        <span>~</span>
        <Dday>
          <span>D-</span>
          <DdayInput
            value={endDday}
            placeholder="직접입력"
            type="number"
            min={0}
            onChange={handleChangeEndDay}
          />
        </Dday>
      </Date>
      <div style={{ display: 'flex', justifyContent: ' center' }}>
        <Button disabled={!isValid} onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </Dialog>
  );
});

EditFilterModal.displayName = 'EditFilterModal';
CustomInput.displayName = 'CustomInput';

const CheckIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  transform: translateY(-1px);
`;

const HeaderIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  color: white;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 16px;
`;

const DdayInput = styled.input`
  width: 77px;
  height: 32px;
  border-radius: 6px;
  border: 0.825px solid var(--gray2, #9f9f9f);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  ::placeholder {
    color: #9f9f9f;
  }
`;

const Dday = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  color: #4f4f4f;
  align-items: center;
  column-gap: 4px;
`;

const InputDate = styled.input`
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  color: #4f4f4f;
  &:focus {
    outline: none;
  }
  width: 80%;
`;

const Date = styled.div`
  display: flex;
  column-gap: 5px;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
  z-index: 1000 !important;
  position: relative !important;
  overflow: visible !important;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    color: #4f4f4f;
    font-weight: 500;
  }
`;

const TypeBox = styled.input`
  width: 14px;
  height: 14px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #9f9f9f;
  border-radius: 2px;

  &:checked {
    background-color: #41c3ab;
    border: none;
    background-image: url(${checkIcon});
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 33px;
`;

const Word = styled.div`
  ${font.title2}
  margin-bottom: 9px;
`;

const TagItem = styled.button`
  height: 30px;
  width: fit-content;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  color: ${(props) => (props.$isSelected ? 'white' : '#9F9F9F')};
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : 'white')};
  border: ${(props) => (props.$isSelected ? 0 : '1px solid var(--gray2)')};
`;

const TagContainer = styled.div`
  width: 537px;
  height: 270px;
  overflow-y: auto;
  background-color: #fafafa;
  border: 0;
  border-radius: 11.692px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 10px;
  align-content: flex-start;
  padding: 20px 67px 20px 20px;
  box-sizing: border-box;
`;

const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
  font-weight: ${(props) => (props.$isSelected ? 500 : 400)};
`;

const Options = styled.div`
  display: flex;
  column-gap: 4px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Short = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 12px;
`;

const Icons = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`;

const Dialog = styled.dialog`
  height: 462px;
  border: 0;
  border-radius: 40px;
  overflow-y: visible;
  z-index: 1000 !important;
  position: absolute !important;
  padding: 48px 41px 30px 40px;
  box-sizing: border-box;
`;

export default EditFilterModal;
