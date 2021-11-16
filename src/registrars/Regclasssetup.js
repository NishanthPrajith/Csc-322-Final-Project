import './Regclasssetup.css'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { collection, addDoc } from 'firebase/firestore';

export default function Regclasssetup(){
    const classRef = useRef();
    const secRef = useRef();
    const dayRef = useRef();
    const roomRef = useRef();
    const sizeRef = useRef();
    const history = useHistory();

    async function createClass(event) {
        event.preventDefault();
        try{
        const docRef = await addDoc(collection(db, "classes"), {
            Class: classRef.current.value,
            Section: secRef.current.value,
            DayTime: dayRef.current.value,
            Room: roomRef.current.value,
            Size: sizeRef.current.value,
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
              <input type="number" ref={sizeRef} className="five" placeholder="Class Size" autoComplete="off" required />
              <p id="error" className="error">Failed to add class, try again</p>
              <button  onClick={createClass}>Create</button>
            </form>
          </div>
        </div>
    );
}