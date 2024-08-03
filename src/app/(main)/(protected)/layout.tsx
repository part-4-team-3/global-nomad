import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import SideNavigationMenu from '@/components/organisms/side-navigation-menu/SideNavigationMenu';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InnerLayout>
      <div className="flex py-[24px] md:gap-[16px] md:py-[72px] lg:gap-[24px]">
        <SideNavigationMenu />
        <div className="w-full">{children}</div>
      </div>
    </InnerLayout>
  );
}
