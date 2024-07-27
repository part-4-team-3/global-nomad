'use client';

import { useState, useEffect, useRef, Children } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/tailwind-utils';

interface Props {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export default function DropdownMenu({ text, children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative flex w-full flex-col', className)}>
      <button
        onClick={handleToggle}
        className="flex w-full justify-between gap-[10px] rounded-[15px] border border-var-green-dark px-[20px] py-[10px] text-14pxr leading-[22px] text-var-green-dark md:py-[15px] md:text-18pxr"
      >
        {text}
        <Image src="/arrow-down.svg" width={22} height={22} alt="dropdown" />
      </button>
      <div className="relative w-full">
        {isOpen && (
          <ul className="border-var-gray-6 absolute top-[8px] z-10 w-full list-none rounded-[6px] border bg-white">
            {Children.map(children, (child, index) => (
              <li
                className={cn(
                  'w-full py-[9px] text-center text-14pxr md:py-[18px] md:text-18pxr',
                  index < Children.count(children) - 1 && 'border-var-gray-6 border-b',
                )}
                key={index}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {child}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
