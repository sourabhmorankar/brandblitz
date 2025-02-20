'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/firebase';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  role: 'user' | 'admin' | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
          const data = docSnap.data();
          setRole(data?.role || 'user'); // Default to 'user' if role not set
        });
        setUser(currentUser);
        setLoading(false);
        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    await setDoc(doc(db, 'users', newUser.uid), {
      email,
      displayName,
      role: 'user', // Default role for sign-ups
      subscription: null,
    }, { merge: true });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const newUser = userCredential.user;
    await setDoc(doc(db, 'users', newUser.uid), {
      email: newUser.email,
      displayName: newUser.displayName || newUser.email?.split('@')[0],
      role: 'user', // Default role for Google sign-ups
      subscription: null,
    }, { merge: true });
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthWrapper');
  }
  return context;
};