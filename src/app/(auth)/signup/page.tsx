import RegisterForm from '@/components/organisms/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'signUp',
  description: '회원가입',
};

export default function SignUp() {
  return <RegisterForm />;
}
