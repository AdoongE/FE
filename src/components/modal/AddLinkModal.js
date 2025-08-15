import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

const AddLinkModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [seedLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    onClose(); // 부모 컴포넌트에서 전달된 onClose 호출
    setContentLinks(''); // 상태 초기화
  };

  const handleAddLink = async () => {
    if (seedLinks === '') {
      setErrorMessage('링크를 입력해주세요.');
      return;
    }

    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/i;
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[^&]+/;
    const naverNewsRegex = /^https:\/\/n\.news\.naver\.com/;

    if (!regex.test(seedLinks)) {
      setErrorMessage('유효하지 않은 링크입니다.');
      return;
    } else {
      setIsLoading(true);

      if (youtubeRegex.test(seedLinks)) {
        console.log('유튜브 링크:', seedLinks);
        try {
          const params = { youtubeUrl: seedLinks };
          const response = await axiosInstance.post(
            '/api/v1/simplification/youtube',
            null,
            { params },
          );
          const simplificationInfo = response.data?.results[0];
          if (response.data.status?.code === 200) {
            console.log('유튜브 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', seedLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            navigate('/content-add', {
              state: {
                status: 200,
                title: simplificationInfo.title || '',
                summary: simplificationInfo.summary || '',
                tags: tagsArray || [],
                link: seedLinks,
              },
            });
          }
        } catch (error) {
          console.error('유튜브 링크 간략화 실패:', error);
        } finally {
          setIsLoading(false);
        }
      } else if (naverNewsRegex.test(seedLinks)) {
        console.log('네이버 뉴스 링크:', seedLinks);
        try {
          const params = { naverNewsUrl: seedLinks };
          const response = await axiosInstance.post(
            '/api/v1/simplification/naver-news',
            null,
            { params },
          );
          const simplificationInfo = response.data?.results[0];
          if (response.data.status?.code === 200) {
            console.log('네이버 뉴스 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', seedLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            navigate('/content-add', {
              state: {
                status: 200,
                title: simplificationInfo.title || '',
                summary: simplificationInfo.summary || '',
                tags: tagsArray || [],
                link: seedLinks,
              },
            });
          }
        } catch (error) {
          console.error('네이버 뉴스 링크 간략화 실패:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('간략화 불가 링크 생성 성공');
        navigate('/content-add', {
          state: {
            status: 400,
            title: '',
            summary: '',
            tags: [],
            link: seedLinks,
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
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={() => closeModal()}
          />
        </TopDiv>
        <Title>링크를 입력하세요.</Title>

        <Input
          value={seedLinks}
          onChange={(event) => {
            setContentLinks(event.target.value);
            setErrorMessage('');
          }}
          placeholder="링크를 입력하면 제목과 태그, 요약 내용이 자동 입력됩니다."
          hasError={!!errorMessage}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleAddLink}>
            {isLoading ? (
              <BeatLoader color="rgba(255, 255, 255, 1)" margin={0} size={5} />
            ) : (
              <div>완료</div>
            )}
          </Button>
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
  width: 542px;
  padding: 40px 36px;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  color: #f00;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 14px;
  margin-bottom: 5px;
  margin-top: 4px;
`;

const Input = styled.input`
  padding-left: 15px;
  background-color: #f6f6f6;
  margin-bottom: 7px;
  height: 45px;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  border: ${({ hasError }) => (hasError ? '1px solid #FF0000' : 'none')};
  box-shadow: none;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  border-radius: 40px;
  background: #41c3ab;
  border: 0;
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
`;

const ModalTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-family: 'Pretendard-Regular';
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const Title = styled.div`
  color: #4f4f4f;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 21px;
`;

export default AddLinkModal;
