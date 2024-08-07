import AddressLabel from '@/components/atoms/address-label/AddressLabel';
import Image from 'next/image';
import ActivityOptionDropdown from '@/components/molecules/activity-option-dropdown/ActivityOptionDropdown';
import { getCookie } from '@/app/(action)/(cookie)/cookie';
import Link from 'next/link';
interface Props {
  category: string;
  title: string;
  rating: number;
  address: string;
  reviewCount: number;
  activityId: number;
  creatorId: number;
  userId?: string | null;
}

export default async function ActivityHeader({
  category,
  title,
  rating,
  address,
  reviewCount,
  activityId,
  creatorId,
  userId,
}: Props) {
  let isMyActivity = false;

  if (userId) {
    isMyActivity = creatorId.toString() === userId;
  }

  return (
    <div className="flex w-full justify-between px-[24px] py-[16px] text-[#112211] md:py-[24px]">
      <div className="flex flex-col">
        <h3 className="text-14pxr" tabIndex={0} id="category">
          {category}
        </h3>
        <h2 className="text-24pxr font-[700] md:text-32pxr" tabIndex={0}>
          {title}
        </h2>
        <div className="flex gap-12pxr">
          <div className="flex items-center gap-6pxr">
            <Image src="/star-icon.svg" width={16} height={16} alt="ratings" />
            <div className="text-14pxr font-[400]">
              {reviewCount > 0 ? (
                <Link href="#review" className="text-var-green-dark" tabIndex={-1}>
                  <data value={rating}>{rating} </data>(
                  <data
                    className="border-b border-var-green-dark leading-[80%]"
                    value={reviewCount}
                  >
                    {reviewCount}
                  </data>
                  )
                </Link>
              ) : (
                <span>
                  <data value={rating}>{rating} </data>(
                  <data value={reviewCount}>{reviewCount}</data>)
                </span>
              )}
            </div>
          </div>
          <Link href={'#map'} className="hover:font-[600]">
            <AddressLabel address={address} underline={true} />
          </Link>
        </div>
      </div>
      {isMyActivity && <ActivityOptionDropdown activityId={activityId} />}
    </div>
  );
}
