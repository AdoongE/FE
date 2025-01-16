import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';
import { useNavigate } from 'react-router-dom';

const AddLinkModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [contentLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    onClose(); // 부모 컴포넌트에서 전달된 onClose 호출
    setContentLinks(''); // 상태 초기화
  };

  const handleAddLink = async () => {
    if (contentLinks === '') {
      setErrorMessage('링크를 입력해주세요.');
      return;
    }

    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/i;
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[^&]+/;
    const naverNewsRegex = /^https:\/\/n\.news\.naver\.com/;

    if (!regex.test(contentLinks)) {
      setErrorMessage('유효하지 않은 링크입니다.');
      return;
    } else {
      if (youtubeRegex.test(contentLinks)) {
        console.log('유튜브 링크:', contentLinks);
        try {
          const params = { youtubeUrl: contentLinks };
          const response = await axiosInstance.post(
            '/api/v1/simplification/youtube/v2',
            null,
            { params },
          );
          const simplificationInfo =
            response.data?.results[0]?.simplificationInfo;
          if (response.data.status?.code === 200) {
            console.log('유튜브 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', contentLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            navigate('/content-add', {
              state: {
                status: 200,
                title: simplificationInfo.title || '',
                summary: simplificationInfo.summary || '',
                tags: tagsArray || [],
                link: contentLinks,
              },
            });
          }
        } catch (error) {
          console.error('유튜브 링크 간략화 실패:', error);
        }
      } else if (naverNewsRegex.test(contentLinks)) {
        console.log('네이버 뉴스 링크:', contentLinks);
        try {
          const params = { naverNewsUrl: contentLinks };
          const response = await axiosInstance.post(
            '/api/v1/simplification/naver-news/v2',
            null,
            { params },
          );
          const simplificationInfo =
            response.data?.results[0]?.simplificationInfo;
          if (response.data.status?.code === 200) {
            console.log('네이버 뉴스 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', contentLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            navigate('/content-add', {
              state: {
                status: 200,
                title: simplificationInfo.title || '',
                summary: simplificationInfo.summary || '',
                tags: tagsArray || [],
                link: contentLinks,
              },
            });
          }
        } catch (error) {
          console.error('네이버 뉴스 링크 간략화 실패:', error);
        }
      } else {
        console.log('간략화 불가 링크 생성 성공');
        navigate('/content-add', {
          state: {
            status: 400,
            title: '',
            summary: '',
            tags: [],
            link: contentLinks,
          },
        });
      }
      setErrorMessage('');
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TopDiv>
          <ModalTitle>씨드 추가</ModalTitle>
          <Icon
            icon="line-md:close"
            style={{ width: '1.875vw', height: '1.875vw', cursor: 'pointer' }}
            onClick={() => closeModal()}
          />
        </TopDiv>
        <Title>링크를 입력하세요.</Title>

        <Input
          value={contentLinks}
          onChange={(event) => setContentLinks(event.target.value)}
          placeholder="링크를 입력하면 제목과 태그, 요약 내용이 자동 입력됩니다."
        />
        {errorMessage === '링크를 입력해주세요.' ? (
          <Error>{errorMessage}</Error>
        ) : errorMessage === '' ? (
          <Error></Error>
        ) : (
          <Error>유효하지 않은 링크입니다.</Error>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleAddLink}>완료</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

AddLinkModal.displayName = 'AddLinkModal';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 30.208vw; /* 580px */
  padding: 2.083vw; /* 40px */
  border-radius: 2.604vw; /* 20px */
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  color: #f00;
  font-family: 'Pretendard Variable';
  font-size: 0.625vw; /* 12px */
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 0.729vw; /* 14px */
  margin-bottom: 0.104vw; /* 2px */
  margin-top: 0.365vw; /* 7px */
`;

const Input = styled.input`
  padding-left: 0.99vw; /* 19px */
  background-color: #f6f6f6;
  margin-bottom: 0.365vw; /* 7px */
  width: 29.115vw; /* 559px */
  height: 2.656vw; /* 51px */
  font-size: 1.146vw; /* 22px */
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  border: none;
  box-shadow: none;
  &::placeholder {
    font-size: 0.938vw; /* 18px */
    font-weight: 400;
    transform: translateY(-0.104vw); /* -2px */
  }
`;

const Button = styled.button`
  border-radius: 2.604vw; /* 50px */
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 0.729vw 1.563vw; /* 14px 30px */
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  width: 5.156vw; /* 99px */
  height: 2.813vw; /* 54px */
`;

const ModalTitle = styled.h2`
  font-size: 1.667vw; /* 32px */
  font-weight: 700;
  font-family: 'Pretendard-Regular';
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.229vw; /* 62px */
`;

const Title = styled.div`
  color: #4f4f4f;
  font-family: 'Pretendard Variable';
  font-size: 1.25vw; /* 24px */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1.094vw; /* 21px */
`;

export default AddLinkModal;
