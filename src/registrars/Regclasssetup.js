import './Regclasssetup.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { doc, getDocm, collection, addDoc } from 'firebase/firestore';
import { userData } from '../contexts/userProfile';

export default function Regclasssetup(){
    const classRef = useRef();
    const secRef = useRef();
    const dayRef = useRef();
    const roomRef = useRef();
    const insRef = useRef();
    const history = useHistory();

    async function createClass(event) {
        event.preventDefault();
        try{
        const docRef = await addDoc(collection(db, "classes"), {
            Class: classRef.current.value,
            Section: secRef.current.value,
            DayTime: dayRef.current.value,
            Room: roomRef.current.value,
            Instructor: insRef.current.value
          });
          console.log("Document written with ID: ", docRef.id);
          alert("Class Created Sucessfully");
          await history.push('Regclasssetup');   
        }catch{
            document.getElementById('error').style.display = "block";
        }
    }

    return(
        <div>
            <p>REG CLASS SET UP </p>
            <p>During the class set up period the registrars set up classes, class time, course instructors and class size.</p>
            <div className="form">
            <p className="title"> Create Class </p>
            <form className="login-form" id="cc1">
              <input type="number" ref={classRef} className="five" placeholder="Class" autoComplete="off" required />
              <input type="text" ref={secRef} placeholder="Section" autoComplete="off" required />
              <input type="text" ref={dayRef} className="five" placeholder="Days & Time" autoComplete="off" required />
              <input type="number" ref={roomRef} className="five" placeholder="Room" autoComplete="off" required />
              <input type="text" ref={insRef} placeholder="Instructor" autoComplete="off" required />
              <p id="error" className="error">Account information was entered incorrectly or account does not exist.</p>
              <button  onClick={createClass}>Create</button>
            </form>
          </div>
        </div>
    );
}