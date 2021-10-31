import React, { Component } from 'react'
import './navbarhome.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import { auth } from '../firebase';


export default function NavBar() {
    const history = useHistory();
    const { logout } = useAuth();

    function closeNavLink() {
        window.scroll(0,0);
    }

  const { login, currentUser } = useAuth();
  const emailRef = useRef()
  const [revealpassword, setRevealpassword] = useState("password");
  const passwordRef = useRef()

  async function signIn(event) {
    event.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      await history.push('/');
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
            <nav>
                <div className = "firstNav">
                    <Link to = '/' onClick = {closeNavLink}>
                    <p className = "logo">CCNY ZERO</p>
                    </Link>
                    <div>
                        <Link to = '/' onClick = {closeNavLink}>
                            <p className = "links">About Us</p>
                        </Link>
                    </div>
                </div>
            </nav>
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
                <button onClick = {signIn}>Login</button>
                <p className ="message">Not registered? <Link to="/SignUp">Apply</Link></p>
            </form>
            <video width="500" height="500" controls>
                <source src="http://techslides.com/demos/sample-videos/small.mp4"/>
                </video> 
            </div>
        </div>
      </div>
    )
}
