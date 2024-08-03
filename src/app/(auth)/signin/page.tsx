import LoginForm from '@/components/organisms/auth/LoginForm';
import { Metadata } from 'next';
import { toast } from 'react-toastify';

export const metadata: Metadata = {
  title: '로그인 | Global Nomad',
  description: 'global nomad 로그인 페이지입니다.',
};

export default function SignIn() {
  return <LoginForm />;
}
