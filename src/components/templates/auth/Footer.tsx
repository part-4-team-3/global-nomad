import Link from 'next/link';

interface Props {
  variant: 'signIn' | 'signUp';
}

export default function Footer({ variant }: Props) {
  const isSignIn = variant === 'signIn';
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
