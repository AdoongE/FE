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
              width: '1.25vw',
              height: '1.25vw',
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
  margin-left: 4.479vw; /* 86px */
  margin-bottom: 0.459vw; /* 8.81px */
  align-items: center;
  width: 36.927vw; /* 709px */
  border-bottom: 0.052vw solid #9f9f9f; /* 1px */
  gap: 0.521vw; /* 10px */
`;

const LinkInput = styled.input`
  height: 2.292vw; /* 44px */
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  width: 33.333vw; /* 640px */
  color: #4f4f4f;
  font-size: 1.042vw; /* 20px */
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
  font-size: 1.563vw; /* 30px */
`;

export default LinkUploader;
