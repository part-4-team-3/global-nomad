import Footer from '@/components/templates/auth/Footer';
import Header from '@/components/templates/auth/Header';
import Main from '@/components/templates/auth/Main';

export default function SignUp() {
  return (
    <>
      <Header />
      <Main variant="signUp" />
      <Footer variant="signUp" />
    </>
  );
}
