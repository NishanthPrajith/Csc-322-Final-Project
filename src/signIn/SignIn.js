import './SignIn.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, onSnapshot } from 'firebase/firestore';
import { userData } from '../contexts/userProfile';

export default function SignIn() {
  const history = useHistory();

  const { login, currentUser } = useAuth();
  const emailRef = useRef()
  const [revealpassword, setRevealpassword] = useState("password");
  const passwordRef = useRef()

  async function signIn(event) {
    event.preventDefault();
    try {
      const useruiid = await login(emailRef.current.value, passwordRef.current.value);
      const docRef = doc(db, "Users", useruiid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userData.setName(docSnap.data().firstname+" "+ docSnap.data().lastname);
        userData.setStatus(true);
      if(docSnap.data().role==='0'){
        userData.setRole(0);
        await history.push('Studentview');
      }
      else if(docSnap.data().role==='1'){
        userData.setRole(1);
        await history.push('Instructorview');
      }
      else {
        userData.setRole(2);
        await history.push('Admin');
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    } catch(error) {
      document.getElementById('error').style.display = "block";
    }
  }

  function revealTwo(){
    if (revealpassword === "password") {
      setRevealpassword("text");
    } else {
      setRevealpassword("password");
    }
  }

    return (
      <div>
        <div className = "signInFirstHeader">
        <div className ="login-page">
          <div className ="form">
            <p className = "title"> Sign In </p>
            <form className="login-form" id = "frm1">
              <input type="text" ref={emailRef} className = "five" placeholder="Email" autoComplete = "off" required/>
              <input type={revealpassword} ref={passwordRef} placeholder="Password" autoComplete = "off" required/>
              <div className = "reveal">
                <input type="checkbox" onClick={revealTwo}/>
                <p>Show password</p>
              </div>
              <p id = "error" className = "error">Account information was entered incorrectly.</p>
              <button onClick = {signIn}>login</button>
              <p className ="message">Not registered? <Link to="/SignUp">Create an account</Link></p><br></br>
              <p className ="message">Forgot Password? <Link to="/ForgotPassword">Reset Password</Link></p><br></br>
            </form>
            </div>
            <iframe className ="videoHome"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/RcnksOUugcA"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>   
          
        </div>
      </div>
      </div>
    )
}
