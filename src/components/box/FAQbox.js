import React, { useState } from 'react';
import styled from 'styled-components';
import ChevronDown from '../../assets/icons/chevron-down.svg';

function FAQbox({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetail = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Box>
        <SubBox>
          <Num>Q{faq.order}.</Num>
          <Category>{faq.type}</Category>
          <Question>{faq.question}</Question>
        </SubBox>
        <ChevronIcon
          src={ChevronDown}
          alt="펼치기"
          isOpen={isOpen}
          onClick={handleOpenDetail}
        />
      </Box>
      <Line />
      {isOpen && (
        <OpenBox>
          <Num>A.</Num>
          <Detail>{faq.answer}</Detail>
        </OpenBox>
      )}
    </div>
  );
}

const Detail = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  white-space: pre-line;
`;

const OpenBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 50px;
  width: 978px;
  height: fit-content;
  padding: 36px 40px 36px 24px;
  background: var(--side-bar, #f8fbfb);
`;

const ChevronIcon = styled.img`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const Line = styled.div`
  width: 978px;
  height: 1px;
  background-color: var(--gray3);
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 88px;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
`;

const Num = styled.div`
  color: var(--green-green2, var(--green2, #41c3ab));
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
`;

const Category = styled.div`
  color: var(--gray-gray1, #4f4f4f);
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  margin-right: 60px;
  margin-left: 43px;
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
`;

export default FAQbox;
