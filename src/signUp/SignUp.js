import './SignUp.css'
import { Link } from "react-router-dom";
import { db } from "../firebase"
import { doc, setDoc,collection, addDoc } from "firebase/firestore"; 
import { useAuth } from "../contexts/Authcontext"
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";


export default function SignUp() {

    const { signup } = useAuth();
    const [revealDOB, setRevealDOB] = useState("password");
    const [revealpassword, setRevealpassword] = useState("password");

    // function App(){
    //   const [Firstname, firstname]=useState(
    //   {});
    //   useEffect(() => {
    //     db.collection("Account").onSnapshot(snapshot => {
    //       "frm2".firstname(snapshot.document.map(document=>document.data()))
    //     })

    //   }
    //    ) }

    async function register(event) {
      event.preventDefault();
      var x = document.getElementById("frm2"); //hello
      var firstname = x.elements[0].value; // user first name  
      var lastname = x.elements[1].value; // user last name
      var gpa = x.elements[2].value; // user gpa 
      var dob = x.elements[3].value; // user dob 
      var email = x.elements[5].value; // test this @citymail.cuny.edu
      var password = x.elements[6].value; // user password
      var role = x.elements[8].value; // user role (student, instructor)
      try {
        const useruiid = await signup(firstname, lastname, email, password, role, gpa, dob);
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "Users"), {
          firstname: firstname,
          lastname: lastname,
          useruiid: useruiid
        });
        console.log("Document written with ID: ", docRef.id);
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
            <p className = "title"> Sign Up</p>
            <form className ="login-form" id = "frm2">
             {/* First Name */}
              <input type="text" className = "One" name = "fname" autoComplete = "off" placeholder="First Name" required/>

            {/* Last Name */}
              <input type="text" className = "One" name = "lname" autoComplete = "off" placeholder="Last Name" required/>

            {/* GPA */}
            <input type="number" autoComplete = "off" name = "gpa" min="0" max="4" placeholder="GPA" required/>
              
            {/* Date of Birth */}
              <input type={revealDOB} className = "One" name = "dob" autoComplete = "off" id = "showtext"  maxLength = "10" placeholder="Date of Birth (MM-DD-YYYY)" required/>
              
              <div className = "reveal">
                <input type="checkbox" onClick={revealOne}/>
                <p>Show date of birth</p>
              </div>
            
            {/* Email */}
              <input type="text" className = "Two" name = "Email" autoComplete = "off" placeholder="Email" required/>
              
            {/* Password */}
              <input type={revealpassword} placeholder="Password" autoComplete = "off" id = "showtext1" required/>
              <div className = "reveal">
                <input type="checkbox" onClick={revealTwo}/>
                <p>Show password</p><br></br><br></br>
                <center>Please only select one option below</center>
                <input type="radio" name="role"/>
                <p>Student</p>
                <input type="radio" name="role" />
                <p>Instructor</p>
              </div>
              <p id = "error" className = "error">Account creation failed. Check if exists.</p>
              <button onClick = {register}>Register</button>
              <p className ="message">Already registered? <Link to="/">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
