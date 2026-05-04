'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { 
  auth, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  googleProvider, 
  signInWithPopup,
  sendEmailVerification,
  linkWithCredential,
  EmailAuthProvider
} from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
  signInAnon: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  linkAnonymousWithEmail: (email: string, password: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAnonymous(currentUser?.isAnonymous || false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInAnon = async () => {
    try {
      setError(null);
      await signInAnonymously(auth);
    } catch (err) {
      setError((err as Error).message);
      console.error('Anonymous sign-in error:', err);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError((err as Error).message);
      console.error('Email sign-in error:', err);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
    } catch (err) {
      setError((err as Error).message);
      console.error('Email sign-up error:', err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError((err as Error).message);
      console.error('Google sign-in error:', err);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (err) {
      setError((err as Error).message);
      console.error('Sign-out error:', err);
    }
  };

  const linkAnonymousWithEmail = async (email: string, password: string) => {
    if (!user) return;
    
    try {
      setError(null);
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);
      setIsAnonymous(false);
    } catch (err) {
      setError((err as Error).message);
      console.error('Link account error:', err);
    }
  };

  const sendVerificationEmail = async () => {
    if (!user) return;
    
    try {
      setError(null);
      await sendEmailVerification(user);
    } catch (err) {
      setError((err as Error).message);
      console.error('Send verification email error:', err);
    }
  };

  const value = {
    user,
    loading,
    isAnonymous,
    signInAnon,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    linkAnonymousWithEmail,
    sendVerificationEmail,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
