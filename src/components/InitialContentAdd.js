import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import checkIcon from '../assets/icons/Check.png';
import { FaArrowRight } from 'react-icons/fa';

const InitialContentAdd = ({ onContentSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (event) => {
    const option = event.target.name;
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
    onContentSelect(option === selectedOption ? null : option);
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지 이동
  };

  return (
    <MainDiv>
      <LeftDiv>
        <TitleDiv placeholder="제목을 입력하세요 (선택)" />
        <Label>저장할 콘텐츠의 형식을 선택하세요.</Label>
        <Group>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="link"
              checked={selectedOption === 'link'}
              onChange={handleCheckboxChange}
            />
            <span>링크</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="image"
              checked={selectedOption === 'image'}
              onChange={handleCheckboxChange}
            />
            <span>이미지</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <TypeBox
              type="checkbox"
              name="pdf"
              checked={selectedOption === 'pdf'}
              onChange={handleCheckboxChange}
            />
            <span>PDF</span>
          </CheckboxLabel>
        </Group>
      </LeftDiv>
      <RightDiv>
        <Button onClick={handleGoBack}>
          나가기
          <ArrowIcon />
        </Button>
      </RightDiv>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  padding-top: 20vh;
  position: relative;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1334px;
`;

const TitleDiv = styled.input`
  font-size: 40px;
  color: #9f9f9f;
  border: none;
  border-bottom: 2px solid #9f9f9f;
  margin-bottom: 1.813rem;
  padding-bottom: 10px;

  &::placeholder {
    font-size: 40px;
    color: #9f9f9f;
  }
`;

const Label = styled.label`
  font-size: 24px;
  color: #9f9f9f;
  margin-bottom: 0.938rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
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

const RightDiv = styled.div`
  position: absolute;
  right: 0;
  top: 16vh;
  padding-right: 64px;
`;

const Button = styled.button`
  width: 152px;
  height: 57px;
  color: #4f4f4f;
  font-size: 24px;
  font-weight: 500;
  background-color: #dcdada;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const ArrowIcon = styled(FaArrowRight)`
  font-size: 24px;
  color: #4f4f4f;
  transform: scale(0.7);
`;

export default InitialContentAdd;

InitialContentAdd.propTypes = {
  onContentSelect: PropTypes.string.isRequired,
};
