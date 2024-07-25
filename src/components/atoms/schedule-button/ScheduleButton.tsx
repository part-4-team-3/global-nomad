import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

export default function ScheduleButton({ children, isSelected = false, ...rest }: Props) {
  const style = isSelected ? 'bg-var-green-dark text-white' : '';

  return (
    <button
      type="button"
      {...rest}
      className={`rounded-[8px] border border-var-green-dark px-12pxr py-10pxr font-[500] text-var-green-dark ${style}`}
    >
      {children}
    </button>
  );
}
