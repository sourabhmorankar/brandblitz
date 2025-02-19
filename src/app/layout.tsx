import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'BrandBlitz',
  description: 'Chat-based design collaboration platform',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;