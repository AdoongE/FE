import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Button, Open, Options, Text } from './style';
import ContentDeleteModal from '../ContentDeleteModal';

function ContentDropdown({ contentId, fetchData }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const navigate = useNavigate();

  const dialogRef = useRef(null);
  const optionsRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  // 케밥 열고 닫기
  const handleKebabToggle = (e) => {
    setIsKebabOpen((prevValue) => !prevValue);
    e.stopPropagation();
  };

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
        <Icon
          icon="pepicons-pencil:dots-y"
          style={{
            width: '18px',
            height: '18px',
          }}
        />
      </Button>
      {isKebabOpen && (
        <Open ref={optionsRef}>
          <Options onClick={handleDetail}>
            <Icon
              icon="tabler:dots"
              style={{
                width: '12px',
                height: '12px',
                color: '#4F4F4F',
              }}
            />
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
              <Icon
                icon="mage:trash"
                style={{
                  width: '12px',
                  height: '12px',
                  color: '#4F4F4F',
                }}
              />
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

export default ContentDropdown;
