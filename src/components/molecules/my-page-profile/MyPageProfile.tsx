import Image from 'next/image';
import useUser from '@/store/useUser';

export default function MyPageProfile() {
  const { user } = useUser();

  return (
    <div className="relative flex items-center justify-center md:pb-[24px]">
      <div className="relative">
        {user && user.profileImageUrl ? (
          <div className="relative size-80pxr overflow-hidden rounded-full md:size-160pxr">
            <Image fill src={user.profileImageUrl} alt="프로필 사진" />
          </div>
        ) : (
          <div className="flex size-80pxr items-center justify-center rounded-[50%] bg-var-gray1 text-40pxr text-white md:size-160pxr md:text-80pxr">
            {user && user.nickname.slice(0, 1)}
          </div>
        )}
      </div>
    </div>
  );
}
