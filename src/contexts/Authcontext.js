import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, getAuth,sendPasswordResetEmail } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import { userData } from './userProfile';
import { db } from "../firebase"
import { doc, updateDoc} from "firebase/firestore"; 

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(firstname, lastname, email, password, role, gpa, dob, empl) { // Our async function is important because this allows our data to update live rather than waiting to refresh.

   const ret2 = createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      let ret1 = userCredential.user.uid
      return ret1
    })
    .catch((error) => {
      console.log(error.message)
    });
    userData.setEmpl(empl);
    return ret2
  }

  async function login(email, password) { 
    await signOut(auth);

    const ret2 = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid
        
      return ret1
      })
      .catch((error) => {
        console.log(error.message)
      });
      return ret2
  }

  async function logout() {
    await signOut(auth);
    console.log("logged out");
    userData.setRole(-1);
    userData.setStatus(false);
    history.push('/');
    window.location.reload();
  }
  
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  async function resetPassword(password) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, password)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("Check your email, for the password link")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    })
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
