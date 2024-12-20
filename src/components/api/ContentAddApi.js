import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const api = axios.create({
  baseURL: 'http://52.78.221.255',
  headers: {
    Authorization: `${token}`,
    'Content-Type': 'application/json',
  },
});
const api_ = axios.create({
  baseURL: 'http://52.78.221.255',
  headers: {
    Authorization: `${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const ContentAddHandler = async (dataType, data, images) => {
  try {
    const response = await api.post('/api/v1/content/', data);

    if (response.data.status.code === 200) {
      console.log('콘텐츠 LINK 생성 성공:', response.data.status.message);

      if (dataType !== 'LINK') {
        try {
          const contentsId = response.data.results[0].contentId;
          const res = await api_.post(
            `/api/v1/content/upload/${contentsId}`,
            images,
          );
          if (res.data.status.code === 200) {
            console.log('콘텐츠 file 생성 성공:', response.data.status.message);
          }
        } catch (error) {
          console.error('콘텐츠 file 생성 중 오류 발생:', error);
          throw error;
        }
      }

      return response;
    } else {
      console.log(response.data.status.code);
      console.log('콘텐츠 LINK 생성 실패:', response.data.status.message);
    }
  } catch (error) {
    console.error('콘텐츠 LINK 생성 중 오류 발생:', error);
    throw error;
  }
};
