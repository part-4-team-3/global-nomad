import { ReactNode } from 'react';

interface Props {
  mobilePx?: 'keep';
  children: ReactNode;
  className?: string;
}

export default function InnerLayout({ mobilePx, children, className = '' }: Props) {
  const pxStyle = mobilePx === 'keep' ? 'px-[24px]' : 'px-[16px] md:[px-24px]';
  return <div className={`mx-auto w-full max-w-1248pxr ${pxStyle} ${className}`}>{children}</div>;
}
