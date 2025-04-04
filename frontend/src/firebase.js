import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "todoo-4059b.firebaseapp.com",
  projectId: "todoo-4059b",
  storageBucket: "todoo-4059b.firebasestorage.app",
  messagingSenderId: "949265404039",
  appId: "1:949265404039:web:5a5da6620f2ee97ddea822"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };