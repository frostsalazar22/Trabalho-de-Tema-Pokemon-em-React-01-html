// src/services/FirebaseService.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

class FirebaseService {
  constructor() {
    if (!FirebaseService.instance) {
      const firebaseConfig = {
        apiKey: "AIzaSyAuQNg_T5EEtBbIs43SmB9Gpaqeog3RcdA",
        authDomain: "pokedex-2bfcb.firebaseapp.com",
        projectId: "pokedex-2bfcb",
        storageBucket: "pokedex-2bfcb.firebasestorage.app",
        messagingSenderId: "105776290387",
        appId: "1:105776290387:web:0831a0d72eca7d2e9c44a6",
        measurementId: "G-JRFSRTG0V5"
      };

      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);

      FirebaseService.instance = this; // Guarda a instância para evitar múltiplas criações
    }

    return FirebaseService.instance;
  }

  getAuthInstance() {
    return this.auth;
  }

  getFirestoreInstance() {
    return this.db;
  }
}

const firebaseService = new FirebaseService();
Object.freeze(firebaseService); // Previne que a instância seja alterada

export default firebaseService;
