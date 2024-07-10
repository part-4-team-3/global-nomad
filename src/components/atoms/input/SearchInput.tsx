'use client';

import { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SearchInput({ onChange, ...rest }: Props) {
  return (
    <input
      type="text"
      placeholder="내가 원하는 체험은"
      onChange={onChange}
      className="h-56pxr w-full shrink grow rounded-[4px] border border-var-gray2 bg-white bg-[url('/bed.svg')] bg-[12px_center] bg-no-repeat p-15pxr pl-48pxr text-14pxr focus:outline-none sm:text-16pxr"
      {...rest}
    />
  );
}
