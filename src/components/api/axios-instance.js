import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('토큰이 만료되었습니다. 로그인 페이지로 이동합니다.');
      localStorage.removeItem('jwtToken');
      const navigate = useNavigate();
      navigate('/');
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };
