import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.78.221.255', // 백엔드 서버 주소로 설정
  headers: {
    Authorization: 'Bearer <JWT_TOKEN>', // 필요 시 헤더 추가
  },
});

export const ContentAddHandler = async (data) => {
  // API 요청에 보낼 데이터 객체 생성
  const requestData = {
    ...data,
  };

  // API 요청에 보낼 데이터 전체 출력
  console.log('콘텐츠 생성 요청 데이터:', requestData);

  try {
    const response = await api.post('/api/v1/content', requestData);
    if (response.data.status.code === 200) {
      console.log('콘텐츠 생성 성공: ', response.data.status.message);
      return response;
    } else {
      // 실패 시 에러를 던짐
      throw new Error(response.data.status.message || '콘텐츠 생성 실패');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
