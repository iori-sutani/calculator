// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: "AIzaSyDi7zh3n4N4eKCbav9y9oaUckXC0RUphDQ",
  authDomain: "calculator-react-c8557.firebaseapp.com",
  projectId: "calculator-react-c8557",
  storageBucket: "calculator-react-c8557.firebasestorage.appspot.com",
  messagingSenderId: "139309857577",
  appId: "1:139309857577:web:4ea635aee9080ea3dbd538",
  measurementId: "G-FGQYNR4X4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);