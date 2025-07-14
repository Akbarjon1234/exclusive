// Import Firebase SDK modullari
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmC0ytsPk486GcgQt8F8NP7G_bBKLN4W0",
  authDomain: "exclusive-bd8be.firebaseapp.com",
  projectId: "exclusive-bd8be",
  storageBucket: "exclusive-bd8be.firebasestorage.app",
  messagingSenderId: "242659684939",
  appId: "1:242659684939:web:e756276b1d32fb8e8bd3ce",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, provider, db, storage };