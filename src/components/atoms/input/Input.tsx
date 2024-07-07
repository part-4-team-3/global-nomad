'use client';

import { forwardRef } from 'react';

export type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

interface Props extends InputAttributes {
  size: 'authField' | 'formField' | 'full';
  hasError?: boolean;
}

export const InputStyles = {
  base: 'px-20pxr py-16pxr border border-var-gray2 rounded-md',
  authField: 'w-full max-w-350pxr h-58pxr md:max-w-640pxr',
  formField: 'w-full max-w-343pxr h-56pxr md:max-w-429pxr lg:max-w-792pxr',
  full: 'w-full h-full',
  error: 'border-var-red-dark outline-var-red-dark',
};

const Input = forwardRef<HTMLInputElement, Props>(({ size, hasError = false, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`${InputStyles.base} ${InputStyles[size]} ${hasError && InputStyles.error}`}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
