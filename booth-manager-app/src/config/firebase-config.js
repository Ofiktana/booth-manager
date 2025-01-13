// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg_S0_0eW_PGVzc6DyCoJ5uwqDm7BhclM",
  authDomain: "booth-manager-1baa6.firebaseapp.com",
  projectId: "booth-manager-1baa6",
  storageBucket: "booth-manager-1baa6.firebasestorage.app",
  messagingSenderId: "581836977642",
  appId: "1:581836977642:web:5b719d25ba089b1d6f2e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Setting up Authentication
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()