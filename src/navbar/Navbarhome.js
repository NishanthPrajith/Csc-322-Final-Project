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
                      <p className = "logo">CCNYZero</p>
                    </Link>
                    <div>
                        <Link to = '/AboutUs' onClick = {closeNavLink}>
                            <p className = "links">About Us</p>
                        </Link>
                    </div>
                </div>
            </nav>
      </div>
    )
}
