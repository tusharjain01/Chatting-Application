// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVjeKtasuwJ0E6oEj4lWi-ClSLIuDgGXM",
  authDomain: "chatroom-e7682.firebaseapp.com",
  projectId: "chatroom-e7682",
  storageBucket: "chatroom-e7682.appspot.com",
  messagingSenderId: "867374606004",
  appId: "1:867374606004:web:9fa834bccff908ae10d9e1",
  measurementId: "G-LYSSHF04G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);