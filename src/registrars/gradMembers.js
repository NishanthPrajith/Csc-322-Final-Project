import './gradMembers.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { registerVersion } from '@firebase/app';

export default function GradMembers(){
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
  async function StudentWarn(){
  
  }

  // IMPLEMENT LATER
  async function InstructorWarn(a,b){
    
  }

  // IMPLEMENT LATER
  async function De_Register(){

  }

  // IMPLEMENT LATER
  async function Suspend(){

  }

    return (
        <div className= "studentsRegView">
        <table className = "xStu">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Empl</th>
                <th></th>
            </tr>
            { students.map((student) => (
            <tr>
              <td> { student.firstname } </td>
              <td> { student.lastname } </td>
              <td> { student.empl } </td>
              <td><button onClick={() => StudentWarn(student.firstname,
                                                     student.lastname
                                                     )}>Warn</button>
                    <button onClick={() => De_Register(student.firstname,
                                                     student.lastname
                                                     )}>de-register</button></td>
                                                     
            </tr>
          ))}
        </table>
        <table className = "xFac">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
            </tr>
          { Instructor.map((tclass) => (
            <tr>
              <td> { tclass.firstname} </td>
              <td> { tclass.lastname} </td>
              <td>
                <button onClick={() => InstructorWarn(tclass.firstname,
                                                      tclass.lastname
                                                      )}>Warn</button>
                <button onClick={() => Suspend(tclass.firstname,
                                                     tclass.lastname
                                                     )}>Suspend</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
}