import SideNavigationMenu from '@/components/organisms/side-navigation-menu/SideNavigationMenu';
import Header from '@/components/templates/header/Header';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="hidden md:block">
          <SideNavigationMenu />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
