import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { db } from "../firebase"
import { collection, doc, query, getDocs, onSnapshot,setDoc  } from 'firebase/firestore';
import { updateProfile, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import { useHistory } from "react-router-dom";
import { userData } from './userProfile';
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
      // userData.setName(auth);
      return ret2
  }

  async function logout() {
    await signOut(auth);
    console.log("logged out");
    userData.setName(auth);
    userData.setRole(-1);
    await history.push('/');
  }

  async function resetPassword(email) {

    await sendPasswordResetEmail(auth, email)
        .then(function (user) {
          alert('Check your inbox for further instructions')
        }).catch(function (e) {
          console.log(e)
        })
    
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
