// import axios from 'axios';

// const token = localStorage.getItem('jwtToken');

// const formData = new FormData();
// formData.append('request', JSON.stringify(request)); // JSON 데이터 추가

// const api = axios.create({
//   baseURL: 'http://52.78.221.255', // 백엔드 서버 주소로 설정
//   headers: {
//     Authorization: `${token}`, // 토큰을 템플릿 리터럴로 추가
//   },
// });

// export const ContentAddHandler = async (data) => {
//   // API 요청에 보낼 데이터 객체 생성
//   const requestData = {
//     ...data,
//   };

//   // API 요청에 보낼 데이터 전체 출력
//   console.log('콘텐츠 생성 요청 데이터:', requestData);

//   try {
//     const response = await api.post('/api/v1/content/', requestData);
//     if (response.data.status.code === 200) {
//       console.log('콘텐츠 생성 성공: ', response.data.status.message);
//       console.log(response.data.results.msg);
//       return response;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const api = axios.create({
  baseURL: 'http://52.78.221.255',
  headers: {
    Authorization: `${token}`,
  },
});

export const ContentAddHandler = async (data) => {
  const formData = new FormData();
  formData.append('request', JSON.stringify(data));

  console.log('콘텐츠 생성 요청 데이터(FormData):', data);

  try {
    const response = await api.post('/api/v1/content/', formData);

    if (response.data.status.code === 200) {
      console.log('콘텐츠 생성 성공:', response.data.status.message);
      console.log('서버 응답 데이터:', response.data.results.msg);
      return response;
    }
  } catch (error) {
    console.error('콘텐츠 생성 중 오류 발생:', error);
    throw error;
  }
};
