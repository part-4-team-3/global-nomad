import LoginForm from '@/components/organisms/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'signIn',
  description: '로그인',
};

export default function SignIn() {
  return <LoginForm />;
}
