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
      <Link href="/" className="text-xl font-semibold text-white">
        BrandBlitz
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/chat/request123" className="text-gray-400 hover:text-white transition-colors">
          Chat
        </Link>
        {user && role === 'admin' && (
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            Admin
          </Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors">
            Logout
          </button>
        ) : (
          <Link href="/auth" className="text-gray-400 hover:text-white transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;