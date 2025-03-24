import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { font } from '../styles/font';

function LinkUploader({ value }) {
  return (
    <div>
      <Inputs>
        <Name>링크 업로드*</Name>
        <InputContainer>
          <LinkIcon icon="ic:twotone-link" />
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
  margin-left: 77px;
  align-items: center;
  width: 452px;
  border-bottom: 1px solid var(--gray2);
  gap: 12px;
  padding-bottom: 8px;
`;

const LinkIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  color: var(--gray1);
  padding-bottom: 2px;
  vertical-align: middle;
`;

const LinkInput = styled.input`
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  ${font.title4}
  color: var(--gray1);
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
  font-size: 20px;
`;

export default LinkUploader;
