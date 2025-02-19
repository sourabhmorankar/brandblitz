'use client';

import { useAuth } from '@/components/AuthWrapper';
import Link from 'next/link';

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      {user ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-indigo-400 mb-6 animate-fade-in">
            Welcome back, {user.email}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Start a New Request</h2>
              <p className="text-gray-400 mb-4">Need a design? Jump into the chat to get started.</p>
              <Link href="/chat" className="btn-primary">Go to Chat</Link>
            </div>
            <div className="card animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Your Requests</h2>
              <p className="text-gray-400 mb-4">View your active design requests (coming soon).</p>
              <Link href="/chat" className="btn-secondary">Check Status</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-400 mb-6 animate-fade-in">
            BrandBlitz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8 animate-slide-up">
            Fast, collaborative design solutions for startups and businesses. Chat with our team to bring your ideas to life.
          </p>
          <div className="space-x-4 animate-slide-up">
            <Link href="/auth" className="btn-primary">Get Started</Link>
            <Link href="/chat" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;