import { axiosInstance } from './axios-instance';

export const getFaq = async ({ page, take }) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/faq?page=${page}&size=${take}`,
    );
    const faqList = response.data?.results;
    const totalNum = response.data.metadata?.resultCount;
    console.log('FAQ 목록: ', faqList);
    console.log('FAQ 개수: ', totalNum);

    if (response.status) {
      console.log('FAQ 가져오기 성공');
      return {
        list: faqList,
        count: totalNum,
      };
    } else {
      console.error('FAQ 가져오기 실패');
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

export const getNotice = async ({ page, take }) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/notice?page=${page}&size=${take}`,
    );

    const noticeList = response.data?.results ?? [];
    const totalNum = response.data?.metadata?.resultCount ?? 0;

    return {
      list: noticeList,
      count: totalNum,
    };
  } catch (error) {
    console.error('에러 발생:', error);
    return { list: [], count: 0 };
  }
};

export const getDetailNotice = async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/notice/${id}`);
    return response.data.results[0];
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

export const getTermDetail = async ({ type }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/term/${type}`);
    return response.data.results[0];
  } catch (error) {
    console.error('에러 발생:', error);
  }
};
