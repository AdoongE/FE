import React from 'react';
import styled from 'styled-components';

function InfoHeader({ title, subTitle, center }) {
  return (
    <Header center={center}>
      <Titles>{title}</Titles>
      <Short>{subTitle} </Short>
    </Header>
  );
}

const Short = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #9f9f9f;
  margin-top: 18px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  ${(props) => (props.center === false ? '' : 'align-items: flex-start;')}
  flex-direction: column;
  margin-top: 72px;
`;

const Titles = styled.div`
  font-weight: 600;
  font-size: 32px;
  text-align: center;
`;

export default InfoHeader;
