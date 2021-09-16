import './SignUp.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState } from 'react';

export default function SignUp() {
    const { signup } = useAuth()

    async function register(event) {
      event.preventDefault();
      var x = document.getElementById("frm2");
      var name = x.elements[0].value; // user name
      var username = x.elements[1].value; // test this @citymail.cuny.edu
      var pass = x.elements[2].value; // user password
      try {
        await signup(username, pass, name);
      } catch {
        document.getElementById('error').style.display = "block";
      }
    }

    return (
      <div>
        <div className ="login-page">
          <div className ="form">
            <p className = "title"> Sign Up </p>
            <form className ="login-form" id = "frm2">
              <input type="text" className = "One" name = "FullName" autoComplete = "off" placeholder="Full Name" required/>
              <label className = "three">Full Name</label>
              <input type="text" className = "Two" name = "Email" autoComplete = "off" placeholder="Email" required/>
              <label className = "one">Email</label>
              <input type="password" placeholder="Password" autoComplete = "off" required/>
              <label className = "two">Password</label>
              <p id = "error" className = "error">Account creation failed. <br></br> Check if exists.</p>
              <button onClick = {register}>Register</button>
              <p className ="message">Already registered? <Link to="/SignIn">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
