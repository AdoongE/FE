import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddLinkModal from './modal/AddLinkModal';

function LinkUploader({ value, onChange }) {
  const LinkRef = useRef(null);

  const showLinkModal = () => {
    LinkRef.current?.showModal();
  };

  const handleDeleteLink = () => {
    onChange('');
  };

  const handleConfirm = (newLink) => {
    onChange(newLink); // 부모 컴포넌트로 값 전달
  };

  return (
    <div>
      <Inputs>
        <Name>링크 업로드*</Name>
        <LinkDiv>
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
            <Icon
              onClick={handleDeleteLink}
              icon="ic:round-close"
              style={{
                width: '24px',
                height: '24px',
                color: '#4F4F4F',
              }}
            />
          </InputContainer>
          <InputButton type="button" onClick={() => showLinkModal()}>
            + 링크 업로드
          </InputButton>
          <AddLinkModal ref={LinkRef} onConfirm={handleConfirm} />
        </LinkDiv>
      </Inputs>
    </div>
  );
}
const LinkDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const InputButton = styled.button`
  width: 153.19px;
  height: 44.19px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #9f9f9f;
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #9f9f9f;
  padding: 10px 16px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-left: 86px;
  margin-bottom: 8.81px;
  align-items: center;
  width: 709px;
  border-bottom: 1px solid #9f9f9f;
  justify-content: space-between;
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
