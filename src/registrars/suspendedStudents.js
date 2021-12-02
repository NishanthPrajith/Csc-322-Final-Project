import './suspendedStudents.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc} from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';

export default function SuspendedStudents() {

    const [loading, setLoading] = useState(false);
    const [suspendedStudents, setSuspendedStudents] = useState([]);

    // Getting suspended students from firebase
    async function getSuspendedStudents(db) {
        const suspendedStudentsCol = collection(db, 'SuspendedStudents');
        setLoading(true);
        onSnapshot(suspendedStudentsCol, (querySnapshot) => {
          const suspendedStudents = [];
          querySnapshot.forEach((doc) => {
            suspendedStudents.push(doc.data());
          });
          setSuspendedStudents(suspendedStudents);
        });
        setLoading(false);
      }

      useEffect(() => {
        setLoading(true);
        getSuspendedStudents(db)
      }, []);

      //This button will handle the students suspension (if chosen to take action)
      async function UnSuspend(a){
        for(let i = 0; i<suspendedStudents.length; i++){
          if(suspendedStudents[i].useruiid===a){
            var data = suspendedStudents[i];
            console.log("hello");
            await setDoc(doc(db, "Students", a), data);
            const washingtonRef = doc(db, "Students", a);
            await updateDoc(washingtonRef, {
              numWarn: 0,
              numOfCourses: 0
            });
          }
        }
        await deleteDoc(doc(db, "SuspendedStudents", a));
        alert("Student has been removed from suspended list");
      }


    return(
        <div className = "suspendedStudentHeading">
            <h1>Currently Suspended Students</h1>
            <table className="suspendedHeading">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>GPA</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>EMPL</th>
                    <th>Reason</th>
                </tr>
                {suspendedStudents.map((suspendedStudents) => (
                    <tr>
                        <td> {suspendedStudents.firstname} </td>
                        <td> {suspendedStudents.lastname} </td>
                        <td> {suspendedStudents.GPA} </td>
                        <td> {suspendedStudents.DateofBirth} </td>
                        <td> {suspendedStudents.Email} </td>
                        <td> {suspendedStudents.empl} </td>
                        <td> {suspendedStudents.Reason} </td>
                        <td>                       
                        <button onClick={() => UnSuspend(suspendedStudents.useruiid,
                                                            )}>Un-Suspend</button></td>
                    </tr>
                ))}
            </table>
            </div>
    );
}