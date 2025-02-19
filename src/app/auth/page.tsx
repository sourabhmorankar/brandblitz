'use client';

import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError(firebaseErr.message || 'Google login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="card max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Login to BrandBlitz</h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-2">Or login with:</p>
          <button onClick={handleGoogleLogin} className="btn-secondary w-full">Google</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;