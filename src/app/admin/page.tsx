'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { db } from '@/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { DesignRequest } from '@/types/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const { user, role } = useAuth();
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [users, setUsers] = useState<Record<string, { displayName: string; subscription?: { plan: string; requests: number; active: boolean } }>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user || role !== 'admin') {
      if (!loading) router.push('/auth');
      return;
    }

    const requestsRef = collection(db, 'requests');
    const unsubscribeRequests = onSnapshot(requestsRef, (snapshot) => {
      const requestList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DesignRequest[];
      setRequests(requestList);
      setLoading(false);
    });

    const usersRef = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const userMap: Record<string, { displayName: string; subscription?: { plan: string; requests: number; active: boolean } }> = {};
      snapshot.forEach((doc) => {
        userMap[doc.id] = {
          displayName: doc.data().displayName || 'Unknown',
          subscription: doc.data().subscription,
        };
      });
      setUsers(userMap);
    });

    return () => {
      unsubscribeRequests();
      unsubscribeUsers();
    };
  }, [user, role, router, loading]); // Added 'loading' to dependencies

  const updateStatus = async (requestId: string, newStatus: DesignRequest['status']) => {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, { status: newStatus, updatedAt: Date.now() });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">Please log in to access the admin dashboard.</p>
          <Link href="/auth" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">You do not have permission to access this page.</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-8 text-center animate-fade-in">
          Admin Dashboard
        </h1>
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Design Requests</h2>
          {requests.length === 0 ? (
            <p className="text-gray-400">No requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3">Request ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Subscription</th>
                    <th className="p-3">Brief</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-3">{request.id}</td>
                      <td className="p-3">{users[request.clientId]?.displayName || request.clientId}</td>
                      <td className="p-3">
                        {users[request.clientId]?.subscription?.plan || 'None'} (
                        {users[request.clientId]?.subscription?.requests || 0})
                      </td>
                      <td className="p-3">{request.brief}</td>
                      <td className="p-3 capitalize">{request.status.replace('_', ' ')}</td>
                      <td className="p-3 space-x-2">
                        <select
                          value={request.status}
                          onChange={(e) => updateStatus(request.id, e.target.value as DesignRequest['status'])}
                          className="input inline-block w-auto"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <Link href={`/chat/${request.id}`} className="btn-primary inline-block">
                          Chat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;