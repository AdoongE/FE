import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { MyTag } from '../api/MyTagApi';
import tagImage from '../../assets/icons/tag.png';

const AddTagModal = forwardRef(
  ({ onConfirm, title, originalTags = [] }, ref) => {
    const TagOption = [
      '기획/아이디어',
      '여행',
      '글로벌',
      '맛집',
      '철학',
      '음식/요리',
      '운동',
      '건강',
      '스포츠',
      '영화/드라마',
      '뮤지컬/연극',
      '연예',
      '음악',
      '뷰티',
      '패션',
      '디자인',
      'UI/UX',
      '인테리어',
      '사진',
      '영상',
      'SNS',
      'IT',
      '비지니스',
      '자기계발',
      '생산성',
      '생활',
      '반려동물',
      '책/글쓰기',
      '취미',
      '게임',
      '공부',
      '금융/재테크',
      '부동산',
      '예술',
      '환경',
      '역사',
      '과학',
      '심리학',
      '교육',
      '정치',
    ];

    const dialogRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('기본 태그');
    const [tags, setTags] = useState([]);

    const handleFilterClick = (filterOption) => {
      setSelectedFilter(filterOption);
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

    useEffect(() => {
      // 컴포넌트 처음 렌더링 시 originalTags로 초기화
      setSelectedTags(originalTags);
    }, []);

    const handleSelectTag = (tag) => {
      setSelectedTags((prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag],
      );
    };

    const handleClose = () => {
      setSelectedTags([]);
      dialogRef.current?.close();
    };

    const handleApply = () => {
      onConfirm([
        ...originalTags,
        ...selectedTags.filter((tag) => !originalTags.includes(tag)),
      ]);
      dialogRef.current?.close();
      console.log('모달 tag: ', selectedTags);
    };

    const handleReset = () => {
      setSelectedTags([]);
    };

    useEffect(() => {
      const fetchTags = async () => {
        const myTags = await MyTag();
        if (Array.isArray(myTags)) {
          console.log('가져온 내 태그:', myTags);
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
    }, []);

    return (
      <Dialog ref={dialogRef}>
        <Head>
          <Title>{title}</Title>
          <Icons>
            <Icon
              icon="ri:reset-left-line"
              width="1.667vw"
              height="1.667vw"
              color="black"
              onClick={handleReset}
            />
            <Icon
              icon="ic:round-close"
              style={{
                width: '1.875vw',
                height: '1.875vw',
                color: 'black',
              }}
              onClick={handleClose}
            />
          </Icons>
        </Head>
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
                width: '1.25vw',
                height: '1.25vw',
                color: '#4F4F4F',
              }}
            />
            <div>적절한 태그를 선택해보세요!</div>
          </Short>
        </OptionContainer>

        {selectedFilter === '기본 태그' ? (
          <TagContainer>
            {TagOption.map((tag, index) => (
              <TagItem
                type="button"
                key={index}
                onClick={() => handleSelectTag(tag)}
                $isSelected={selectedTags.includes(tag)}
              >
                {tag}
              </TagItem>
            ))}
          </TagContainer>
        ) : (
          <div>
            {Array.isArray(tags) && tags.length > 0 ? (
              <TagContainer>
                {tags.map((tag) => (
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
            ) : (
              <Notag>
                <TagImage src={tagImage} alt="tagImage" />
                <div>나만의 태그를</div>
                <div>직접 만들어보세요!</div>
              </Notag>
            )}
          </div>
        )}

        <Line />
        <Button type="button" onClick={handleApply}>
          선택완료
        </Button>
      </Dialog>
    );
  },
);

AddTagModal.displayName = 'AddTagModal';

const TagImage = styled.img`
  width: 6.875vw; /* 132px */
  height: 6.875vw; /* 132px */
`;

const Notag = styled.div`
  margin-left: 3.073vw; /* 59px */
  width: 33.333vw; /* 640px */
  height: 20.833vw; /* 400px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.521vw; /* 10px */
  font-weight: 500;
  font-size: 1.667vw; /* 32px */
`;

const OptionContainer = styled.div`
  margin-left: 3.021vw; /* 58px */
  margin-bottom: 1.875vw; /* 36px */
`;

const Short = styled.div`
  display: flex;
  column-gap: 0.521vw; /* 10px */
  color: #4f4f4f;
  font-size: 1.042vw; /* 20px */
  font-weight: 400;
`;

const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
`;

const Options = styled.div`
  display: flex;
  column-gap: 0.833vw; /* 16px */
  text-align: center;
  font-size: 1.146vw; /* 22px */
  color: #9f9f9f;
  margin-bottom: 0.625vw; /* 12px */
`;

const TagItem = styled.button`
  height: 2.813vw; /* 54px */
  width: fit-content;
  border-radius: 2.604vw; /* 50px */
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  padding: 0.729vw 1.563vw; /* 14px 30px */
  color: ${(props) => (props.$isSelected ? 'white' : '#9F9F9F')};
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : 'white')};
  border: ${(props) => (props.$isSelected ? 0 : '0.052vw solid #9F9F9F')};
`;

const Button = styled.button`
  width: 11.563vw; /* 222px */
  height: 3.021vw; /* 58px */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; /* 10px */
  border: 0;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 1.146vw; /* 22px */
  margin-left: 13.646vw; /* 262px */
`;

const TagContainer = styled.div`
  margin-left: 3.073vw; /* 59px */
  width: 33.333vw; /* 640px */
  height: 20.833vw; /* 400px */
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.573vw; /* 11px */
  row-gap: 1.042vw; /* 20px */
  overflow-y: auto;
  align-content: flex-start;
`;

const Line = styled.div`
  width: 36.406vw; /* 699px */
  height: 0;
  border: 0.052vw solid #9f9f9f; /* 1px */
  margin-top: 2.5vw; /* 48px */
  margin-bottom: 1.979vw; /* 38px */
  margin-left: 1.198vw; /* 23px */
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 3.021vw; /* 58px */
  margin-right: 2.552vw; /* 49px */
  margin-bottom: 1.042vw; /* 20px */
`;

const Icons = styled.div`
  display: flex;
  column-gap: 0.833vw; /* 16px */
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.667vw; /* 32px */
  font-weight: 600;
`;

const Dialog = styled.dialog`
  overflow-y: hidden;
  padding-top: 2.865vw; /* 55px */
  padding-bottom: 2.083vw; /* 40px */
  position: relative;
  width: 38.854vw; /* 746px */
  height: 35.99vw; /* 691px */
  border-radius: 2.604vw; /* 50px */
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default AddTagModal;
