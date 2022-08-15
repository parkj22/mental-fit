// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOfvZ3g3wH6UlXW6fGkT8FNT7-0BHLDnE",
  authDomain: "mental-fit-ce458.firebaseapp.com",
  projectId: "mental-fit-ce458",
  storageBucket: "mental-fit-ce458.appspot.com",
  messagingSenderId: "800046611549",
  appId: "1:800046611549:web:a7b6a1529ac3b8de8721b4",
  measurementId: "G-6KC71NJWZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };