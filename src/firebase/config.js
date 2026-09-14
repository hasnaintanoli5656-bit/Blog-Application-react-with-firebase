import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPvV4Xx9NzxNG7a0slHaeMAS_tuRvjkJ0",
  authDomain: "blog-application-b2245.firebaseapp.com",
  projectId: "blog-application-b2245",
  storageBucket: "blog-application-b2245.firebasestorage.app",
  messagingSenderId: "468379631933",
  appId: "1:468379631933:web:bc631334bb69d3fc1c4554"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export default app