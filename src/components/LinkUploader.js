import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

function LinkUploader({ value }) {
  return (
    <div>
      <Inputs>
        <Name>링크 업로드*</Name>
        <InputContainer>
          <Icon
            icon="ic:round-link"
            style={{
              width: '24px',
              height: '24px',
              color: '#4F4F4F',
            }}
          />
          <LinkInput
            placeholder="링크를 업로드하세요."
            readOnly
            value={value}
          />
        </InputContainer>
      </Inputs>
    </div>
  );
}

const InputContainer = styled.div`
  display: flex;
  margin-left: 86px;
  margin-bottom: 8.81px;
  align-items: center;
  width: 709px;
  border-bottom: 1px solid #9f9f9f;
  gap: 10px;
`;

const LinkInput = styled.input`
  height: 44px;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  width: 640px;
  color: #4f4f4f;
  font-size: 20px;
  font-weight: 400;
  align-items: center;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 30px;
`;

export default LinkUploader;
