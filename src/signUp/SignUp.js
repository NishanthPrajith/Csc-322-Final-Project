import './SignUp.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState } from 'react';

export default function SignUp() {
    const { signup } = useAuth();

    const [revealDOB, setRevealDOB] = useState("password");
    const [revealpassword, setRevealpassword] = useState("password");


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

    function revealOne(){
      if (revealDOB === "password") {
        setRevealDOB("text");
      } else {
        setRevealDOB("password");
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
        <div className ="login-page">
          <div className ="form">
            <p className = "title"> Sign Up </p>
            <form className ="login-form" id = "frm2">
             {/* First Name-- */}
              <input type="text" className = "One" name = "fname" autoComplete = "off" placeholder="First Name" required/>

            {/* Last Name-- */}
              <input type="text" className = "One" name = "lname" autoComplete = "off" placeholder="Last Name" required/>
              
            {/* Date of Birth-- */}
              <input type={revealDOB} className = "One" name = "dob" autoComplete = "off" id = "showtext"  maxlength = "10" placeholder="Date of Birth (MM-DD-YYYY)" required/>
              
              <div className = "reveal">
                <input type="checkbox" onClick={revealOne}/>
                <p>Show date of birth</p>
              </div>
            
            {/* Email-- */}
              <input type="text" className = "Two" name = "Email" autoComplete = "off" placeholder="Email" required/>
              
            {/* Password-- */}
              <input type={revealpassword} placeholder="Password" autoComplete = "off" id = "showtext1" required/>
              <div className = "reveal">
                <input type="checkbox" onClick={revealTwo}/>
                <p>Show password</p>
              </div>
              <p id = "error" className = "error">Account creation failed. <br></br> Check if exists.</p>
              <button onClick = {register}>Register</button>
              <p className ="message">Already registered? <Link to="/SignIn">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
