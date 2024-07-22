import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <Image
      src="/spinner.png"
      alt="Loading..."
      className="animate-spin-slow"
      width={100}
      height={100}
    />
  );
}
