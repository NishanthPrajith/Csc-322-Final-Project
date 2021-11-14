import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import firebaseApp, { auth } from '../firebase';

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword} = useAuth()
  
    async function forgotPassword(event) {
      event.preventDefault()
  
      try {
        await resetPassword(emailRef.current.value)
        // console.log("Check your inbox for further instructions");    
      } catch {
        document.getElementById('error').style.display = "block";
      }
      console.log(auth.currentUser);
    }

    return (
      <div>
        <div className ="forgot-page">
          <div className ="form">
            <p className = "title"> Resubmit your email!</p>
            <form className="forgot-form" id = "frm1">
              <input type="text" ref={emailRef} className = "five" placeholder="Email" autoComplete = "off" required/>
              <p id = "error" className = "error">Email was entered incorrectly or does not exist.</p>
              <button onClick = {forgotPassword}>Submit</button>
              <p className="message" > Go back to home page? <Link to="/SignIn">Home</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}