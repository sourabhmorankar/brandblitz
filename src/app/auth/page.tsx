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
      <div className="card">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Login to BrandBlitz</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="btn-secondary w-full mt-4">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;