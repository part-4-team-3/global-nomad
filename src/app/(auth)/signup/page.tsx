import Logo from '@/components/atoms/logo/Logo';
import RegisterForm from '@/components/organisms/auth/RegisterForm';
import Footer from '@/components/templates/auth/Footer';

export default function SignUp() {
  return (
    <>
      <Logo />
      <RegisterForm />
      <Footer variant="signUp" />
    </>
  );
}
