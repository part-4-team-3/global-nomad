import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: 'white' | 'black';
  size?: 's' | 'm' | 'l';
  link?: string;
  className?: string;
}

export default function Button({
  text,
  color,
  size,
  type,
  onClick,
  disabled,
  link,
  className = '',
}: Props) {
  let sizeStyle;
  switch (size) {
    case 's':
      sizeStyle = 'px-20pxr py-10pxr text-14pxr';
      break;
    case 'm':
      sizeStyle = 'px-33pxr py-16pxr text-16pxr';
      break;
    case 'l':
      sizeStyle = 'w-full py-14pxr text-16pxr';
      break;
    default:
      sizeStyle = '';
  }
  const colorStyle =
    color === 'white' ? 'bg-white text-var-green-dark2' : 'bg-var-green-dark2 text-white';
  const disabledStyle = disabled
    ? 'bg-var-gray3 border border-var-gray3 !text-white'
    : 'border border-var-green-dark2';

  const style = `rounded-[6px] font-[700] ${colorStyle} ${sizeStyle} ${className} ${disabledStyle}`;

  if (link)
    return (
      <Link className={style} href={link}>
        {text}
      </Link>
    );

  return (
    <button className={style} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
