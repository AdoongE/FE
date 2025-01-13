import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

function TagHeader() {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div>
      <Header>
        <Title>검색할 태그를 선택하세요.</Title>

        <Icons>
          <Icon
            icon="ri:reset-left-line"
            style={{
              width: '1.667vw',
              height: '1.667vw',
              color: 'black',
            }}
            onClick={handleReset}
          />
          <Icon
            icon="ic:round-close"
            style={{
              width: '1.88vw' /* 36px */,
              height: '1.88vw' /* 36px */,
              color: 'black',
            }}
            onClick={handleClose}
          />
        </Icons>
      </Header>
      <Word>태그 선택</Word>
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
            width: '0.94vw' /* 18px */,
            height: '0.94vw' /* 18px */,
            color: '#4F4F4F',
          }}
        />
        <div>적절한 태그를 선택해보세요!</div>
      </Short>
    </div>
  );
}

const Short = styled.div`
  display: flex;
  column-gap: 0.52vw; /* 10px */
  color: #4f4f4f;
  font-size: 1.04vw; /* 20px */
  font-weight: 400;
`;

const Option = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#21A58C' : '#9F9F9F')};
`;

const Options = styled.div`
  display: flex;
  column-gap: 0.83vw; /* 16px */
  text-align: center;
  font-size: 1.15vw; /* 22px */
  color: #9f9f9f;
  margin-bottom: 0.63vw; /* 12px */
`;

const Word = styled.div`
  font-size: 1.25vw; /* 24px */
  font-weight: 600;
  margin-bottom: 1.04vw; /* 20px */
`;

const Icons = styled.div`
  display: flex;
  column-gap: 0.83vw; /* 16px */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  margin-bottom: 3.39vw; /* 65px */
`;

const Title = styled.div`
  font-size: 1.67vw; /* 32px */
  font-weight: 600;
`;

export default TagHeader;
