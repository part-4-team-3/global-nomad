'use client';

import Image from 'next/image';

interface Props {
  value: number;
  onChange: (diff: number) => void;
}

export default function ParticipantCounter({ value, onChange }: Props) {
  return (
    <div className="flex w-fit rounded-[6px] border border-var-gray6 shadow">
      <button className="p-[10px]" onClick={() => onChange(-1)} disabled={value === 1}>
        <Image src="/minus-icon.svg" width={20} height={20} alt="minus" />
      </button>
      <div className="flex h-40pxr w-40pxr items-center justify-center text-14pxr">{value}</div>
      <button className="p-[10px]" onClick={() => onChange(1)}>
        <Image src="/plus-icon.svg" width={20} height={20} alt="plus" />
      </button>
    </div>
  );
}
