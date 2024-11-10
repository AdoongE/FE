import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import checkIcon from '../assets/icons/Check.png';
import { FaArrowRight } from 'react-icons/fa';
import { Icon } from '@iconify/react';

const InitialContentAdd = ({ onContentSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const option = event.target.name;
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
    onContentSelect(option === selectedOption ? null : option);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    window.history.back(); // 이전 페이지로 이동
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
        <Button onClick={openModal}>
          나가기
          <ArrowIcon />
        </Button>
      </RightDiv>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Icon
              icon="ph:warning-circle-thin"
              width="148"
              height="148"
              style={{ color: '#41c3ab', marginBottom: 34 }}
            />
            <ModalTitle>지금 나가시겠습니까?</ModalTitle>
            <ModalText>지금까지 설정한 모든 항목이 초기화됩니다.</ModalText>
            <ButtonContainer>
              <ModalButton className="no" onClick={closeModal}>
                취소
              </ModalButton>
              <ModalButton className="ok" onClick={handleConfirm}>
                확인
              </ModalButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
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

// 모달 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 56.25rem;
  height: 32.438rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 40px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 0.625rem;
`;

const ModalText = styled.h2`
  font-size: 26px;
  color: #4f4f4f;
  font-family: 'Pretendard-Regular';
  margin-bottom: 1.875rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
  height: 3.75rem;
  width: 9.125rem;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #f2f2f2;
    color: black;
  }
`;

export default InitialContentAdd;

InitialContentAdd.propTypes = {
  onContentSelect: PropTypes.string.isRequired,
};
