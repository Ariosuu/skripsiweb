import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQM0TgD4HiYOmaQO96qBMPgNiuAItyu8I",
  authDomain: "thesis-database-e62cd.firebaseapp.com",
  projectId: "thesis-database-e62cd",
  storageBucket: "thesis-database-e62cd.firebasestorage.app",
  messagingSenderId: "810311940925",
  appId: "1:810311940925:web:27b1df77a2150b620ca354",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const projectFirestore = firebase.firestore();

export { projectFirestore };
