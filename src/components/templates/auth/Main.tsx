import LoginForm from '@/components/organisms/auth/LoginForm';
import RegisterForm from '@/components/organisms/auth/RegisterForm';

interface Props {
  variant: 'signIn' | 'signUp';
}

export default function Main({ variant }: Props) {
  return variant === 'signIn' ? <LoginForm /> : <RegisterForm />;
}
