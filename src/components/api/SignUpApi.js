import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.78.221.255', // 백엔드 서버 주소로 설정
});

export const SignUpHandler = async (data) => {
  const AccessToken = localStorage.getItem('accessToken');
  const SocialType = localStorage.getItem('socialType');

  console.log('AccessToken 회원가입: ', AccessToken);
  console.log('SocialType 회원가입: ', SocialType);

  // API 요청에 보낼 데이터 객체 생성
  const requestData = {
    socialType: SocialType,
    accessToken: AccessToken,
    nickname: data.nickname,
    birthday: data.birthday,
    gender: data.gender,
    occupation: data.occupation,
    field: data.field,
    consentToTermsOfService: data.consentToTermsOfService,
    consentToPersonalInformation: data.consentToPersonalInformation,
    consentToMarketingAndAds: data.consentToMarketingAndAds,
  };

  // API 요청에 보낼 데이터 전체 출력
  console.log('회원가입 요청 데이터:', requestData);
  try {
    const response = await api.post('/api/v1/auth/signup', requestData);

    if (response.data.status.code === 200) {
      console.log('회원가입 성공: ', response.data.status.message);

      // JWT 토큰을 응답 헤더에서 가져옵니다.
      const jwtToken = response.headers['authorization'];

      localStorage.setItem('jwtToken', jwtToken);
      const savedJwtToken = localStorage.getItem('jwtToken');
      console.log('회원가입 JWT Token:', savedJwtToken);

      return response;
    } else {
      // 실패 시 에러를 던짐
      throw new Error(response.data.status.message || '회원가입 실패');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
