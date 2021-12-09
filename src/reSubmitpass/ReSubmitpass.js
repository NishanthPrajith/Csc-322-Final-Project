import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useRef } from 'react';
import { db } from "../firebase.js";
import {  doc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { userData } from "../contexts/userProfile";


export default function ForgotPassword() {
    const history = useHistory();
    const passwordRef = useRef()
    const { resetPassword } = useAuth()
  
    async function changePassword(event) {
      event.preventDefault()
      try {
        if(passwordRef.current.value===""){
          alert("Password cannot be empty")
          return
        }
        await resetPassword(passwordRef.current.value);
        const washingtonRef = doc(db, "Students", userData.getUd());
        await updateDoc(washingtonRef, {
          firsttimelogin: false,
          password: passwordRef.current.value

        });
        await history.push('Studentview');    
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
              height="345"
              src="https://www.youtube.com/embed/9xd_ERJt4W4"
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