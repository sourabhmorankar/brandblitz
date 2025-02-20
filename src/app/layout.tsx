import './globals.css';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import Nav from '@/components/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
            <Nav />
          </header>
          <main className="flex-1 bg-gray-950">{children}</main>
          <footer className="bg-gray-900 border-t border-gray-800 p-6 text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} BrandBlitz. All rights reserved.
          </footer>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" />
        </AuthWrapper>
      </body>
    </html>
  );
};

export default RootLayout;