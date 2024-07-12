'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/atoms/button/Button';
import ParticipantCounter from '../participant-counter/ParticipantCounter';

interface Props {
  initialValue: number;
  onClose: () => void;
  onSelect: (value: number) => void;
}

export function ActivityParticipantSelector({ initialValue, onClose, onSelect }: Props) {
  const [value, setValue] = useState<number>(initialValue);

  const handleAccept = () => {
    onSelect(value);
    onClose();
  };

  return (
    <div className="fixed left-[0px] right-[0px] top-[0px] z-10 flex h-screen w-screen flex-col justify-between bg-white px-24pxr py-32pxr">
      <div className="flex w-full flex-col gap-24pxr">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-28pxr font-[700]">인원</h2>
          <button className="rounded-full hover:bg-var-gray6" onClick={onClose}>
            <Image src="/x-icon.svg" width={40} height={40} alt="close" />
          </button>
        </div>
        <div className="flex justify-center"></div>

        <div className="flex flex-col gap-[24px]">
          <p className="text-20pxr font-[500]">예약할 인원을 선택해주세요</p>
          <ParticipantCounter
            value={value}
            onChange={(diff: number) => setValue((prev) => prev + diff)}
          />
        </div>
      </div>
      <Button text="확인" color="black" onClick={handleAccept} className="py-15pxr" />
    </div>
  );
}
