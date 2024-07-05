'use client';

import { forwardRef } from 'react';

type InputSizeType = 'authField' | 'formField';

export type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

interface InputProps extends InputAttributes {
  size: InputSizeType;
  hasError?: boolean;
}

export const InputStyles = {
  base: 'px-20pxr py-16pxr border border-var-gray2 rounded-md',
  authField: 'w-350pxr h-58pxr sm:w-full sm:max-w-[640px]',
  formField: 'w-343pxr h-56pxr sm:w-full sm:max-w-[792px]',
  error: 'border-var-red-dark outline-var-red-dark',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, hasError = false, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${InputStyles.base} ${InputStyles[size]} ${hasError && InputStyles.error}`}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
