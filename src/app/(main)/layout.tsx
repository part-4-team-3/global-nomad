import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import SideNavigationMenu from '@/components/organisms/side-navigation-menu/SideNavigationMenu';
import Footer from '@/components/templates/footer/Footer';
import Header from '@/components/templates/header/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-var-gray8">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
