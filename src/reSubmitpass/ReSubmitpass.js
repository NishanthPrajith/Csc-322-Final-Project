import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import firebaseApp, { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase"
import { getAuth, updatePassword } from "firebase/auth";

export default function ForgotPassword() {
    const history = useHistory();
    const passwordRef = useRef()
    const { resetPassword} = useAuth()
  
    async function changePassword(event) {
      event.preventDefault()
      console.log(passwordRef.current.value)
      try {
        await resetPassword(passwordRef.current.value)
        // console.log("Check your inbox for further instructions");
        await history.push('SignIn');    
      } catch {
        document.getElementById('error').style.display = "block";
      }
      console.log(auth.currentUser);
    }


    /////

      // const auth = getAuth();

      // const user = auth.currentUser;
      // // const newPassword = getASecureRandomPassword();

      // updatePassword(user, newPassword).then(() => {
      //   // Update successful.
      // }).catch((error) => {
      //   // An error ocurred
      //   // ...
      // });

    return (
      <div>
        <div className ="forgot-page">
          <div className ="form">
            <p className = "title"> Resubmit your password</p>
            <form className="forgot-form" id = "frm1">
              <input type="text" ref={passwordRef} className = "five" placeholder="New Password" autoComplete = "off" required/>
              <p id = "error" className = "error">Email was entered incorrectly or does not exist.</p>
              <button onClick = {changePassword}>Submit</button>
              <p className="message" > Go back to home page? <Link to="/SignIn">Home</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}