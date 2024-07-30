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
      <div className="mx-12pxr mt-44pxr flex w-350pxr flex-col items-center justify-start gap-24pxr md:mt-72pxr md:w-640pxr md:gap-32pxr lg:mt-104pxr">
        <Link href="/">
          <Image
            className="mb-0 h-154pxr w-270pxr md:mb-8pxr md:h-192pxr md:w-340pxr"
            src="/logo.png"
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
