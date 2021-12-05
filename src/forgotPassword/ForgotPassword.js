import './ForgotPassword.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useRef } from 'react';
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
    let history = useHistory();
    const emailRef = useRef()
    const { resetPassword} = useAuth()
    async function forgotPassword(event) {
      event.preventDefault()
      try {
        await resetPassword(emailRef.current.value);
        await history.push("/");
      } catch {
        document.getElementById('error').style.display = "block";
      }
    }

    return (
      <div>
        <div className ="forgot-page">
          <div className ="form">
            <p className = "title"> Forgot your Password?</p>
            <form className="forgot-form" id = "frm1">
              <input type="text" ref={emailRef} className = "five" placeholder="Email" autoComplete = "off" required/>   
              <p id = "error" className = "error">Email was entered incorrectly or does not exist.</p>
              <button className="forgot-button" onClick = {forgotPassword}>Reset Password</button>
              <p className ="message">Go back?<Link to="/SignIn">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}