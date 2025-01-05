import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const axiosInstance = axios.create({
  baseURL: 'http://210.107.205.122:20011',
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance };
