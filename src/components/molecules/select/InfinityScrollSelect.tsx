'use client';

import React, { useState, forwardRef, ForwardedRef, useRef } from 'react';
import Input from '../../atoms/input/Input';
import Option from './Option';
import Image from 'next/image';
import { Activity } from '@/types/activity';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  options: Activity[];
  selectedActivity: Activity | null;
  onChange: (activity: Activity) => void;
}

const InfinitySelect = forwardRef(
  (
    { options, onChange, value, selectedActivity, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const divRef = useRef<HTMLDivElement | null>(null);

    return (
      <div className={`relative h-full w-full`}>
        <Input
          size="full"
          readOnly
          value={value}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          style={{ cursor: 'pointer' }}
          ref={ref}
          className="readOnlyButStyle"
          {...rest}
        />
        <Image
          className={`absolute right-12pxr top-1/2 -translate-y-1/2 transform transition-transform ${isOpen && 'rotate-180'}`}
          src="/select-down.svg"
          width={24}
          height={24}
          alt=""
        />
        {isOpen && (
          <ul className="left-0 absolute top-[calc(100%+8px)] z-10 h-150pxr w-full overflow-y-auto rounded-md bg-white p-8pxr shadow-lg ring-1 ring-black ring-opacity-5">
            {options.map((option: Activity) => (
              <Option
                key={option.id}
                text={option.title}
                isSelected={selectedActivity?.id === option.id}
                onChange={() => {
                  setIsOpen(false);
                  onChange(option);
                }}
              />
            ))}
            <div className="w-pull relative flex h-2pxr rounded-md" ref={divRef} />
          </ul>
        )}
      </div>
    );
  },
);

InfinitySelect.displayName = 'InfinitySelect';

export default InfinitySelect;
