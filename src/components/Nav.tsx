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
    <nav aria-label="Main navigation" className="max-w-7xl mx-auto flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-300 transition-colors">
        BrandBlitz
      </Link>
      <ul className="flex items-center space-x-8" role="menubar">
        <li role="none">
          <Link href="/" className="text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors" role="menuitem">
            Home
          </Link>
        </li>
        <li role="none">
          <Link href="/chat/request123" className="text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors" role="menuitem">
            Chat
          </Link>
        </li>
        {user && role === 'admin' && (
          <li role="none">
            <Link href="/admin" className="text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors" role="menuitem">
              Admin
            </Link>
          </li>
        )}
        <li role="none">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors"
              role="menuitem"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth" className="text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors" role="menuitem">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;