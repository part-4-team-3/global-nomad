'use client';

import React, { useState, forwardRef, ForwardedRef } from 'react';
import Input, { InputStyles } from '../../atoms/input/Input';
import Option from './Option';
import Image from 'next/image';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  options: string[];
  onChange?: (value: string) => void;
}

const ActivitySelect = forwardRef(
  ({ options, onChange, value, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`relative ${InputStyles.full}`}>
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
          <ul className="left-0 absolute top-[calc(100%+8px)] z-10 w-full rounded-md bg-white p-8pxr shadow-lg ring-1 ring-black ring-opacity-5">
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
          </ul>
        )}
      </div>
    );
  },
);

ActivitySelect.displayName = 'Select';

export default ActivitySelect;
