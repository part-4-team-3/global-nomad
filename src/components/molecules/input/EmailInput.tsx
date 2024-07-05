'use client';

import Input, { InputAttributes } from '@/components/atoms/input/Input';
import { forwardRef } from 'react';

interface Props extends InputAttributes {
  hasError?: boolean;
}

const EmailInput = forwardRef<HTMLInputElement, Props>(({ hasError = false, ...rest }, ref) => {
  return (
    <div className="flex w-full flex-col gap-8pxr">
      <label htmlFor={rest.id}>이메일</label>
      <Input size="authField" ref={ref} hasError={hasError} {...rest} />
    </div>
  );
});

EmailInput.displayName = 'Input';

export default EmailInput;
