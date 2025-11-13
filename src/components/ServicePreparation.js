import React from 'react';
import styled from 'styled-components';
import clockAlert from '../assets/icons/clock-alert.svg';

const ServicePreparation = () => {
  return (
    <Wrapper>
      <img
        src={clockAlert}
        alt="서비스 준비중"
        style={{ width: '100px', height: '100px' }}
      />
      <Title>
        <span style={{ fontWeight: 'bold' }}>서비스 준비중</span>
        <span style={{ fontWeight: '500' }}>입니다</span>
      </Title>
      <Description>
        보다 나은 서비스를 위하여 페이지를 준비중입니다.
        <br />
        빠른 시일내에 준비하여 찾아뵙겠습니다.
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-top: 24px;
  color: #333;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 12px;
  color: var(--gray2);
  line-height: 1.5;
`;

export default ServicePreparation;
