'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/tailwind-utils';

interface Props {
  text: string;
  children: React.ReactNode[];
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
    <div ref={dropdownRef} className={cn('flex w-full flex-col', className)}>
      <button
        onClick={handleToggle}
        className="flex w-full justify-between rounded-[15px] border border-var-green-dark px-20pxr py-16pxr text-18pxr leading-[22px] text-var-green-dark"
      >
        {text}
        <Image src="/arrow-down.svg" width={22} height={22} alt="dropdown" />
      </button>
      <div className="relative flex w-full">
        {isOpen && (
          <ul className="border-var-gray-6 absolute top-[8px] w-full list-none rounded-[6px] border">
            {children.map((item: React.ReactNode, index: number) => (
              <li
                className={cn(
                  'flex w-full justify-center py-18pxr',
                  index < children.length - 1 && 'border-var-gray-6 border-b',
                )}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
