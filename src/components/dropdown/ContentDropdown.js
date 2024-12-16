import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import ContentDeleteModal from '../modal/ContentDeleteModal';
import { useNavigate } from 'react-router-dom';

function ContentDropdown({ contentId }) {
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

  const handleDetail = () => {
    navigate('/content-view', { state: { contentId: contentId } });
    setIsKebabOpen(false);
  };

  return (
    <div>
      <Button onClick={handleKebabToggle} onBlur={handleKebabClose}>
        <Icon
          icon="pepicons-pencil:dots-y"
          style={{
            width: '24px',
            height: '24px',
          }}
        />
      </Button>
      {isKebabOpen && (
        <Open ref={optionsRef}>
          <Options onClick={handleDetail}>
            <Icon
              icon="tabler:dots"
              style={{
                width: '20px',
                height: '20px',
                color: '#4F4F4F',
              }}
            />
            <Text>세부 정보 보기</Text>
          </Options>
          <div>
            <Options
              onClick={() => {
                setIsKebabOpen(false);
                showModal();
              }}
            >
              {' '}
              <Icon
                icon="mage:trash"
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#4F4F4F',
                }}
              />
              <Text>삭제하기</Text>
            </Options>
          </div>
        </Open>
      )}
      <ContentDeleteModal ref={dialogRef} contentId={contentId} />
    </div>
  );
}

const Text = styled.div`
  margin-left: 13.18px;
  font-weight: 400;
  font-size: 16px;
`;

const Options = styled.button`
  width: 150px;
  border: 0px;
  height: 35px;
  background-color: white;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  color: black;
  border: 0px;
  position: relative;
`;

const Open = styled.div`
  position: absolute;
  right: 21px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 179px;
  height: 80px;
  border-radius: 10.03px;
  background-color: white;
  color: #4f4f4f;
  padding-top: 14px;
`;

export default ContentDropdown;
