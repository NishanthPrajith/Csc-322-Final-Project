import './SignUp.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState } from 'react';

export default function SignUp() {
    const { signup } = useAuth()

    async function register(event) {
      event.preventDefault();
      var x = document.getElementById("frm2");
      var firstname = x.elements[0].value; // user first name
      var lastname = x.elements[1].value; // user last name
      var dob = x.elements[2].value; // user dob 
      var ssn4 = x.elements[3].value; // user last 4 digits of ssn 
      var username = x.elements[4].value; // test this @citymail.cuny.edu
      var pass = x.elements[5].value; // user password
      try {
        await signup(username, pass, firstname, lastname,dob, ssn4);
      } catch {
        document.getElementById('error').style.display = "block";
      }
    }

    function reveal(){
      var x = document.getElementById("showtext");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }

    return (
      <div>
        <div className ="login-page">
          <div className ="form">
            <p className = "title"> Sign Up </p>
            <form className ="login-form" id = "frm2">
             {/* chris is the best Name */}
              <input type="text" className = "One" name = "fname" autoComplete = "off" placeholder="First Name" required/>
              {/* <label className = "three">First Name</label> */}
            {/* Last Name */}
              <input type="text" className = "One" name = "lname" autoComplete = "off" placeholder="Last Name" required/>
              {/* <label className = "three">Last Name</label> */}
            {/* Date of Birth */}
              <input type="password" className = "One" name = "dob" autoComplete = "off" id = "showtext"  maxlength = "10" placeholder="Date of Birth (MM-DD-YYYY)" required/>
              {/* <label className = "three">Date of Birth</label> */}
              <img src = "/assets/visibility.png"/>
              <input type="checkbox" onclick={reveal}/>Display Date of Birth
            {/* SSN */}
              <input type="password" className = "One" name = "dob" autoComplete = "off" id = "showtext2" maxlength = "4" placeholder="Last 4 digits of Social Security or CUNY-assigned ID Number" required/>
              {/* <label className = "three">Date of Birth</label> */}
              <input type="checkbox" onclick={reveal}/>Display last 4 digits 
            {/* Email */}
              <input type="text" className = "Two" name = "Email" autoComplete = "off" placeholder="Email" required/>
              {/* <label className = "one">Email</label> */}
            {/* Password */}
              <input type="password" placeholder="Password" autoComplete = "off" id = "showtext1" required/>
              {/* <label className = "two">Password</label> */}
              <input type="checkbox" onclick={reveal}/>Show Password
              <p id = "error" className = "error">Account creation failed. <br></br> Check if exists.</p>
              <button onClick = {register}>Register</button>
              <p className ="message">Already registered? <Link to="/SignIn">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
