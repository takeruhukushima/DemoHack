'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Prevent multiple sign-in attempts
      if (loading) return;
      
      setLoading(true);
      
      try {
        await signInWithPopup(auth, provider);
      } catch (error: any) {
        // Handle specific error cases
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('Sign in popup was closed by the user');
          // Don't show error to user as they intentionally closed the popup
          return;
        } else if (error.code === 'auth/cancelled-popup-request') {
          console.log('Another sign in attempt was made before the previous one completed');
          return;
        } else if (error.code === 'auth/popup-blocked') {
          console.error('Please allow popups for this website');
          throw new Error('Please allow popups for this website to sign in with Google.');
        }
        
        console.error('Error signing in with Google:', error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
