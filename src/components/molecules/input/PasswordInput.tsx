'use client';

import Input, { InputAttributes, InputStyles } from '@/components/atoms/input/Input';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface Props extends InputAttributes {
  hasError?: boolean;
  isCheck?: boolean;
}

type passwordType = 'password' | 'text';

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ hasError = false, isCheck = false, ...rest }, ref) => {
    const [type, setType] = useState<passwordType>('password');

    return (
      <div className="flex w-full flex-col gap-8pxr">
        <label htmlFor={rest.id}>{isCheck ? '비밀번호 확인' : '비밀번호'}</label>
        <div className={`relative ${InputStyles.authField}`}>
          <Input size="authField" hasError={hasError} type={type} ref={ref} {...rest} />
          <Image
            className="absolute right-8pxr top-1/2 -translate-y-1/2 transform"
            src={type === 'password' ? '/visibility-on.png' : '/visibility-off.png'}
            width={24}
            height={24}
            alt="visibile"
            onClick={() => {
              setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
            }}
          />
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'Input';

export default PasswordInput;
