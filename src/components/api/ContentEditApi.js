import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const api = axios.create({
  baseURL: 'http://210.107.205.122:20011',
  headers: {
    Authorization: `${token}`,
  },
});
const api_ = axios.create({
  baseURL: 'http://210.107.205.122:20011',
  headers: {
    Authorization: `${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const ContentEditHandler = async (dataType, data, images, pdfs, Id) => {
  try {
    const response = await api.patch(`/api/v1/content/${Id}`, data);

    if (response.data.status.code === 200) {
      console.log('콘텐츠 수정 성공:', response.data.status.message);

      if (dataType !== 'LINK') {
        try {
          const formData = new FormData();

          if (dataType === 'IMAGE') {
            for (const image of images) {
              const blob = await fetch(image.preview).then((res) => res.blob());
              const file = new File([blob], image.label, { type: blob.type });
              formData.append('file', file);
            }
          } else if (dataType === 'PDF') {
            for (const pdf of pdfs) {
              const blob = await fetch(pdf.preview).then((res) => res.blob());
              const file = new File([blob], pdf.label, { type: blob.type });
              formData.append('file', file);
            }
          }

          const res = await api_.patch(
            `/api/v1/content/uploadModified/${Id}`,
            formData,
          );
          if (res.data.status.code === 200) {
            console.log('콘텐츠 file 수정 성공:', response.data.status.message);
          }
        } catch (error) {
          console.error('콘텐츠 file 수정 중 오류 발생:', error);
          throw error;
        }
      }

      return response;
    } else {
      console.log(response.data.status.code);
      console.log('콘텐츠 수정 실패:', response.data.status.message);
    }
  } catch (error) {
    console.error('콘텐츠 수정 중 오류 발생:', error);
    throw error;
  }
};
