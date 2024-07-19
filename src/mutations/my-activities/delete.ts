import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Body {
  activityId: number;
}

const deleteActivity = async ({ activityId }: Body) => {
  const instance = getInstance();
  const res = await instance.delete(`/my-activities/${activityId}`);

  return res.data;
};

export const deleteActivityMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: deleteActivity,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 체험 삭제에 실패하였습니다.';

    if (error instanceof AxiosError) {
      toast(error.response?.data.data.message ?? defaultMsg);
      return;
    }

    toast(defaultMsg);
  },
};
