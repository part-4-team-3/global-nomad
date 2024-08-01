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
        <div className="fixed left-[0] top-[0] z-[80] flex w-full flex-col gap-[16px] border border-var-gray5 bg-var-green2 p-[20px] shadow-[0_2px_8px_0_rgba(120,116,134,0.25)] md:absolute md:left-unset md:right-[24px] md:top-[65px] md:w-[90%] md:max-w-368pxr md:rounded-[10px]">
          <div className="flex items-center justify-between">
            <h2 className="text-20pxr font-[700]">알림 {totalCount}개</h2>
            <button onClick={setIsClose}>
              <Image src="/close-bold.svg" alt="X" width={24} height={24} />
            </button>
          </div>
          <NotificationList isLoading={isLoading} fetchNextPage={fetchNextPage} />
        </div>
      )}
    </>
  );
}
