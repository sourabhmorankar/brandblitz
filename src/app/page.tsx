'use client';

import { useAuth } from '@/components/AuthWrapper';

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold">Welcome back, {user.email}!</h1>
          <p>Your chat-based design collaboration platform is ready.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Welcome to BrandBlitz</h1>
          <p>Please log in to start collaborating on designs.</p>
          <a href="/auth" className="text-blue-400 underline">Go to Login</a>
        </>
      )}
    </div>
  );
};

export default HomePage;