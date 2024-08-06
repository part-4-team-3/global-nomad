import Footer from '@/components/templates/auth/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh w-full items-start justify-center">
      <div className="mx-[12px] my-[44px] flex w-350pxr flex-col items-center justify-start gap-[24px] md:mt-[72px] md:w-640pxr md:gap-[32px] lg:my-[104px]">
        <Link href="/">
          <Image
            className="mb-0 h-154pxr w-270pxr md:mb-[8px] md:h-192pxr md:w-340pxr"
            src="/logo-big.svg"
            width={340}
            height={192}
            alt="logo"
            priority
          />
        </Link>
        {children}
        <Footer />
      </div>
    </div>
  );
}
