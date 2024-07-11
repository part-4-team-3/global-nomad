import BestActivityCardList from '@/components/organisms/card-list/BestActivityCardList';
import Image from 'next/image';
import React from 'react';

export default function BestActivities() {
  const arrowList = [
    {
      name: 'prev',
      style: 'scale-x-[-1]',
      onClick: () => {},
    },
    {
      name: 'next',
      style: '',
      onClick: () => {},
    },
  ];
  return (
    <div className="mt-40pxr flex flex-col gap-33pxr">
      <div className="flex items-center justify-between">
        <h3 className="text-36pxr font-[700]">🔥 인기 체험</h3>
        <div className="hidden gap-12pxr lg:flex">
          {arrowList.map((arrow) => (
            <button key={arrow.name}>
              <Image
                src="/arrow.svg"
                width={44}
                height={44}
                alt={arrow.name}
                className={arrow.style}
              />
            </button>
          ))}
        </div>
      </div>
      <BestActivityCardList />
    </div>
  );
}
