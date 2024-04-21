// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sahandsblogapp.firebaseapp.com",
  projectId: "sahandsblogapp",
  storageBucket: "sahandsblogapp.appspot.com",
  messagingSenderId: "531679959383",
  appId: "1:531679959383:web:19567b1fc11502f7c08612",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
