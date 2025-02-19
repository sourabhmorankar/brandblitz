import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header>BrandBlitz Header</header>
      <main>{children}</main>
      <footer>BrandBlitz Footer</footer>
    </div>
  );
};

export default Layout;