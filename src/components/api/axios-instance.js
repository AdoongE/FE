// import axios from 'axios';

// const token = localStorage.getItem('jwtToken');

// const axiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_SERVER_URL}`,
//   headers: {
//     Authorization: `${token}`,
//   },
// });

// export { axiosInstance };

import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzgzODAyMDg1IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3MzcxNDQxNjJ9.77u2w40RJQ66T-ZEa1e7TdkT-pGa7VfUbdE8CRneJMQ ';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { axiosInstance };
