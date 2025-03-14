import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance, token };
