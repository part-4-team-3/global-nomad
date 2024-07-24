import Button from '@/components/atoms/button/Button';
import Link from 'next/link';

export default function LogInCover() {
  return (
    <div className="fixed bottom-[0px] left-[0px] right-[0px] z-20 flex h-92pxr w-screen items-center justify-center bg-white bg-opacity-50 md:absolute md:left-[0px] md:top-[0px] md:h-full md:w-full">
      <Link href={'/signin'}>
        <Button text="로그인 후 예약하기" color="black" className="p-[24px]" />
      </Link>
    </div>
  );
}
