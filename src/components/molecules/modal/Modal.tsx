'use client';

import { useModal } from '@/store/useModal';

interface Props {
  children: React.ReactNode;
  modalKey: string;
  className?: string;
}

export default function Modal({ children, modalKey, className }: Props) {
  const { isOpen, key } = useModal();
  const isSelected = key === modalKey;

  return (
    <>
      {isOpen && isSelected && (
        <div
          className="fixed bottom-[0] left-[0] right-[0] top-[0] z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        >
          <div className={`rounded-[8px] bg-white ${className}`}>{children}</div>
        </div>
      )}
    </>
  );
}
