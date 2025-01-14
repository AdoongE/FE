import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import ContentDeleteModal from '../modal/ContentDeleteModal';
import { useNavigate } from 'react-router-dom';

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
        <Icon
          icon="pepicons-pencil:dots-y"
          style={{
            width: '1.25vw',
            height: '1.25vw',
          }}
        />
      </Button>
      {isKebabOpen && (
        <Open ref={optionsRef}>
          <Options onClick={handleDetail}>
            <Icon
              icon="tabler:dots"
              style={{
                width: '1.042vw',
                height: '1.042vw',
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
              {' '}
              <Icon
                icon="mage:trash"
                style={{
                  width: '1.042vw',
                  height: '1.042vw',
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

const Text = styled.div`
  margin-left: 0.686vw; /* 13.18px */
  font-weight: 400;
  font-size: 0.833vw; /* 16px */
`;

const Options = styled.button`
  width: 7.813vw; /* 150px */
  border: 0;
  height: 1.823vw; /* 35px */
  background-color: white;
  margin-left: 0.417vw; /* 8px */
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
  right: 1.094vw; /* 21px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 9.323vw; /* 179px */
  height: 4.167vw; /* 80px */
  border-radius: 0.522vw; /* 10.03px */
  background-color: white;
  color: #4f4f4f;
  padding-top: 0.729vw; /* 14px */
`;

export default ContentDropdown;
