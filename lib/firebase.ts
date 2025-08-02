import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let provider: GoogleAuthProvider;

// Check if window is defined (client-side)
const isClient = typeof window !== 'undefined';

// Initialize Firebase
if (typeof window !== 'undefined') {
  // Initialize Firebase app
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
  // Initialize services
  auth = getAuth(app);
  db = getFirestore(app);
  provider = new GoogleAuthProvider();
  
  // Enable persistence for better offline support
  if (typeof window !== 'undefined') {
    import('firebase/auth').then(({ setPersistence, browserLocalPersistence }) => {
      setPersistence(auth, browserLocalPersistence);
    });
  }
  
  // Only try to connect to emulators in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
    try {
      console.log('Attempting to connect to Firebase emulators...');
      // Connect to Auth emulator
      connectAuthEmulator(auth, 'http://localhost:9099');
      // Connect to Firestore emulator
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('✅ Firebase emulators connected successfully');
    } catch (error) {
      console.error('❌ Failed to connect to Firebase emulators:', error);
      console.log('Proceeding with production Firebase services');
    }
  } else {
    console.log('Using production Firebase services');
  }
}

export { auth, db, provider };
