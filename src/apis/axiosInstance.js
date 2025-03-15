import axios from 'axios';

// const token = localStorage.getItem('jwtToken');
const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3NDIwNTk3NjB9.td3L8OF4Pq6d1YAmx_sltuts7xbJCA0NdfbucfXFofs';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance, token };
