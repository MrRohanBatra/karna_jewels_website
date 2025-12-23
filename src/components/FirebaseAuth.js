import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext } from "react";
export const UserContext=createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyA6p2pV9qaAkrL54_BeEHZJkCOhzcGuc8I",
  authDomain: "karna-jewels.firebaseapp.com",
  projectId: "karna-jewels",
  storageBucket: "karna-jewels.firebasestorage.app",
  messagingSenderId: "148158079862",
  appId: "1:148158079862:web:2285ed2661421ba87d5057"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
