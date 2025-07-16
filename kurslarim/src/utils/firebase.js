
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "kurslarim-c1ec8.firebaseapp.com",
  projectId: "kurslarim-c1ec8",
  storageBucket: "kurslarim-c1ec8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


initializeApp(firebaseConfig);

const DB = getFirestore()
const AUTH = getAuth()

export { DB, AUTH}