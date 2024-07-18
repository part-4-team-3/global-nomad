'use client';

import AddressLabel from '@/components/atoms/address-label/AddressLabel';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { deleteActivity } from '@/queries/activities/delete-activity';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { revalidate } from '@/lib/revalidate';

interface Props {
  category: string;
  title: string;
  rating: number;
  address: string;
  reviewCount: number;
  activityId: number;
}

export default function ActivityHeader({
  category,
  title,
  rating,
  address,
  reviewCount,
  activityId,
}: Props) {
  const [optionOpen, setOptionOpen] = useState(false);
  const handleOptionClick = () => {
    setOptionOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleDelete = async () => {
    const message: any = await deleteActivity(activityId);

    if (message === '삭제가 완료되었습니다') {
      await revalidate('/');
      toast(message);
      router.push('/');
    } else {
      toast(message);
    }
  };
  return (
    <div className="flex w-full justify-between p-[16px] text-[#112211] md:p-[24px]">
      <div className="flex flex-col">
        <p className="text-14pxr">{category}</p>
        <p className="text-24pxr font-[700] md:text-32pxr">{title}</p>
        <div className="flex gap-12pxr">
          <div className="flex items-center gap-6pxr">
            <Image src="/star-icon.svg" width={16} height={16} alt="ratings" />
            <p className="text-14pxr font-[400]">
              {rating} ({reviewCount})
            </p>
          </div>
          <AddressLabel address={address} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={handleOptionClick}>
          <Image src="/meatball-icon.svg" width={40} height={40} alt="options" />
        </button>
        <div className="h-1pxr w-1pxr">
          {optionOpen && (
            <div className="border-var-gray-6 font-500 relative right-[180px] top-[20px] z-20 w-160pxr rounded-[6px] border bg-white text-18pxr">
              <Link href={`/myactivity/${activityId}/edit`}>
                <button className="border-var-gray-6 w-full shrink-0 border-b px-46pxr py-18pxr">
                  수정하기
                </button>
              </Link>
              <button onClick={handleDelete} className="w-full px-46pxr py-18pxr">
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
