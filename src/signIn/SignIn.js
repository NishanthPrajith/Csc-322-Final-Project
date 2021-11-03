import './SignIn.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
  const history = useHistory();

  const { login, currentUser } = useAuth();
  const emailRef = useRef()
  const [revealpassword, setRevealpassword] = useState("password");
  const passwordRef = useRef()

  async function signIn(event) {
    event.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      await history.push('AboutUs');
    } catch(error) {
      document.getElementById('error').style.display = "block";
    }
    console.log(auth.currentUser);
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
