'use client';

import React, { useState, forwardRef, ForwardedRef, useRef, useEffect } from 'react';
import Input from '../../atoms/input/Input';
import Option from './Option';
import Image from 'next/image';
import { useObserverByScroll } from '@/models/useObserverByScroll';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  options: string[];
  isLoading: boolean;
  onChange?: (value: string) => void;
  fetchNextPage: () => void;
}

const InfinitySelect = forwardRef(
  (
    { options, onChange, isLoading, fetchNextPage, value, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const divRef = useRef<HTMLDivElement | null>(null);
    const [observeRef, setObserveRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      if (divRef) {
        setObserveRef(divRef.current);
      }
    }, [isOpen]);

    useObserverByScroll({
      isLoading,
      ref: observeRef,
      fetchNextPage,
    });

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
            {options.map((option) => (
              <Option
                key={option}
                text={option}
                isSelected={value === option}
                onChange={() => {
                  setIsOpen(false);
                  onChange?.(option);
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
