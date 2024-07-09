import Footer from '@/components/templates/footer/Footer';
import Header from '@/components/templates/header/Header';

const USER = {
  nickname: '오다은',
  profileImageUrl: null,
};

export default function Home() {
  return (
    <>
      <Header user={USER} />
      <Footer />
    </>
  );
}
