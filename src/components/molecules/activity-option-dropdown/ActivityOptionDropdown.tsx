'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { revalidate } from '@/lib/revalidate';
import { toast } from 'react-toastify';
import { deleteActivity } from '@/queries/activities/delete-activity';
import { useRouter } from 'next/navigation';
interface Props {
  activityId: number;
}

export default function ActivityOptionDropdown({ activityId }: Props) {
  const [optionOpen, setOptionOpen] = useState(false);
  const router = useRouter();
  const handleToggleClick = () => {
    setOptionOpen((prev) => !prev);
  };
  const handleDelete = async () => {
    const message = await deleteActivity(activityId);

    if (message === '삭제가 완료되었습니다') {
      await revalidate('/');
      toast(message);
      router.push('/');
    } else {
      toast(message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <button onClick={handleToggleClick}>
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
  );
}
