import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // This is allowing us to connect our firebase data to js.
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
// ^ Basic information set-up grabbing and created Email, Password, and then being able to sign in with these credentials.

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyATfQypl2VzcfWucfj5b_Du_Zk1iWNauw4",
  authDomain: "csc-322-project.firebaseapp.com",
  projectId: "csc-322-project",
  storageBucket: "csc-322-project.appspot.com",
  messagingSenderId: "243886950521",
  appId: "1:243886950521:web:6059d24f647d6c861daca8"
});

// Initialize Firebase
export const db = getFirestore(firebaseApp);
export const auth = getAuth();


export default firebaseApp;
//hello