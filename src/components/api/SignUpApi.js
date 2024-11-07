import axios from 'axios';

export const SignUpHandler = async (data) => {
  const AccessToken = localStorage.getItem('accessToken');
  const SocialType = localStorage.getItem('socialType');

  try {
    const response = await axios.post('/api/v1/auth/signup', {
      socialType: SocialType,
      accessToken: AccessToken,
      ...data,
    });
    if (response.data.status.code === 200) {
      console.log('회원가입 성공: ', response.data.status.message);
    } else if (response.data.status.code === 400) {
      console.log('회원가입 실패: ', response.data.status.message);
    }
  } catch (error) {
    console.error(error);
  }
};
