'use client';

import Image from 'next/image';

interface Props {
  value: number;
  onChange: (diff: number) => void;
}

export default function ParticipantCounter({ value, onChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex w-fit rounded-[6px] border border-var-gray6 shadow">
      <button
        type="button"
        className="p-[10px] hover:cursor-pointer hover:bg-var-gray5"
        onClick={() => onChange(Number(value) - 1)}
        disabled={value === 1}
      >
        <Image src="/minus-icon.svg" width={20} height={20} alt="minus" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="flex h-40pxr w-40pxr items-center justify-center text-center text-14pxr outline-var-green-dark [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        min={1}
      />
      <button
        type="button"
        className="p-[10px] hover:cursor-pointer hover:bg-var-gray5"
        onClick={() => onChange(Number(value) + 1)}
      >
        <Image src="/plus-icon.svg" width={20} height={20} alt="plus" />
      </button>
    </div>
  );
}
