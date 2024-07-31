import RegisterForm from '@/components/organisms/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | Global Nomad',
  description: 'global nomad 회원가입 페이지입니다.',
};

export default function SignUp() {
  return <RegisterForm />;
}
