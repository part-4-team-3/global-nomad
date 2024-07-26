import { getInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

interface DeleteResponse {
  message: string;
}

const deleteActivity = async (id: number) => {
  const instance = getInstance();
  let res;

  try {
    res = await instance.delete<DeleteResponse>(`activities/${id}`);
    return '삭제가 완료되었습니다';
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data.data.message;
    }
  }
};

export { deleteActivity };
