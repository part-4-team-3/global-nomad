import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size: 's' | 'm' | 'l';
  color: 'white' | 'black';
  link?: string;
}

export default function Button({ text, size, color, onClick, disabled, link }: Props) {
  let sizeStyle;
  switch (size) {
    case 's':
      sizeStyle = 'px-20pxr py-10pxr text-14pxr';
      break;
    case 'm':
      sizeStyle = 'px-33pxr py-16pxr text-16pxr';
      break;
    case 'l':
      sizeStyle = 'py-14pxr w-full text-16pxr';
  }
  const colorStyle =
    color === 'white' ? 'bg-white text-var-green-dark' : 'bg-var-green-dark text-white';
  const disabledStyle = disabled
    ? 'bg-var-gray3 border border-var-gray3 !text-white'
    : 'border border-var-green-dark';

  const style = `rounded-[6px] font-[700] ${sizeStyle} ${colorStyle} ${disabledStyle}`;

  if (link)
    return (
      <Link className={style} href={link}>
        {text}
      </Link>
    );

  return (
    <button className={style} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
