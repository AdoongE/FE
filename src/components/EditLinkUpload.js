import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddLinkModal from './modal/EditAddLinkModal';
import { font } from '../styles/font';

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
            <LinkIcon icon="ic:round-link" />
            <LinkInput
              placeholder="링크를 업로드하세요."
              readOnly
              value={value}
            />
            <CancelIcon onClick={handleDeleteLink} icon="ic:round-close" />
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
  gap: 12px;
`;

const InputButton = styled.button`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  ${font.title3}
  background-color: var(--gray2);
  padding: 8px 12px;
`;

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
  vertical-align: middle;
`;

const LinkInput = styled.input`
  flex-grow: 1;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  ${font.title4}
  color: var(--gray1);
  border: 0;
  &:focus {
    outline: none;
  }
`;

const CancelIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  color: var(--gray1);
  vertical-align: middle;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

export default EditLinkUpload;
