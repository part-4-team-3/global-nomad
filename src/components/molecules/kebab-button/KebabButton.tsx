import KebabMenu from '@/components/atoms/kebab-menu/KebabMenu';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  isLast?: boolean;
}

export default function KebabButton({ children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const difRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (difRef.current && !difRef.current.contains(event.target as Node)) {
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
    <div className="relative" ref={difRef}>
      <button className={className} onClick={toggleMenu}>
        <Image src="/kebab.png" width={40} height={40} alt="kebab" />
      </button>
      {isOpen && <KebabMenu>{children}</KebabMenu>}
    </div>
  );
}
