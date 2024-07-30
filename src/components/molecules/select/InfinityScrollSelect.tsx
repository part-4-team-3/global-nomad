'use client';

import React, { useState, forwardRef, ForwardedRef, useRef, useEffect } from 'react';
import Input from '../../atoms/input/Input';
import Option from './Option';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, MyActivityList } from '@/types/activity';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  options: Activity[] | [];
  activityId: number | string;
  onChange?: (value: string) => void;
}

const InfinitySelect = forwardRef(
  (
    { options, onChange, value, activityId, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log('activityId: ', activityId);
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
          {...rest}
        />
        <Image
          className={`absolute right-12pxr top-1/2 -translate-y-1/2 transform transition-transform ${isOpen && 'rotate-180'}`}
          src="/select-down.png"
          width={24}
          height={24}
          alt=""
        />
        {isOpen && (
          <ul className="left-0 absolute top-[calc(100%+8px)] z-10 h-150pxr w-full overflow-scroll rounded-md bg-white p-8pxr shadow-lg ring-1 ring-black ring-opacity-5">
            {options.length > 0 &&
              options.map((option) => (
                <Link href={`/calendar?activityId=${option.id}`} key={option.title}>
                  <Option
                    text={option.title}
                    isSelected={value === option.title}
                    onChange={() => {
                      setIsOpen(false);
                      onChange?.(option.title);
                    }}
                  />
                </Link>
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
