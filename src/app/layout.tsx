import './globals.css';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';

export const metadata = {
  title: 'BrandBlitz',
  description: 'Your chat-based design collaboration platform',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthWrapper>
          <main className="flex-1">{children}</main>
          <footer className="p-4 bg-gray-900 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} BrandBlitz. All rights reserved.
          </footer>
        </AuthWrapper>
      </body>
    </html>
  );
};

export default RootLayout;