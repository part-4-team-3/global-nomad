import Image from 'next/image';

interface Props {
  address: string;
}

export default function AddressLabel({ address }: Props) {
  return (
    <div className="flex items-center gap-2pxr">
      <Image src="/location-icon.svg" width={18} height={18} alt="location" />
      <p className="text-14pxr">{address}</p>
    </div>
  );
}
