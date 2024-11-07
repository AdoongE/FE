import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      handleGetToken();
    }
  }, [code]);

  const handleGetToken = async () => {
    try {
      const response = await axios.post(
        `/api/v1/auth/login/kakao/?code=${code}`,
      );

      if (response.data.status.code === 200) {
        console.log('로그인 성공: ', response.data.status.message);

        axios.get('/api/v1/auth/login/kakao', {
          headers: {
            Authorization: `Bearer <JWT_TOKEN>`,
          },
        });

        navigate('/main');
      } else if (response.data.status.code === 404) {
        console.log(response.data.status.message);

        const accessToken = response.data.results.result;
        const socialType = response.data.results.socialType;

        // 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('socialType', socialType);

        navigate('/signup');
      }
    } catch (error) {
      console.error('소셜 로그인 에러', error);
      window.alert('로그인에 실패하였습니다.');
      navigate('/');
    }
  };

  return <div>로그인 중입니다...</div>;
};

export default KakaoRedirect;
