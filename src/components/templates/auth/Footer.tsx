'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isSignIn = pathname === '/signin';
  const spanText = isSignIn ? '회원이 아니신가요? ' : '회원이신가요? ';
  const linkText = isSignIn ? '회원가입하기' : '로그인하기';
  const linkSrc = isSignIn ? 'signup' : 'signin';

  return (
    <div>
      <span className="text-var-primary">{spanText}</span>
      <Link className="text-var-green-dark underline" href={linkSrc}>
        {linkText}
      </Link>
    </div>
  );
}
