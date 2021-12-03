import './Regclasssetup.css'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { setDoc,doc } from 'firebase/firestore';

export default function Regclasssetup(){
    const classRef = useRef();
    const secRef = useRef();
    const dayRef = useRef();
    const roomRef = useRef();
    const sizeRef = useRef();
    const history = useHistory();

    async function createClass(event) {
        event.preventDefault();
        var data = {  
          Class: classRef.current.value,
          Section: secRef.current.value,
          DayTime: dayRef.current.value,
          Room: roomRef.current.value,
          Size: sizeRef.current.value
        }
        console.log(classRef.current.value)
        // checks to see if the value is null or not
        if((classRef.current.value === "") || (secRef.current.value === "") || (dayRef.current.value === "") || (roomRef.current.value === "") || (sizeRef.current.value === "")){
          alert("Failed to create class, check your feild values!");
          await history.push('Regclasssetup'); 
        }
        else{
        try{
          await setDoc(doc(db, "classes",classRef.current.value), data);
          alert("Class Created Sucessfully");
          await history.push('Regclasssetup');   
        }catch{
            document.getElementById('error').style.display = "block";
        }
      }
    }

    return(
        <div className="create-page">
            <h1>Create A Class</h1>
            <p>During the class set up period the registrars set up classes, class time, course instructors and class size.</p>
            <p>Use format Day-Day-Time-Time (Mo-Tu-10:30-12:30)</p>
            <br></br>
            <br></br>
            <div className="create-class">
            <form className="createclass-form" id="cc1">
              <input type="number" ref={classRef} className="five" placeholder="Class" autoComplete="off" required />
              <input type="text" ref={secRef} placeholder="Section" autoComplete="off" required />
              <input type="text" ref={dayRef} className="five" placeholder="Days & Time" autoComplete="off" required />
              <input type="number" ref={roomRef} className="five" placeholder="Room" autoComplete="off" required />
              <input type="number" ref={sizeRef} className="five" placeholder="Class Size" autoComplete="off" required />
              <p id="error" className="error">Failed to add class, try again</p>
             
            </form>
            <button className="class-button" onClick={createClass}>Create</button>
          </div>
        </div>
    );
}