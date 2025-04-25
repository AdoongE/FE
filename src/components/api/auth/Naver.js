const handleNaverLogin = () => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_AUTH_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URL;
  const STATE = Math.random().toString(36).substring(2, 15);
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  window.location.href = NAVER_AUTH_URL;
};

export default handleNaverLogin;
