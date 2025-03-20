// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase (con la info que obtuviste en la consola de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyClDY40vOaM3q2MXhbPYQuiHeJd-NAIRCw",
    authDomain: "basededatos-3d57d.firebaseapp.com",
    projectId: "basededatos-3d57d",
    storageBucket: "basededatos-3d57d.firebasestorage.app",
    messagingSenderId: "383044378498",
    appId: "1:383044378498:web:9fb92628f8be6d5db6399b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén una instancia de Firestore
const db = getFirestore(app);

export { db };
