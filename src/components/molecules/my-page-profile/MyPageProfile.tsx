import EditProfileImage from '@/components/atoms/edit-profile-image/EditProfileImage';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useUser from '@/store/useUser';

export default function MyPageProfile() {
  const { user } = useUser();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="relative flex items-center justify-center pb-[24px]">
      <div className="relative">
        {user && user.profileImageUrl ? (
          <div className="relative size-160pxr overflow-hidden rounded-full">
            <Image fill src={user.profileImageUrl} alt="프로필 사진" />
          </div>
        ) : (
          <div className="flex size-160pxr items-center justify-center rounded-[50%] bg-var-gray1 text-80pxr text-white">
            {user && user.nickname.slice(0, 1)}
          </div>
        )}
        {pathname === '/mypage' && <EditProfileImage />}
      </div>
    </div>
  );
}
