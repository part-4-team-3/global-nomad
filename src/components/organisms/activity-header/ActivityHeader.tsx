import AddressLabel from '@/components/atoms/address-label/AddressLabel';
import Image from 'next/image';
import ActivityOptionDropdown from '@/components/molecules/activity-option-dropdown/ActivityOptionDropdown';
import { getCookie } from '@/app/(action)/(cookie)/cookie';
interface Props {
  category: string;
  title: string;
  rating: number;
  address: string;
  reviewCount: number;
  activityId: number;
  creatorId: number;
}

export default async function ActivityHeader({
  category,
  title,
  rating,
  address,
  reviewCount,
  activityId,
  creatorId,
}: Props) {
  const userId = await getCookie('userId');

  let createdByMe = false;

  if (userId) {
    createdByMe = creatorId.toString() === userId;
  }

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
      {createdByMe && <ActivityOptionDropdown activityId={activityId} />}
    </div>
  );
}
