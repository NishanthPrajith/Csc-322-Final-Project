import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { updateProfile, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { userData } from './userProfile';
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(firstname, lastname, email, password, role, gpa, dob) { // Our async function is important because this allows our data to update live rather than waiting to refresh.
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.message)
    });
  }

  async function login(email, password) { 
    await signOut(auth);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      userData.setName(auth);
  }

  async function logout() {
    await signOut(auth);
    console.log("logged out");
    userData.setName(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

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
