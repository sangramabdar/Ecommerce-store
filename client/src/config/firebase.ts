// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNy_1zax5gOR3e8KyUBvK4K5yAi_jsPts",
  authDomain: "ecommerce-46981.firebaseapp.com",
  projectId: "ecommerce-46981",
  storageBucket: "ecommerce-46981.appspot.com",
  messagingSenderId: "453557868133",
  appId: "1:453557868133:web:1c73460cea3c2bf1fed88c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
