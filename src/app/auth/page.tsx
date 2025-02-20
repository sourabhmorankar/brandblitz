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
      toast.success('Logged in with Google!');
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
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="card max-w-md w-full">
        {user ? (
          <>
            <p className="text-gray-200 mb-6 text-center">Logged in as {user.email} ({role})</p>
            <button onClick={handleLogout} className="btn-primary w-full">
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-medium text-white mb-6 text-center">
              {isSignUp ? 'Sign Up' : 'Login'}
            </h2>
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Password"
                required
              />
              {isSignUp && (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input"
                  placeholder="Display Name"
                  required
                />
              )}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <button onClick={handleGoogleLogin} className="btn-secondary w-full mt-4">
              Google
            </button>
            <p className="text-gray-400 mt-4 text-center text-sm">
              {isSignUp ? 'Have an account?' : 'Need an account?'}{' '}
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