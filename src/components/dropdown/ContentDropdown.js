import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import ContentDeleteModal from '../modal/ContentDeleteModal';
import { useNavigate } from 'react-router-dom';
import { font } from '../../styles/font';

function ContentDropdown({ contentId, fetchData }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('contentId: ', contentId);
  }, [contentId]);

  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  // 케밥 열고 닫기
  const handleKebabToggle = (e) => {
    setIsKebabOpen((prevValue) => !prevValue);
    e.stopPropagation();
  };

  const optionsRef = useRef(null);

  const handleKebabClose = (e) => {
    if (!optionsRef.current?.contains(e.relatedTarget)) {
      setIsKebabOpen(false);
    }
  };

  const handleDetail = (e) => {
    e.stopPropagation();
    navigate('/content-view', { state: { contentId: contentId } });
    setIsKebabOpen(false);
  };

  return (
    <div>
      <Button onClick={handleKebabToggle} onBlur={handleKebabClose}>
        <DotIcon icon="pepicons-pencil:dots-y" />
      </Button>
      {isKebabOpen && (
        <Open ref={optionsRef}>
          <Options onClick={handleDetail}>
            <DropDownIcon icon="tabler:dots" />
            <Text>세부 정보 보기</Text>
          </Options>
          <div>
            <Options
              onClick={(e) => {
                e.stopPropagation();
                setIsKebabOpen(false);
                showModal();
              }}
            >
              <DropDownIcon icon="mage:trash" />
              <Text>삭제하기</Text>
            </Options>
          </div>
        </Open>
      )}
      <ContentDeleteModal
        ref={dialogRef}
        contentId={contentId}
        fetchData={fetchData}
      />
    </div>
  );
}

const DotIcon = styled(Icon)`
  width: '18px';
  height: 18px;
`;

const DropDownIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  color: #4f4f4f;
`;

const Text = styled.div`
  margin-left: 11px;
  ${font.body2}
`;

const Options = styled.button`
  width: 110px;
  border: 0;
  background-color: white;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  color: black;
  border: 0;
  position: relative;
  background-color: transparent;
`;

const Open = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  align-items: flex-start;
  width: 120px;
  height: 52px;
  border-radius: 6.518px;
  background-color: white;
  color: #4f4f4f;
  padding: 6px 0px;
`;

export default ContentDropdown;
