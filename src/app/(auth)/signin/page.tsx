import Logo from '@/components/atoms/logo/Logo';
import LoginForm from '@/components/organisms/auth/LoginForm';
import Footer from '@/components/templates/auth/Footer';

export default function SignIn() {
  return (
    <>
      <Logo />
      <LoginForm />
      <Footer variant="signIn" />
    </>
  );
}
