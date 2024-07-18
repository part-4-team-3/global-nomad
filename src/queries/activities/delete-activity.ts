import { getInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

const deleteActivity = async (id: number) => {
  const instance = getInstance();
  let res;

  try {
    res = await instance.delete(`activities/${id}`);
    return '삭제가 완료되었습니다';
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data.data.message);
      return err.response?.data.data.message;
    }
  }
};

export { deleteActivity };
