import axios from 'axios';

// const token = localStorage.getItem('jwtToken');
const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3NDIxMjQ1MzV9.FJRjb_8pAnhcRVACXQZWjRmcTkUMfHUObSPNNYqD8S8';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance, token };
