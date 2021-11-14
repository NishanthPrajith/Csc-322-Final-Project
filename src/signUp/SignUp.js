import './SignUp.css'
import { Link } from "react-router-dom";
import { db } from "../firebase"
import { doc, setDoc} from "firebase/firestore";
import { useAuth } from "../contexts/Authcontext"
import { useState } from 'react';
import React from 'react';
import { useHistory } from "react-router-dom";
import { userData } from '../contexts/userProfile';


export default function SignUp() {
  let history = useHistory();
  const { signup } = useAuth();
  const [revealDOB, setRevealDOB] = useState("password");
  const [revealpassword, setRevealpassword] = useState("password");

  async function register(event) {
    event.preventDefault();
    var x = document.getElementById("frm2"); //hello
    var firstname = x.elements[0].value; // user first name 
    var lastname = x.elements[1].value; // user last name
    var gpa = x.elements[2].value; // user gpa 
    var dob = x.elements[3].value; // user dob 
    var email = x.elements[5].value; // test this @citymail.cuny.edu
    var password = x.elements[6].value; // user password
    var role = document.querySelector('input[name="role"]:checked').value; // user role (student==0, instructor==1)
    var empl = Math.floor(10000000 + Math.random() * 90000000);
    if (firstname === "" || lastname === "" || gpa === "" || dob === "" || email === "" || password === "" || role === "") {
      alert("Missing Information, Enter correct Information!");
    }
    try {
      const useruiid = await signup(firstname, lastname, email, password, role, gpa, dob, empl);
      var data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        gpa: gpa,
        dob: dob,
        role: role,
        useruiid: useruiid,
        empl: empl
      }
      console.log(empl);
      userData.setEmpl(empl);
      await setDoc(doc(db, "Users", useruiid), data);
    } catch {
      document.getElementById('error').style.display = "block";
    }
    if (role === '0') {
      history.push({
        pathname: '/NewAcceptedStudent',
        state: data // your data array of objects
      });
    }
    else if (role === '1') {
      history.push({
        pathname: '/Instructorview',
        state: data // your data array of objects
      });
    }
    else {
      history.push({
        pathname: '/Registrars',
        state: data // your data array of objects
      });
    }
  }

  function revealOne() {
    if (revealDOB === "password") {
      setRevealDOB("text");
    } else {
      setRevealDOB("password");
    }
  }

  function revealTwo() {
    if (revealpassword === "password") {
      setRevealpassword("text");
    } else {
      setRevealpassword("password");
    }
  }

  return (
    <div>
      <h1>The City College of New York </h1>
      <div className="signUpFirstHeader">
        <div className="login-page">
          <center><h1>Sign Up </h1></center>
          <div className="form">
            <form className="login-form" id="frm2">
              {/* First Name */}
              <input type="text" className="One" name="fname" autoComplete="off" placeholder="First Name" required />

              {/* Last Name */}
              <input type="text" className="One" name="lname" autoComplete="off" placeholder="Last Name" required />

              {/* GPA */}
              <input type="number" autoComplete="off" name="gpa" min="0" max="4" placeholder="GPA" required />

              {/* Date of Birth */}
              <input type={revealDOB} className="One" name="dob" autoComplete="off" id="showtext" maxLength="10" placeholder="Date of Birth (MM-DD-YYYY)" required />

              <div className="reveal">
                <input type="checkbox" onClick={revealOne} />
                <p>Show date of birth</p>
              </div>

              {/* Email */}
              <input type="text" className="Two" name="Email" autoComplete="off" placeholder="Email" required />

              {/* Password */}
              <input type={revealpassword} placeholder="Password" autoComplete="off" id="showtext1" required />
              <div className="reveal">
                <input type="checkbox" onClick={revealTwo} />
                <p>Show password</p><br></br><br></br>
                <center className="classNameMessage">Please only select one option below</center>
                <input type="radio" name="role" value="0" checked required />
                <p>Student</p>
                <input type="radio" name="role" value="1" required />
                <p>Instructor</p>
              </div>
              <p id="error" className="error">Account creation failed. Check if exists.</p>
              <button onClick={register}>Register</button>
              <p className="message" > Already registered? <Link to="/">Sign In</Link></p>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
