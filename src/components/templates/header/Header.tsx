import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const navList = [
    {
      text: '로그인',
      link: '/signin',
    },
    {
      text: '회원가입',
      link: '/signup',
    },
  ];
  return (
    <header>
      <InnerLayout mobilePx="keep" className="flex items-center justify-between py-19pxr">
        <h1>
          <Link href="/">
            <Image src="/logo.svg" width={165.5} height={28} alt="GlobalNomad logo" />
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-25pxr">
            {navList.map((nav) => (
              <Link href={nav.link} key={nav.text} className="text-14pxr font-[500]">
                {nav.text}
              </Link>
            ))}
          </ul>
        </nav>
      </InnerLayout>
    </header>
  );
}
