import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#121] pb-66pxr pt-32pxr">
      <InnerLayout>
        <div className="grid grid-cols-3 gap-y-24pxr md:grid-cols-4">
          <div className="text-center text-[#676767]">©codeit - 2024</div>
          <div className="text-right text-[#676767]">Privacy Policy</div>
          <div className="text-center text-[#676767]">FAQ</div>
          <div className="col-start-2 flex justify-center gap-x-12pxr md:col-start-4">
            <Image src="/social_icons/facebook.svg" width={20} height={20} alt="facebook 이미지" />
            <Image src="/social_icons/twitter.svg" width={20} height={20} alt="facebook image" />
            <Image src="/social_icons/youtube.svg" width={20} height={20} alt="facebook image" />
            <Image src="/social_icons/instagram.svg" width={20} height={20} alt="facebook image" />
          </div>
        </div>
      </InnerLayout>
    </footer>
  );
}
