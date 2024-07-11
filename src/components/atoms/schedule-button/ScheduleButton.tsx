import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ScheduleButton({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="rounded-[8px] border border-var-green-dark px-12pxr py-10pxr font-[500] text-var-green-dark focus:bg-var-green-dark focus:text-white"
    >
      {children}
    </button>
  );
}
