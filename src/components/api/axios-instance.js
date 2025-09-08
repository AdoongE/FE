import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isTokenExpired = false;

axiosInstance.interceptors.response.use((response) => {
  if (response && response.data.status.code === 401) {
    if (!isTokenExpired) {
      isTokenExpired = true;
      alert('토큰이 만료되었습니다. 로그인 페이지로 이동합니다.');
      localStorage.removeItem('jwtToken');
      window.location.href = '/';
    }
  } else {
    return response;
  }
});

export { axiosInstance };
