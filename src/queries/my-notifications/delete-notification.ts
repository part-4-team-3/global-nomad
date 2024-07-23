import { getInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export const deleteNotification = async (notificationId: number) => {
  const apiInstance = getInstance();
  let response;
  try {
    response = await apiInstance.delete(`my-notifications/${notificationId}`);
    return '삭제가 완료되었습니다';
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.data.message;
    }
  }
};
