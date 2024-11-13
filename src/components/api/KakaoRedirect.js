import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://52.78.221.255', // 백엔드 서버 주소로 설정
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // 필요 시 헤더 추가
  },
});

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // 이미 사용된 인가 코드인지 확인
      const usedCode = sessionStorage.getItem('usedCode');
      if (usedCode === code) {
        console.warn('이미 사용된 인가 코드입니다.');
        return;
      }
      handleGetToken();
    }
  }, []);

  const handleGetToken = async () => {
    try {
      const response = await api.post(`/api/v1/auth/login/kakao?code=${code}`);

      if (response.data.status.code === 200) {
        console.log('로그인 성공: ', response.data.status.message);
        sessionStorage.setItem('usedCode', code);

        // JWT 토큰을 응답 헤더에서 가져옵니다.
        const jwtToken = response.headers['authorization'];

        localStorage.setItem('jwtToken', jwtToken);
        const savedJwtToken = localStorage.getItem('jwtToken');
        console.log('저장된 JWT Token:', savedJwtToken);

        // 메인 페이지로 이동
        navigate('/main');
      } else if (response.data.status.code === 404) {
        console.log(response.data.status.message);

        const accessToken = response.data.results[0].result;
        const socialType = response.data.results[0].socialType;

        // 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('socialType', socialType);

        console.log('AccessToken:', localStorage.getItem('accessToken'));
        console.log('SocialType:', localStorage.getItem('socialType'));

        // 저장 후 확인하고 페이지 이동
        if (
          localStorage.getItem('accessToken') &&
          localStorage.getItem('socialType')
        ) {
          navigate('/signup');
        }
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
