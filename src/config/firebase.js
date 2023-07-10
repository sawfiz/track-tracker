// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyzcPWfKiSvDDPgiugcuuzyHZGq4FSRuc",
  authDomain: "track-tracker-888.firebaseapp.com",
  projectId: "track-tracker-888",
  storageBucket: "track-tracker-888.appspot.com",
  messagingSenderId: "400720996707",
  appId: "1:400720996707:web:0aa5ec0f1aecb9ac324b56",
  measurementId: "G-YJHY356DWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Code for using local emulator
// export const db = getFirestore();
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Code for authentication using Google accounts
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


const analytics = getAnalytics(app);