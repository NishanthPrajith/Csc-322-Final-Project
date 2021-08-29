import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

async function run() {
  await signOut(auth);

  await signInWithEmailAndPassword(auth, "npra7302@taehs.org", "Kidninja")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      (console.log(user));
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    await signOut(auth);

    await signInWithEmailAndPassword(auth, "nishanth.prajith@gmail.com", "Testone")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        (console.log(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      console.log(auth.currentUser);


      await signOut(auth);
      console.log(auth.currentUser);


      console.log("finished");

}

run();







export default firebaseApp;
