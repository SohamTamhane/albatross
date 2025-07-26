// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJp_3xC3DS_z0oAHe1bSHoCiuzcwLq8QI",
  authDomain: "albatross-9a1b1.firebaseapp.com",
  projectId: "albatross-9a1b1",
  storageBucket: "albatross-9a1b1.firebasestorage.app",
  messagingSenderId: "219822573179",
  appId: "1:219822573179:web:5d45a3fab201c059df04de",
  measurementId: "G-Q4EQ0TM8W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
