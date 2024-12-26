import { axiosInstance } from './axios-instance';

export const MyTag = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/tag/member');
    const myTags = response.data.results || [];
    console.log('나의 태그 목록: ', myTags);

    if (response.status) {
      console.log('나의 태그 가져오기 성공');
      return myTags;
    } else {
      console.error('나의 태그 가져오기 실패');
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
};
