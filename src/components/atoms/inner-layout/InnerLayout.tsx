import { ReactNode } from 'react';

interface Props {
  mobilePx?: 'keep';
  children: ReactNode;
  className?: string;
}

export default function InnerLayout({ mobilePx, children, className = '' }: Props) {
  const pxStyle = mobilePx === 'keep' ? 'px-24pxr' : 'px-16pxr md:px-24pxr';
  return <div className={`mx-auto w-full max-w-1200pxr ${pxStyle} ${className}`}>{children}</div>;
}
