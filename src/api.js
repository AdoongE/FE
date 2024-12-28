// src/api.js
import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://52.78.221.255', // 백엔드 서버 주소로 설정
  headers: {
    'Content-Type': 'application/json', // 필요에 따라 헤더 추가
  },
});

export default api;
