import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      className="mb-0 h-154pxr w-270pxr md:mb-8pxr md:h-192pxr md:w-340pxr"
      src="/logo.png"
      width={340}
      height={192}
      alt="logo"
      priority
    />
  );
}
