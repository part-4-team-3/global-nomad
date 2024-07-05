'use client';

import { useModal } from '@/store/useModal';

interface Props {
  children: React.ReactNode;
  modalKey: string;
}

export default function Modal({ children, modalKey }: Props) {
  const { isOpen, key } = useModal();
  const isSelected = key === modalKey;

  return (
    <>
      {isOpen && isSelected && (
        <div
          className="fixed bottom-[0] left-[0] right-[0] top-[0] z-10 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)' }}
        >
          <div className="h-540pxr w-250pxr rounded-[8px] bg-white">{children}</div>
        </div>
      )}
    </>
  );
}
