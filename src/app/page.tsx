'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';

const HomePage = () => {
  const { user, loading } = useAuth();
  const [brief, setBrief] = useState('');

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !brief.trim()) return;

    await addDoc(collection(db, 'requests'), {
      clientId: user.uid,
      brief,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setBrief('');
  };

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
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="input h-24"
                  placeholder="Describe your design needs..."
                  required
                />
                <button type="submit" className="btn-primary w-full">Submit Request</button>
              </form>
              <Link href="/chat/request123" className="btn-secondary mt-4 block text-center">Go to Chat</Link>
            </div>
            <div className="card animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Your Requests</h2>
              <p className="text-gray-400 mb-4">View your active design requests (coming soon).</p>
              <Link href="/chat/request123" className="btn-secondary">Check Status</Link>
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
            <Link href="/chat/request123" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;