import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const api = axios.create({
  baseURL: 'http://52.78.221.255',
  headers: {
    Authorization: `${token}`,
  },
});

export const ContentEditHandler = async (data, Id) => {
  const formData = new FormData();
  formData.append('request', JSON.stringify(data));
  console.log('수정 Id 값:', Id);

  console.log('콘텐츠 수정 요청 데이터:', data);
  try {
    const response = await api.patch(`/api/v1/content/${Id}`, formData);

    if (response.data.status.code === 200) {
      console.log('콘텐츠 수정 성공:', response.data.status.message);
      console.log('서버 응답 데이터:', response.data.results.msg);
      return response;
    }
  } catch (error) {
    console.error('콘텐츠 수정 중 오류 발생:', error);
    throw error;
  }
};
