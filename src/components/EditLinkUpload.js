import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddLinkModal from './modal/EditAddLinkModal';

function EditLinkUpload({ value, onChange }) {
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
            <Icon
              onClick={handleDeleteLink}
              icon="ic:round-close"
              style={{
                width: '1.25vw',
                height: '1.25vw',
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
  gap: 1.042vw; /* 20px */
`;

const InputButton = styled.button`
  width: 7.982vw; /* 153.19px */
  height: 2.301vw; /* 44.19px */
  border-radius: 0.521vw; /* 10px */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.052vw solid #9f9f9f; /* 1px */
  color: white;
  font-weight: 500;
  font-size: 1.042vw; /* 20px */
  background-color: #9f9f9f;
  padding: 0.521vw 0.833vw; /* 10px 16px */
`;

const InputContainer = styled.div`
  display: flex;
  margin-left: 4.479vw; /* 86px */
  margin-bottom: 0.459vw; /* 8.81px */
  align-items: center;
  width: 36.927vw; /* 709px */
  border-bottom: 0.052vw solid #9f9f9f; /* 1px */
  justify-content: space-between;
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

export default EditLinkUpload;
