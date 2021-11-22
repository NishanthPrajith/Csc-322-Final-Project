import './gradMembers.css';
import './registrarscomplain.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function RegistrarsComplain(){
const [students, setStudents] = useState([]);
  const [Instructor, setTclasses] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getStudents(db) {
    const studentsCol = collection(db, 'Students');
    setLoading(true);
   onSnapshot(studentsCol, (querySnapshot) => {
      const student = [];
      querySnapshot.forEach((doc) => {
          student.push(doc.data());
      });
      setStudents(student);
    });
    setLoading(false);
  }
  async function getInstructor(db) {
    const schoolsCol = collection(db, 'Instructor');
    setLoading(true);
    onSnapshot(schoolsCol, (querySnapshot) => {
      const topratingclass = [];
      querySnapshot.forEach((doc) => {
          topratingclass.push(doc.data());
      });
      console.log(topratingclass)
      setTclasses(topratingclass.slice(0,5));
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getInstructor(db);

  }, []);


  // IMPLEMENT LATER
  async function ComplaintPopup(){
  
  }

  async function InstructorWarn(a,b){
    
  }

    return (
        <div className= "studentsRegView">
        <h2>Incoming Complaints</h2>
        <table className = "xStu">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Type</th>
              <th>Complain</th>
            </tr>
            { students.map((student) => (
            <tr>
              <td> { student.firstname } </td>
              <td> { student.lastname } </td>
              <td> { student.lastname } </td>
              <td> <button onClick={() => ComplaintPopup()}>Complaint</button></td>
            </tr>
          ))}
        </table>
        <table className = "xFac">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Complain</th>
            </tr>
          { Instructor.map((tclass) => (
            <tr>
              <td> { tclass.firstname} </td>
              <td> { tclass.lastname} </td>
              <td>
                <button onClick={() => InstructorWarn(tclass.firstname,
                                                      tclass.lastname
                                                      )}>Warn</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
}