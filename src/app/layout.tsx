import './globals.css';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';

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
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-indigo-400">
                BrandBlitz
              </Link>
              <div className="space-x-4">
                <Link href="/" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
                <Link href="/chat" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Chat
                </Link>
                <Link href="/auth" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Login
                </Link>
              </div>
            </nav>
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