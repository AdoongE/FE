import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddLinkModal from './modal/AddLinkModal';
import Alert from '@mui/material/Alert';

function LinkUploader({ value, onChange }) {
  const LinkRef = useRef(null);

  const showLinkModal = () => {
    LinkRef.current?.showModal();
  };

  const handleConfirm = (newLink) => {
    const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/;
    const isValid = regex.test(newLink);

    if (isValid) {
      onChange(newLink);
    } else {
      <Alert severity="info" sx={{ bgcolor: '#F2F2F2' }}>
        유효하지 않은 링크입니다.
      </Alert>;
    }
  };

  return (
    <div>
      <Inputs>
        <Name>링크 업로드*</Name>
        <div>
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
              icon="ic:round-close"
              style={{
                width: '24px',
                height: '24px',
                color: '#4F4F4F',
              }}
            />
            <InputButton onClick={() => showLinkModal()}>
              + 링크 업로드
            </InputButton>
            <AddLinkModal ref={LinkRef} onConfirm={handleConfirm} />
          </InputContainer>
          <Line />
        </div>
      </Inputs>
    </div>
  );
}

const Line = styled.div`
  width: 794px;
  height: 0;
  border: 1px solid #9f9f9f;
  margin-left: 80px;
`;

const InputButton = styled.button`
  width: fit-content;
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
  margin-left: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-left: 86px;
  margin-bottom: 8.81px;
  align-items: center;
`;

const LinkInput = styled.input`
  margin-left: 10px;
  height: 44px;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  width: 570px;
  color: #4f4f4f;
  font-size: 20px;
  font-weight: 400;
  align-items: center;
  border: 0;
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