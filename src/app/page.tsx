'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { db } from '@/firebase';
import { collection, addDoc, query, where, onSnapshot, doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';

const HomePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [brief, setBrief] = useState('');
  const [activeRequests, setActiveRequests] = useState(0);
  const [subscription, setSubscription] = useState<{ plan: string; requests: number; active: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    if (!subscription || !subscription.active) {
      setError('You need an active subscription to submit a request.');
      toast.error('You need an active subscription.');
      setIsSubmitting(false);
      return;
    }

    if (activeRequests >= subscription.requests) {
      setError(`You’ve reached your limit of ${subscription.requests} active requests.`);
      toast.error(`Limit reached: ${subscription.requests} active requests.`);
      setIsSubmitting(false);
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
      toast.success('Request submitted!');
      router.push(`/chat/${docRef.id}`);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Failed to submit request.');
      toast.error('Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return <div className="text-center text-gray-400 mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      {user ? (
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-semibold text-white mb-6 text-center">
            Welcome, {user.email}
          </h1>
          <section className="card">
            <h2 className="text-xl font-medium text-gray-200 mb-4">New Design Request</h2>
            {subscription && subscription.active ? (
              <>
                <p className="text-gray-400 mb-6">
                  Active Requests: {activeRequests}/{subscription.requests}
                </p>
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div>
                    <label htmlFor="brief" className="block text-sm font-medium text-gray-300 mb-2">
                      Design Brief
                    </label>
                    <textarea
                      id="brief"
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="input h-36 resize-y"
                      placeholder="Describe your design needs (e.g., logo, website banner)..."
                      required
                      aria-describedby={error ? "brief-error" : undefined}
                    />
                    {error && (
                      <p id="brief-error" className="text-red-400 text-sm mt-2">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || !brief.trim()}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <p className="text-gray-400 mb-4">
                Subscribe to submit requests.{' '}
                <Link href="/subscribe" className="text-indigo-400 hover:underline">Get a Plan</Link>
              </p>
            )}
          </section>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-semibold text-white mb-6">BrandBlitz</h1>
          <p className="text-gray-400 mb-8">
            Fast, collaborative design solutions for startups and businesses.
          </p>
          <div className="space-x-4">
            <Link href="/auth" className="btn-primary">Get Started</Link>
            <Link href="/chat/request123" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;