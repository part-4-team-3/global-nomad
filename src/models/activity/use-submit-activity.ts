import { apiInstance } from '@/lib/axios';
import { useModal } from '@/store/useModal';
import { ActivitySettingData } from '@/types/activity';
import axios, { AxiosError } from 'axios';

const useSubmitActivity = (data: ActivitySettingData) => {
  const { setIsOpen } = useModal();

  /** 체험 등록 api 등록 */
  const onSubmit = async () => {
    const openModal = (modalKey: string) => {
      setIsOpen(modalKey);
    };
    try {
      const response = await apiInstance.post<ActivitySettingData>('activities', data);
      openModal('alertMessage');
    } catch (error: unknown) {
      console.log(error);
      console.log(axios.isAxiosError(error));
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        {
          /* 모달창으로 수정예정 */
        }
        alert(errorMessage);
      }
    }
  };

  return { onSubmit };
};

export default useSubmitActivity;
