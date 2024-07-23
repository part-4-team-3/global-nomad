import AlertList from '@/components/organisms/alert-list/AlertList';
import { GetMyNotificationsResponse } from '@/queries/my-notifications/get-my-notifications';
import Image from 'next/image';

interface Props {
  notificationData: GetMyNotificationsResponse;
}

export default function AlertModal({ notificationData }: Props) {
  return (
    <div className="absolute right-[24px] top-[82px] z-20 flex w-[90%] max-w-368pxr flex-col gap-[16px] rounded-[10px] border border-var-gray5 bg-var-green2 p-[20px] shadow-[0_2px_8px_0_rgba(120,116,134,0.25)]">
      <div className="flex items-center justify-between">
        <h2 className="text-20pxr font-[700]">알림 {notificationData.totalCount}개</h2>
        <button>
          <Image src="close-bold.svg" alt="X" width={24} height={24} />
        </button>
      </div>
      <AlertList notificationList={notificationData.notifications} />
    </div>
  );
}
