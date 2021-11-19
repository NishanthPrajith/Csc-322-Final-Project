import './studentregister.css'
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import emailjs from 'emailjs-com';
import { userData } from '../contexts/userProfile';

export default function StudentRegister() {
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(false);

async function getStudents(db) {
    const assignedclassCol = collection(db, 'AssignedClasses');
    setLoading(true);
   onSnapshot(assignedclassCol, (querySnapshot) => {
      const course = [];
      querySnapshot.forEach((doc) => {
          course.push(doc.data());
      });
      setCourses(course);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
  }, []);

  if (loading) {
    return <h1> Loading .. </h1>
  }

  async function enrollCourse(classs,daytime,room,section,size,instructor,instructoruiid){
      // first check size of class
      if(parseInt(size)===0){
          // put the guy/girl on waitlist
          await setDoc(doc(db, "Waitlist", userData.getUd()), {
            Class: classs,
            DayTime: daytime,
            Room: room,
            Secion: section,
            Instructor: instructor
          });
          alert("Class is filled up, you have been placed on the wait list");
        }
        // if the class is not filled then...
       else {
        // put the student in the instrcutors roster
        await setDoc(doc(db, "Instructor", instructoruiid,"Courses", classs, "Roster",classs), {
            Student: userData.getUd()
          });
          // constant used to updat the class size
        let updateclasssize = parseInt(size);
        --updateclasssize;
        alert("Enrolled in class sucessfully!");
          // then we want to update the size of the class 
          await updateDoc(doc(db, "AssignedClasses", classs), {
            Size: updateclasssize
          });
       } 
    }

    return (
        <div>
        <table className="sCourses">
                <tr>
                    <th>Class</th>
                    <th>Day/Time</th>
                    <th>Room</th>
                    <th>Section</th>
                    <th>Size</th>
                    <th>Instructor</th>
                </tr>
                {courses.map((course) => (
                    <tr>
                        <td> {course.Class} </td>
                        <td> {course.DayTime} </td>
                        <td> {course.Room} </td>
                        <td> {course.Secion} </td>
                        <td> {course.Size} </td>
                        <td> {course.Instructor} </td>
                        <td><button onClick={() => enrollCourse(course.Class, 
                                                      course.DayTime, 
                                                      course.Room, 
                                                      course.Secion, 
                                                      course.Size,
                                                      course.Instructor,
                                                      course.Instructoruiid
                                                      )}>Enroll Course</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}