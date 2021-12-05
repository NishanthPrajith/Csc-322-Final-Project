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
      <div>
         <iframe
            title='video'
            width="560"
            height="315"
            src="https://www.youtube.com/embed/V2NaL8P8Lhs?&autoplay=1&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playlist=V2NaL8P8Lhs"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className ="forgot-page">
          <div className ="form">
            <p className = "title"> Update your password</p>
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