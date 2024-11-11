import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const AddTagModal = forwardRef(({ onConfirm }, ref) => {
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

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleApply = () => {
    onConfirm(selectedTags);
    closeModal();
  };

  const closeModal = () => {
    ref.current?.close();
  };

  useEffect(() => {
    if (ref.current) {
      const dialogElement = ref.current;

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
      dialogElement.addEventListener('click', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  return (
    <Dialog ref={ref}>
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
          />
          <Icon
            icon="ic:round-close"
            style={{
              width: '36px',
              height: '36px',
              color: 'black',
            }}
            onClick={closeModal}
          />
        </Icons>
      </Head>
      <TagContainer>
        {TagOption.map((tag, index) => (
          <TagItem key={index} onClick={() => handleSelectTag(tag)}>
            {tag}
          </TagItem>
        ))}
      </TagContainer>
      <Line />
      <Button onClick={handleApply}>적용하기</Button>
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