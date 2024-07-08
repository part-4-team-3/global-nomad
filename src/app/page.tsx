import Header from '@/components/templates/header/Header';
import Image from 'next/image';

const USER = {
  nickname: '오다은',
  profileImageUrl: null,
};

export default function Home() {
  return (
    <>
      <Header user={USER} />
    </>
  );
}
