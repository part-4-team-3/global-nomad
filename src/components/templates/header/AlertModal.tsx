import AlertList from '@/components/organisms/alert-list/AlertList';
import Image from 'next/image';

export default function AlertModal() {
  return (
    <div className="absolute right-[24px] top-[82px] z-20 flex w-full max-w-368pxr flex-col gap-[16px] rounded-[10px] bg-var-green2 px-[20px] py-[24px]">
      <div className="flex items-center justify-between">
        <h2 className="text-20pxr font-[700]">알림 6개</h2>
        <button>
          <Image src="close-bold.svg" alt="X" width={24} height={24} />
        </button>
      </div>
      <AlertList />
    </div>
  );
}
