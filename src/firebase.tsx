import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged ,
} from "firebase/auth";

const APIKey = import.meta.env.VITE_DEV_API_KEY as string;

const firebaseConfig = {
  apiKey: "AIzaSyAsWsktv5NTi84Gk_d6f7aZSmp1v_WXwJI",
  authDomain: "gsynergy-8d802.firebaseapp.com",
  projectId: "gsynergy-8d802",
  storageBucket: "gsynergy-8d802.firebasestorage.app",
  messagingSenderId: "1004860095362",
  appId: "1:1004860095362:web:202b453578c91fb00f6d9b",
  measurementId: "G-F6DJJL5SP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged  };
