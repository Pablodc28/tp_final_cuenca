/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG ,
  authDomain: "elramblon-b0cd7.firebaseapp.com",
  projectId: "elramblon-b0cd7",
  storageBucket: "elramblon-b0cd7.appspot.com",
  messagingSenderId: "431598905371",
  appId: "1:431598905371:web:9ff8dfd34e5d4e7916b0be"
};

// Initialize Firebase y se pasa la confi
//retorna una instancia de firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app) //instancia para trabajar con base