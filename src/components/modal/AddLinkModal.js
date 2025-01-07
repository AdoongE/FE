import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';
import { useNavigate } from 'react-router-dom';

const AddLinkModal = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const [contentLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    ref.current?.close();
    setContentLinks('');
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
            console.log('status: ', response.data.status.code);
            console.log('title: ', simplificationInfo.title || '');
            console.log('summary: ', simplificationInfo.summary || '');
            console.log('tags: ', simplificationInfo.tags || '');
            console.log('link: ', contentLinks);
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
            console.log('status: ', response.data.status.code);
            console.log('title: ', simplificationInfo.title || '');
            console.log('summary: ', simplificationInfo.summary || '');
            console.log('tags: ', simplificationInfo.tags || '');
            console.log('link: ', contentLinks);
            navigate('/content-add', {
              state: {
                status: 200,
                title: simplificationInfo.title || '',
                summary: simplificationInfo.summary || '',
                tags: simplificationInfo.tags || '',
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
            tags: '',
            link: contentLinks,
          },
        });
      }
      setErrorMessage('');
      closeModal();
    }
  };

  useEffect(() => {
    if (ref.current) {
      const dialogElement = ref.current;
      const handleClickOutside = (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
          setContentLinks('');
        }
      };
      dialogElement.addEventListener('click', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  return (
    <Dialog ref={ref}>
      <TopDiv>
        <ModalTitle>씨드 추가</ModalTitle>
        <Icon
          icon="line-md:close"
          style={{ width: '36px', height: '36px', cursor: 'pointer' }}
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
    </Dialog>
  );
});

AddLinkModal.displayName = 'AddLinkModal';

const Error = styled.div`
  color: #f00;
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 14px;
  margin-bottom: 2px;
  margin-top: 7px;
`;

const Input = styled.input`
  padding-left: 19px;
  background-color: #f6f6f6;
  // border: 0;
  // border: $({({errorMessage})=>errorMessage ? '1px solid red' : 'none')};
  margin-bottom: 7px;
  width: 559px;
  height: 51px;
  font-size: 22px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  border: none;
  box-shadow: none;
  &::placeholder {
    font-size: 18px;
    font-weight: 400;
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  border-radius: 50px;
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 22px;
  font-weight: 500;
  width: 99px;
  height: 54px;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  font-family: 'Pretendard-Regular';
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;

const Title = styled.div`
  color: #4f4f4f;
  font-family: 'Pretendard Variable';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 21px;
`;

const Dialog = styled.dialog`
  // block 활성화하면 체크박스 모달이랑 동시에 화면에 나옴
  // display: block;
  position: fixed;
  z-index: 1000;
  visibility: visible;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 580px;
  height: 280px;
  border-radius: 50px;
  background: #fff;
  border: 0;
  padding: 40px 50px;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

export default AddLinkModal;
