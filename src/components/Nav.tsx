'use client';

import { useAuth } from '@/components/AuthWrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Nav = () => {
  const { user, role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

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
        {user && role === 'admin' && (
          <Link href="/admin" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Admin
          </Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="text-gray-300 hover:text-indigo-400 transition-colors">
            Logout
          </button>
        ) : (
          <Link href="/auth" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;