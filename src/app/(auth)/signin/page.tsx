import Footer from '@/components/templates/auth/Footer';
import Header from '@/components/templates/auth/Header';
import Main from '@/components/templates/auth/Main';

export default function SignIn() {
  return (
    <>
      <Header />
      <Main variant="signIn" />
      <Footer variant="signIn" />
    </>
  );
}
