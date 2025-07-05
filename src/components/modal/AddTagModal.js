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
            <HeaderIcon icon="ri:reset-left-line" onClick={handleReset} />
            <HeaderIcon icon="mingcute:close-line" onClick={handleClose} />
          </Icons>
        </Head>
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
            {selectedFilter === '기본 태그' ? (
              <div>적절한 태그를 선택해보세요!</div>
            ) : (
              <div>
                이전에 만들었던 태그를 다시 사용하면 검색/관리하기 편해요!
              </div>
            )}
          </Short>
        </div>

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
                    key={tag.tagId}
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
        <FlexBox>
          <Button type="button" onClick={handleApply}>
            선택완료
          </Button>
        </FlexBox>
      </Dialog>
    );
  },
);

AddTagModal.displayName = 'AddTagModal';

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CheckIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  transform: translateY(-1px);
`;

const HeaderIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const TagImage = styled.img`
  width: 83px;
  height: 83px;
`;

const Notag = styled.div`
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: var(--gray1);
`;

const Short = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 48px;
`;

const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
  font-weight: ${(props) => (props.$isSelected ? 500 : 400)};
`;

const Options = styled.div`
  display: flex;
  column-gap: 8px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
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

const Button = styled.button`
  width: 150px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 16px;
`;

const TagContainer = styled.div`
  width: 480px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 6px;
  row-gap: 10px;
  overflow-y: auto;
  align-content: flex-start;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 536px;
  height: 1px;
  background: var(--gray3, #dcdada);
  margin: 36px 0px 36px 0px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Icons = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`;

const Dialog = styled.dialog`
  overflow-y: hidden;
  padding: 48px 32px 36px 48px;
  position: absolute !important;
  border-radius: 40px;
  background-color: white;
  border: 0;
  box-sizing: border-box;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default AddTagModal;
