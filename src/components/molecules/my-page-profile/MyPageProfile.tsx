import Image from 'next/image';
import useUser from '@/store/useUser';

export default function MyPageProfile() {
  const { user } = useUser();

  return (
    <div className="relative flex items-center justify-center md2:pb-[24px]">
      <div className="relative">
        {user && user.profileImageUrl ? (
          <div className="relative size-80pxr overflow-hidden rounded-full shadow-lg md2:size-160pxr">
            <Image fill src={user.profileImageUrl} alt="프로필 사진" className="object-cover" />
          </div>
        ) : (
          <div className="flex size-80pxr items-center justify-center rounded-[50%] bg-var-gray1 text-40pxr text-white md2:size-160pxr md2:text-80pxr">
            {user && user.nickname.slice(0, 1)}
          </div>
        )}
      </div>
    </div>
  );
}
