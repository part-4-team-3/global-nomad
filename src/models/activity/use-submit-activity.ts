import { apiInstance } from '@/lib/axios';
import { useModal } from '@/store/useModal';

interface ActivitySettingData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: TimeSlotData[];
  subImageUrls: string[];
  bannerImageUrl: string;
}

interface TimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
}

const useSubmitActivity = (data: ActivitySettingData) => {
  const { setIsOpen } = useModal();
  const onSubmit = async () => {
    const openModal = (modalKey: string) => {
      setIsOpen(modalKey);
    };
    try {
      const response = await apiInstance.post<ActivitySettingData>('activities', data);
      openModal('alertMessage');
    } catch (error) {
      alert('체험등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { onSubmit };
};

export default useSubmitActivity;
