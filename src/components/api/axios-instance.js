import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const axiosInstance = axios.create({
  baseURL: 'http://52.78.221.255',
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance };
