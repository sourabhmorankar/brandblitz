import './globals.css';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import Layout from '@/components/Layout';

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
      <body>
        <AuthWrapper>
          <Layout>{children}</Layout>
        </AuthWrapper>
      </body>
    </html>
  );
};

export default RootLayout;