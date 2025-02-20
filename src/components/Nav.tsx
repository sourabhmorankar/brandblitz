'use client';

import { useAuth } from '@/components/AuthWrapper';
import Link from 'next/link';

const Nav = () => {
  const { user } = useAuth();
  const adminUid = 'admin1'; // Updated from dummy data

  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-indigo-400">
        BrandBlitz
      </Link>
      <div className="space-x-4">
        <Link href="/" className="text-gray-300 hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <Link href="/chat/request123" className="text-gray-300 hover:text-indigo-400 transition-colors">
          Chat
        </Link>
        {user && user.uid === adminUid && (
          <Link href="/admin" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Admin
          </Link>
        )}
        <Link href="/auth" className="text-gray-300 hover:text-indigo-400 transition-colors">
          {user ? 'Logout' : 'Login'}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;