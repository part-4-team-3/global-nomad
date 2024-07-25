import { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  children: ReactNode;
}

export default function KebabMenu({ children }: Props) {
  const {
    ref: menuRef,
    inView,
    entry,
  } = useInView({
    threshold: 1,
  });
  const [isStyleApplied, setIsStyleApplied] = useState(false);

  useEffect(() => {
    if (entry && !inView && !isStyleApplied) {
      setIsStyleApplied(true);
    }
  }, [entry, inView, isStyleApplied]);

  return (
    <div
      ref={menuRef}
      className={`absolute right-[30px] rounded-lg bg-white shadow-lg ${isStyleApplied ? 'bottom-[30px]' : ''}`}
    >
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
