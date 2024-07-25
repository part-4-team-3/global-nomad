import NotificationList from '@/components/organisms/notification-list/NotificationList';
import { useNotification } from '@/models/header/notification-context';
import { useModal } from '@/store/useModal';
import Image from 'next/image';

interface Props {
  modalKey: string;
  isLoading: boolean;
  fetchNextPage: () => void;
}

export default function NotificationModal({ modalKey, isLoading, fetchNextPage }: Props) {
  const { key, isOpen, setIsClose } = useModal();
  const { totalCount } = useNotification();

  const isSelected = key === modalKey;

  return (
    <>
      {isOpen && isSelected && (
        <div className="absolute right-[24px] top-[82px] z-[80] flex w-[90%] max-w-368pxr flex-col gap-[16px] rounded-[10px] border border-var-gray5 bg-var-green2 p-[20px] shadow-[0_2px_8px_0_rgba(120,116,134,0.25)]">
          <div className="flex items-center justify-between">
            <h2 className="text-20pxr font-[700]">알림 {totalCount}개</h2>
            <button onClick={setIsClose}>
              <Image src="close-bold.svg" alt="X" width={24} height={24} />
            </button>
          </div>
          <NotificationList isLoading={isLoading} fetchNextPage={fetchNextPage} />
        </div>
      )}
    </>
  );
}
