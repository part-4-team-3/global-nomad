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
      className="h-56pxr rounded-[4px] border border-var-gray2 bg-white"
      {...rest}
    />
  );
}
