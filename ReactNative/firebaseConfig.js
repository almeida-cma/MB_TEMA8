// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANr3gcQKLZggCD_nE5uxnJj_95gPbTnZc",
  authDomain: "js-users.firebaseapp.com",
  projectId: "js-users",
  storageBucket: "js-users.appspot.com",
  messagingSenderId: "916964957327",
  appId: "1:916964957327:web:738f3e070b8d862be9e4fa"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
