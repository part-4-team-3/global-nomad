import NotificationList from '@/components/organisms/notification-list/NotificationList';
import { useNotification } from '@/models/header/notification-context';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef } from 'react';

interface Props {
  modalKey: string;
  isLoading: boolean;
  fetchNextPage: () => void;
  buttonRef: MutableRefObject<HTMLButtonElement>;
}

export default function NotificationModal({
  modalKey,
  isLoading,
  fetchNextPage,
  buttonRef,
}: Props) {
  const { key, isOpen, setIsClose } = useModal();
  const { totalCount } = useNotification();
  const modalRef = useRef<HTMLDivElement>(null);

  const isSelected = key === modalKey;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && isSelected && (
        <div
          ref={modalRef}
          className="fixed left-[0] top-[0] z-[80] flex w-full flex-col gap-[16px] border border-var-gray5 bg-var-green2 p-[20px] shadow-[0_2px_8px_0_rgba(120,116,134,0.25)] md:absolute md:left-unset md:right-[24px] md:top-[65px] md:w-[90%] md:max-w-368pxr md:rounded-[10px]"
        >
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
