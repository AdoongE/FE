import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

let isTokenExpired = false;

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('jwtToken');
    const token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzg4MDk3OTIwIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTc2MzAzMjMxNH0.dZd2lfUx_UoGjsP80RXqWy5MMn3G0WgNxDBzvzP9_bU';

    if (!token) {
      if (!isTokenExpired) {
        isTokenExpired = true;
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/';
      }
      throw new axios.Cancel('로그인이 필요합니다.');
    }

    config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
