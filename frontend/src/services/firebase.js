// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuQNg_T5EEtBbIs43SmB9Gpaqeog3RcdA",
  authDomain: "pokedex-2bfcb.firebaseapp.com",
  projectId: "pokedex-2bfcb",
  storageBucket: "pokedex-2bfcb.firebasestorage.app",
  messagingSenderId: "105776290387",
  appId: "1:105776290387:web:0831a0d72eca7d2e9c44a6",
  measurementId: "G-JRFSRTG0V5"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Serviços de Autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
