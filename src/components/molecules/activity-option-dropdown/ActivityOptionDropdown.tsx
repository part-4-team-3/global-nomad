'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { revalidate } from '@/lib/revalidate';
import { toast } from 'react-toastify';
import { deleteActivity } from '@/queries/activities/delete-activity';
import { useRouter } from 'next/navigation';
import { useModal } from '@/store/useModal';
import DeleteActivityModal from '../modal/DeleteActivityModal';
import Button from '@/components/atoms/button/Button';

interface Props {
  activityId: number;
}

export default function ActivityOptionDropdown({ activityId }: Props) {
  const [optionOpen, setOptionOpen] = useState(false);
  const { isOpen, setIsOpen, setIsClose } = useModal();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = () => {
    setOptionOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    setIsClose();
    const message = await deleteActivity(activityId);
    if (message === '삭제가 완료되었습니다') {
      await revalidate('/');
      toast(message);
      router.push('/');
    } else {
      toast(message);
    }
  };

  const handleDeleteClick = () => {
    setIsOpen('deleteActivity');
    setOptionOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOptionOpen(false);
      }
    };

    if (optionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optionOpen]);

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleToggleClick}>
        <Image src="/meatball-icon.svg" width={40} height={40} alt="options" />
      </button>
      <div ref={dropdownRef} className="h-1pxr w-1pxr">
        {optionOpen && (
          <div className="border-var-gray-6 font-500 relative right-[180px] top-[20px] z-20 w-160pxr rounded-[6px] border bg-white text-18pxr">
            <Link href={`/myactivity/${activityId}/edit`}>
              <button className="border-var-gray-6 w-full shrink-0 border-b px-46pxr py-18pxr">
                수정하기
              </button>
            </Link>
            <button onClick={handleDeleteClick} className="w-full px-46pxr py-18pxr">
              삭제하기
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <DeleteActivityModal modalKey="deleteActivity">
          <div className="flex h-200pxr w-400pxr max-w-[90vw] flex-col items-center justify-center gap-[30px]">
            <p className="text-20pxr">삭제하시겠습니까?</p>
            <div className="flex gap-[20px]">
              <Button
                className="w-150pxr py-[10px]"
                text="예"
                color="black"
                onClick={handleDelete}
              />
              <Button
                className="w-150pxr py-[10px]"
                text="아니요"
                color="white"
                onClick={setIsClose}
              />
            </div>
          </div>
        </DeleteActivityModal>
      )}
    </div>
  );
}
