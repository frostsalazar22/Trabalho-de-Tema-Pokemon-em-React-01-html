import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgqPC5Lvuc_ya6QhAjZ-iwhfuqK0h2v9w",
  authDomain: "html-pokedex.firebaseapp.com",
  projectId: "html-pokedex",
  storageBucket: "html-pokedex.firebasestorage.app",
  messagingSenderId: "754153848134",
  appId: "1:754153848134:web:f8be442807b8a6c6773947"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
