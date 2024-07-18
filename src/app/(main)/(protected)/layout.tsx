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
    <>
      <Header />
      <InnerLayout>
        <div className="flex py-[72px] md:gap-[16px] lg:gap-[24px]">
          <SideNavigationMenu />
          <div className="w-full">{children}</div>
        </div>
      </InnerLayout>
      <Footer />
    </>
  );
}