import './globals.css';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import Nav from '@/components/Nav';

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
      <body className="flex flex-col min-h-screen bg-gray-900">
        <AuthWrapper>
          <header className="bg-gray-800 border-b border-gray-700 p-4">
            <Nav />
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} BrandBlitz. All rights reserved.
          </footer>
        </AuthWrapper>
      </body>
    </html>
  );
};

export default RootLayout;