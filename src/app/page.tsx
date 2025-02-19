'use client';

import { useAuth } from '@/components/AuthWrapper';
import Link from 'next/link';

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold text-indigo-400 mb-4">BrandBlitz</h1>
        <p className="text-xl text-gray-300 max-w-md mx-auto">
          Your go-to platform for fast, collaborative design solutions.
        </p>
      </header>

      {user ? (
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome back, {user.email}!</h2>
          <p className="text-gray-400 mb-6">Ready to start designing? Jump into the chat.</p>
          <Link href="/chat" className="btn-primary">
            Go to Chat
          </Link>
        </section>
      ) : (
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
          <p className="text-gray-400 mb-6">Log in to collaborate on your next design project.</p>
          <Link href="/auth" className="btn-primary">
            Login Now
          </Link>
        </section>
      )}
    </div>
  );
};

export default HomePage;