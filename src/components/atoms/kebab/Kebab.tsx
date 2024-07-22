import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Kebab({ children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <div className="relative" ref={menuRef}>
      <button className={className} onClick={toggleMenu}>
        <Image src="/kebab.png" width={40} height={40} alt="kebab" />
      </button>
      {isOpen && (
        <div className={`absolute right-[30px] rounded-lg bg-white shadow-lg`}>
          <div className="flex flex-col">{children}</div>
        </div>
      )}
    </div>
  );
}
