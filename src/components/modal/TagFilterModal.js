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

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div
    style={{
      width: '238px',
      height: '50px',
      fontWeight: '400',
      fontSize: '20px',
      color: '#4f4f4f',
      border: '1px solid #9f9f9f',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '15px',
    }}
  >
    <Icon
      icon="uit:calender"
      style={{ width: '24px', height: '24px', marginRight: '10px' }}
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
const TagFilterModal = forwardRef((_, ref) => {
  const [selectedFilter, setSelectedFilter] = useState('기본 태그');
  const [usedTags, setUsedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [dataType, setDataType] = useState([]);
  const dialogRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDday, setStartDday] = useState(null);
  const [endDday, setEndDday] = useState(null);
  const [isValid, setIsValid] = useState(false);

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

  console.log(startDday, endDday);

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
    setDataType((prevDataType) =>
      prevDataType.includes(option)
        ? prevDataType.filter((t) => t !== option)
        : [...prevDataType, option],
    );
  };

  console.log('데이터 타입 목록: ', dataType);

  useEffect(() => {
    console.log('dataType: ', dataType);
  }, [dataType]);

  const handleClose = () => {
    setSelectedTags([]);
    setStartDate(null);
    setEndDate(null);
    setDataType([]);
    dialogRef.current?.close();
  };

  const handleReset = () => {
    setSelectedTags([]);
    setStartDate(null);
    setEndDate(null);
    setDataType([]);
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

  console.log(selectedTags);

  useEffect(() => {
    console.log('isValid: ', isValid);
  }, [isValid]);

  const selectTag = async () => {
    try {
      const response = await axiosInstance.get('api/v1/tag/default/used');
      const result = response.data.results || [];
      console.log('사용한 기본 태그: ', result);
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
        console.log('가져온 내 태그: ', myTags);
        setTags(myTags);
      } else {
        console.log('태그 데이터를 가져오지 못했습니다.');
        setTags([]);
      }
    };
    fetchTags();
  }, []);

  console.log('시작일:', startDate);
  console.log('종료일: ', endDate);

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

  return (
    <Dialog ref={dialogRef}>
      <Head>
        <Title>검색할 태그를 선택하세요.</Title>
        <Icons>
          <Icon
            icon="ri:reset-left-line"
            style={{
              width: '32px',
              height: '32px',
              color: 'black',
            }}
            onClick={handleReset}
          />
          <Icon
            icon="ic:round-close"
            style={{
              width: '36px',
              height: '36px',
              color: 'black',
            }}
            onClick={handleClose}
          />
        </Icons>
      </Head>
      <Word>태그 선택</Word>
      <OptionContainer>
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
          <Icon
            icon="prime:check-square"
            style={{
              width: '24px',
              height: '24px',
              color: '#4F4F4F',
            }}
          />
          <div>적절한 태그를 선택해보세요!</div>
        </Short>
      </OptionContainer>

      {selectedFilter === '기본 태그' ? (
        <TagContainer>
          {Array.isArray(usedTags) &&
            usedTags.map((usedTag) => (
              <TagItem
                type="button"
                key={usedTag.id}
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
            checked={dataType.includes('LINK')}
            onChange={handleCheckboxChange}
          />
          <span>링크</span>
        </CheckboxLabel>
        <CheckboxLabel>
          <TypeBox
            type="checkbox"
            name="IMAGE"
            checked={dataType.includes('IMAGE')}
            onChange={handleCheckboxChange}
          />
          <span>이미지</span>
        </CheckboxLabel>
        <CheckboxLabel>
          <TypeBox
            type="checkbox"
            name="PDF"
            checked={dataType.includes('PDF')}
            onChange={handleCheckboxChange}
          />
          <span>PDF</span>
        </CheckboxLabel>
      </Group>
      <Word>저장 날짜</Word>
      <Date>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
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
          locale={ko}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="종료일"
          dateFormat="yyyy/MM/dd"
          customInput={<CustomInput />}
        />
      </Date>
      <NewWord>디데이 기간</NewWord>
      <Short style={{ marginBottom: '20px' }}>
        <Icon
          icon="prime:check-square"
          style={{
            width: '24px',
            height: '24px',
            color: '#4F4F4F',
          }}
        />
        <div>D-day는 D-0입니다</div>
      </Short>
      <Date>
        <Dday>
          <span>D-</span>
          <DdayInput
            placeholder="직접입력"
            type="number"
            min={0}
            onChange={handleChangeStartDay}
          />
        </Dday>
        <span>~</span>
        <Dday>
          <span>D-</span>
          <DdayInput
            placeholder="직접입력"
            type="number"
            min={0}
            onChange={handleChangeEndDay}
          />
        </Dday>
      </Date>
      <div style={{ display: 'flex', justifyContent: ' center' }}>
        <Button disabled={!isValid}>저장하기</Button>
      </div>
    </Dialog>
  );
});

TagFilterModal.displayName = 'TagFilterModal';
CustomInput.displayName = 'CustomInput';

const Button = styled.button`
  width: 222px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 22px;
`;

const DdayInput = styled.input`
  width: 131px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #9f9f9f;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  ::placeholder {
    color: #9f9f9f;
  }
`;

const Dday = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 500;
  color: #4f4f4f;
  align-items: center;
  column-gap: 10px;
`;

const NewWord = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 9px;
`;

const InputDate = styled.input`
  border: none;
  padding: 0;
  font-size: 20px;
  font-weight: 400;
  color: #4f4f4f;
  &:focus {
    outline: none;
  }

  width: 80%;
`;

const Date = styled.div`
  display: flex;
  column-gap: 16px;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 60px;
  z-index: 1000 !important;
  position: relative !important;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-size: 24px;
    color: #4f4f4f;
  }
`;

const TypeBox = styled.input`
  width: 28px;
  height: 28px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #9f9f9f;
  border-radius: 5px;

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
  margin-bottom: 60px;
`;

const OptionContainer = styled.div`
  margin-bottom: 36px;
`;

const Word = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const TagItem = styled.button`
  height: 54px;
  width: fit-content;
  border-radius: 50px;
  font-size: 22px;
  font-weight: 500;
  padding: 14px 30px;
  color: ${(props) => (props.$isSelected ? 'white' : '#9F9F9F')};
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : 'white')};
  border: ${(props) => (props.$isSelected ? 0 : '1px solid #9F9F9F')};
`;

const TagContainer = styled.div`
  width: 979px;
  height: 498px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 16px;
  overflow-y: auto;
  background-color: #fafafa;
  border: 0;
  border-radius: 20px;
  padding: 53px 47px;
  margin-bottom: 60px;
`;

const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
`;

const Options = styled.div`
  display: flex;
  column-gap: 16px;
  text-align: center;
  font-size: 22px;
  color: #9f9f9f;
  margin-bottom: 12px;
`;

const Short = styled.div`
  display: flex;
  column-gap: 10px;
  color: #4f4f4f;
  font-size: 20px;
  font-weight: 400;
`;

const Icons = styled.div`
  display: flex;
  column-gap: 16px;
`;

const Head = styled.div`
  display: flex;
  /* position: fixed; */
  justify-content: space-between;
  margin-bottom: 65px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const Dialog = styled.dialog`
  height: 839px;
  width: 1099px;
  border: 0;
  border-radius: 50px;
  padding: 60px;
  overflow-y: visible;
  z-index: 1000 !important;
  position: absolute !important;
`;

export default TagFilterModal;
