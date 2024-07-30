'use client';

import Input, { InputAttributes, InputStyles } from '@/components/atoms/input/Input';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface Props extends InputAttributes {
  size?: 'authField' | 'full';
  label?: string;
  hasError?: boolean;
}

type passwordType = 'password' | 'text';

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ size = 'authField', hasError = false, label = '비밀번호', ...rest }, ref) => {
    const [type, setType] = useState<passwordType>('password');

    return (
      <div className="flex w-full flex-col">
        <label
          className={size === 'authField' ? 'mb-8pxr block' : 'mb-16pxr block text-24pxr font-bold'}
          htmlFor={rest.id}
        >
          {label}
        </label>
        <div className={`relative ${InputStyles[size]}`}>
          <Input size={size} hasError={hasError} type={type} ref={ref} maxLength={16} {...rest} />
          <button
            type="button"
            onClick={() => {
              setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
            }}
            tabIndex={-1}
          >
            <Image
              className="absolute right-8pxr top-1/2 -translate-y-1/2 transform"
              src={type === 'password' ? '/visibility-on.png' : '/visibility-off.png'}
              width={24}
              height={24}
              alt="visible"
            />
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'Input';

export default PasswordInput;
