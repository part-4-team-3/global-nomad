import Button from '@/components/atoms/button/Button';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex h-48pxr w-full items-start justify-between overflow-hidden text-ellipsis">
      <h1 className="h-38pxr text-32pxr font-bold">내 체험 관리</h1>
      <Link href="/myactivity/post">
        <Button className="h-48pxr w-120pxr" text="체험 등록하기" color="black" />
      </Link>
    </div>
  );
}
