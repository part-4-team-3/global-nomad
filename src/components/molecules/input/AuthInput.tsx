'use client';

import Input, { InputAttributes } from '@/components/atoms/input/Input';
import { forwardRef } from 'react';

interface Props extends InputAttributes {
  labelText: string;
  hasError?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hasError = false, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-8pxr">
        <label htmlFor={rest.id}>{labelText}</label>
        <Input size="authField" ref={ref} hasError={hasError} {...rest} />
      </div>
    );
  },
);

AuthInput.displayName = 'Input';

export default AuthInput;
