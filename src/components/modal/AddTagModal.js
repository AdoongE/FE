import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const AddTagModal = forwardRef(({ onConfirm, originalTags = [] }, ref) => {
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
  }, [originalTags]);

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
    onConfirm([...selectedTags]);
    dialogRef.current?.close();
    console.log('모달 tag: ', selectedTags);
  };

  const handleReset = () => {
    setSelectedTags([]);
  };

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
        <Title>태그를 선택하세요.</Title>
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
      <Line />
      <Button type="button" onClick={handleApply}>
        적용하기
      </Button>
    </Dialog>
  );
});

AddTagModal.displayName = 'AddTagModal';

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

const Button = styled.button`
  width: 222px;
  height: 58px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 22px;
  margin-left: 262px;
`;

const TagContainer = styled.div`
  margin-left: 59px;
  width: 610px;
  height: 430px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 11px;
  row-gap: 20px;
  overflow-y: auto;
`;

const Line = styled.div`
  width: 699px;
  height: 0px;
  border: 1px solid #7f7f7f;
  margin-top: 48px;
  margin-bottom: 38px;
  margin-left: 23px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 58px;
  margin-right: 49px;
  margin-bottom: 64px;
`;

const Icons = styled.div`
  display: flex;
  column-gap: 16px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const Dialog = styled.dialog`
  padding-top: 55px;
  padding-bottom: 40px;
  position: relative;
  width: 746px;
  height: 691px;
  border-radius: 50px;
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

export default AddTagModal;
