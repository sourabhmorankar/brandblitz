'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const { user, role, signup, login, googleLogin, logout } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, role, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, displayName);
      setEmail('');
      setPassword('');
      setDisplayName('');
      setError('');
      toast.success('Signed up successfully!');
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Sign-up failed');
      toast.error(firebaseErr.message || 'Sign-up failed');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      setError('');
      toast.success('Logged in successfully!');
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Login failed');
      toast.error(firebaseErr.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setError('');
      toast.success('Logged in with Google successfully!');
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Google login failed');
      toast.error(firebaseErr.message || 'Google login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setError('');
      toast.success('Logged out successfully!');
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Logout failed');
      toast.error(firebaseErr.message || 'Logout failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="card max-w-md w-full animate-fade-in">
        {user ? (
          <>
            <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Logout</h2>
            <p className="text-gray-300 mb-6 text-center">Logged in as {user.email} ({role})</p>
            <button onClick={handleLogout} className="btn-primary w-full">
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
              {isSignUp ? 'Sign Up for BrandBlitz' : 'Login to BrandBlitz'}
            </h2>
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>
              {isSignUp && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input"
                    required
                  />
                </div>
              )}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">Or {isSignUp ? 'sign up' : 'login'} with:</p>
              <button onClick={handleGoogleLogin} className="btn-secondary w-full">Google</button>
            </div>
            <p className="text-gray-400 mt-4 text-center">
              {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-400 hover:underline">
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;