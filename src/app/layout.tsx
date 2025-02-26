import './globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/contexts/AuthContext';

const lexend = Lexend({ 
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'BrandBlitz - Conversational Design Studio',
  description: 'A conversational design studio platform featuring a dual-panel interface: a chat system for communication and a design workspace for collaboration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={`${lexend.variable} lexend-body`}>
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}