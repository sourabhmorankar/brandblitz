'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { db } from '@/firebase';
import { collection, addDoc, query, where, onSnapshot, doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [brief, setBrief] = useState('');
  const [activeRequests, setActiveRequests] = useState(0);
  const [subscription, setSubscription] = useState<{ plan: string; requests: number; active: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribeUser = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      setSubscription(data?.subscription || null);
    });

    const requestsQuery = query(
      collection(db, 'requests'),
      where('clientId', '==', user.uid),
      where('status', '!=', 'completed')
    );
    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      setActiveRequests(snapshot.size);
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
      unsubscribeRequests();
    };
  }, [user]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !brief.trim()) return;

    if (!subscription || !subscription.active) {
      setError('You need an active subscription to submit a request.');
      toast.error('You need an active subscription to submit a request.');
      return;
    }

    if (activeRequests >= subscription.requests) {
      setError(`You’ve reached your limit of ${subscription.requests} active request${subscription.requests > 1 ? 's' : ''}.`);
      toast.error(`You’ve reached your limit of ${subscription.requests} active request${subscription.requests > 1 ? 's' : ''}.`);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'requests'), {
        clientId: user.uid,
        brief,
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setBrief('');
      setError('');
      toast.success('Request submitted successfully!');
      router.push(`/chat/${docRef.id}`);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Failed to submit request.');
      toast.error('Failed to submit request.');
    }
  };

  if (authLoading || loading) {
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
              {subscription && subscription.active ? (
                <>
                  <p className="text-gray-400 mb-4">
                    Active Requests: {activeRequests}/{subscription.requests}
                  </p>
                  <form onSubmit={handleCreateRequest} className="space-y-4">
                    <textarea
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="input h-24"
                      placeholder="Describe your design needs..."
                      required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="btn-primary w-full">Submit Request</button>
                  </form>
                </>
              ) : (
                <p className="text-gray-400 mb-4">
                  Subscribe to start submitting design requests.
                  <Link href="/subscribe" className="btn-primary mt-2 block text-center">Subscribe Now</Link>
                </p>
              )}
              <Link href="/chat/request123" className="btn-secondary mt-4 block text-center">Go to Sample Chat</Link>
            </div>
            <div className="card animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Your Requests</h2>
              <p className="text-gray-400 mb-4">Active: {activeRequests}</p>
              <Link href="/admin" className="btn-secondary">View All (Admin Only)</Link>
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