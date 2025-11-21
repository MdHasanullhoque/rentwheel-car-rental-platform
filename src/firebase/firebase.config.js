// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChd8zZ4KdC2phRuVOye-f_xp6uBwgAcyA",
  authDomain: "rentwheels-1f725.firebaseapp.com",
  projectId: "rentwheels-1f725",
  storageBucket: "rentwheels-1f725.firebasestorage.app",
  messagingSenderId: "995892621032",
  appId: "1:995892621032:web:fe74232753538e1429635d",
  measurementId: "G-K6YWBBPP05"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
