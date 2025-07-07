import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function InfoBox({ info }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box important={info.isImportant}>
        <SubBox>
          <Word>{info.type}</Word>
          <TagBox>
            {info.isNew && <Tag>NEW</Tag>}
            {info.isImportant && <Tag important>중요</Tag>}
          </TagBox>
          <Title
            onClick={() =>
              navigate(`/info-detail/${info.id}`, {
                state: {
                  id: info.id,
                  title: info.title,
                  createdAt: info.createdAt,
                  content: info.content,
                },
              })
            }
          >
            {info.title}
          </Title>
        </SubBox>
        <Word>{info.createdAt}</Word>
      </Box>
      <Line />
    </div>
  );
}

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

const Tag = styled.div`
  border-radius: 28px;
  display: inline-flex;
  padding: 6.5px 12px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  background: ${({ important }) => (important ? '#383838' : '#41c3ab')};
`;

const Word = styled.div`
  color: var(--gray-gray1, #4f4f4f);
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  margin-right: 60px;
  margin-left: 43px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  margin-left: 12px;
  cursor: 'pointer';
`;

const Line = styled.div`
  width: 978px;
  height: 1px;
  background-color: var(--gray3);
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 88px;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
  background: ${({ important }) => (important ? '#F8FBFB' : '#FFF')};
`;

export default InfoBox;
