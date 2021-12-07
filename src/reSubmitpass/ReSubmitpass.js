import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useRef } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';


export default function ForgotPassword() {
    const history = useHistory();
    const passwordRef = useRef()
    const { resetPassword } = useAuth()
  
    async function changePassword(event) {
      event.preventDefault()
      try {
        await resetPassword(passwordRef.current.value);
        await history.push('SignIn');    
      } catch {
        document.getElementById('error').style.display = "block";
      }
    }

    return (      
        <div className ="forgot-page">
          <div className="videoHome-forgot-page">
            <iframe
              title='video'
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mRrNmPS6yRo"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
          <div className ="form">
            <p className = "title"> Update your password</p>
            <form className="forgot-form" id = "frm1">
              <input type="text" ref={passwordRef} className = "five" placeholder="New Password" autoComplete = "off" required/>
              <p id = "error" className = "error">Email was entered incorrectly or does not exist.</p>
              <button className ="lol" onClick = {changePassword}>Submit</button>
              <p className="message" > Go back to home page? <Link to="/SignIn">Home</Link></p>
            </form> 
          </div> 
      </div>
    )
}