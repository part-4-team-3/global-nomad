import Image from 'next/image';

interface Props {
  address: string;
}

export default function AddressLabel({ address }: Props) {
  return (
    <div className="flex items-center gap-2pxr">
      <Image src="/location-icon.svg" width={18} height={18} alt="location" />
      <address tabIndex={0} className="text-14pxr not-italic">
        {address}
      </address>
    </div>
  );
}
