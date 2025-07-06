import { axiosInstance } from './axios-instance';

export const ContentEditHandler = async (seedType, data, images, pdfs, Id) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/seed/${Id}`, data);

    if (response.data.status.code === 200) {
      console.log('콘텐츠 수정 성공:', response.data.status.message);

      if (seedType !== 'LINK') {
        try {
          const formData = new FormData();

          if (seedType === 'IMAGE') {
            for (const image of images) {
              const blob = await fetch(image.preview).then((res) => res.blob());
              const file = new File([blob], image.label, { type: blob.type });
              formData.append('file', file);
            }
          } else if (seedType === 'PDF') {
            for (const pdf of pdfs) {
              const blob = await fetch(pdf.preview).then((res) => res.blob());
              const file = new File([blob], pdf.label, { type: blob.type });
              formData.append('file', file);
            }
          }

          const res = await axiosInstance.patch(`/api/v1/seed/${Id}`, formData);
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
