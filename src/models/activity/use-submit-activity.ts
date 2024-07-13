import { apiInstance } from '@/lib/axios';
import { useModal } from '@/store/useModal';
import { ActivitySettingData } from '@/types/activity';

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
    } catch (error) {
      alert('체험 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { onSubmit };
};

export default useSubmitActivity;
