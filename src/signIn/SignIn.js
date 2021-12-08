import './SignIn.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { userData } from '../contexts/userProfile';

export default function SignIn() {
  const history = useHistory();
  const { login } = useAuth();
  const emailRef = useRef();
  const [revealpassword, setRevealpassword] = useState("password");
  const passwordRef = useRef();

  async function signIn(event) {
    event.preventDefault();
    try {
      const useruiid = await login(emailRef.current.value, passwordRef.current.value);
      const docRef = doc(db, "Admin", useruiid); // admin
      const docRef1 = doc(db, "Students", useruiid); //student
      const docRef2 = doc(db, "Instructor", useruiid); // Instructor
      const docRef3 = doc(db, "Users", useruiid); // Users
      const docRef5 = doc(db, "Suspended", useruiid); // Suspended instructors
      const docRef8 = doc(db, "GraduatedStudents", useruiid); // Graduated Students
      const docRef6 = doc(db, "SuspendedStudents", useruiid); // Suspended students and instructors
      const docRef7 = doc(db, "Rejected", useruiid); // Rejected students and instructors
      var docRef4 = doc(db, "gradingperiod", "0t678Obx9SKShD3NR3I4"); // grading period
      const docSnap = await getDoc(docRef); // admin
      const docSnap1 = await getDoc(docRef1); //student
      const docSnap2 = await getDoc(docRef2); // Instructor
      const docSnap3 = await getDoc(docRef3); // Users
      const docSnap5 = await getDoc(docRef5); // Suspended Instructors
      const docSnap6 = await getDoc(docRef6); // Suspended Students
      const docSnap7 = await getDoc(docRef7); // Rejected Students
      const docSnap8 = await getDoc(docRef8); // Rejected Students
      var docSnap4 = await getDoc(docRef4); // grading period
      if (docSnap8.exists()) { // Checking if student graduated
        alert(docSnap8.data().message);
        await history.push('SignIn');
        return
      }
      if (docSnap7.exists()) { // Checking instructors that are suspended
        alert(docSnap7.data().message);
        await history.push('SignIn');
        return
      }
      if (docSnap5.exists()) { // Checking instructors that are suspended
        alert("Error: Account suspended by the Registrars!");
        await history.push('SignIn');
        return
      }
      if (docSnap6.exists()) { // Checking students that are suspended
        alert(docSnap6.data().message);
        await history.push('SignIn');
        return
      }
      if (docSnap3.exists()) {
        alert("Error: Account does not exist OR account still pending approval by Registrars");
        await history.push('SignIn');
        return
      }
      if (docSnap.exists()) {
        userData.setUd(useruiid);
        userData.setName(docSnap.data().firstname + " " + docSnap.data().lastname);
        userData.setStatus(true);
        userData.setRole(2);
        userData.setPeriod(parseInt(docSnap4.data().classsetup));
        await history.push('RegistrarsApplication');
      }
      if (docSnap1.exists()) {
        userData.setUd(useruiid);
        userData.setName(docSnap1.data().firstname + " " + docSnap1.data().lastname);
        userData.setFirstname(docSnap1.data().firstname);
        userData.setLastname(docSnap1.data().lastname);
        userData.setDob(docSnap1.data().DateofBirth);
        userData.setEmail(docSnap1.data().Email);
        userData.setGPA(docSnap1.data().GPA);
        userData.setStatus(true);
        userData.setEmpl(docSnap1.data().empl);
        userData.setRole(0);
        userData.setCoursespassed(parseInt(docSnap1.data().numCoursesPassed));
        userData.setPeriod(parseInt(docSnap4.data().classsetup));
        if(docSnap1.data().firsttimelogin === true){
          await history.push('ReSubmitpass');
          return
        }
        await history.push('Studentview');
      }
      if (docSnap2.exists()) {
        userData.setUd(useruiid);
        userData.setName(docSnap2.data().firstname + " " + docSnap2.data().lastname);
        userData.setFirstname(docSnap2.data().firstname);
        userData.setLastname(docSnap2.data().lastname);
        userData.setDob(docSnap2.data().DateofBirth);
        userData.setEmail(docSnap2.data().Email);
        userData.setStatus(true);
        userData.setRole(1);
        userData.setPeriod(parseInt(docSnap4.data().classsetup));
        await history.push('Instructorview');
      }
    } catch (error) {
      document.getElementById('error').style.display = "block";
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
      <div className="signInFirstHeader">
        <div className="login-page">
          <div className="form">
            <p className="title"> Sign In </p>
            <form className="login-form" id="frm1">
              <input type="text" ref={emailRef} className="five" placeholder="Email" autoComplete="off" required />
              <input type={revealpassword} ref={passwordRef} placeholder="Password" autoComplete="off" required />
              <div className="reveal">
                <input type="checkbox" onClick={revealTwo} />
                <p>Show password</p>
              </div>
              <p id="error" className="error">Account information was entered incorrectly or account does not exist.</p>
              <button className="lol" onClick={signIn}>login</button>
              <p className="message">Not registered? <Link to="/SignUp">Create an account</Link></p><br></br>
              <p className="message">Forgot Password? <Link to="/ForgotPassword">Reset Password</Link></p><br></br>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
