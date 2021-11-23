import './studentregister.css'
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { userData } from '../contexts/userProfile';

export default function StudentRegister() {
const history = useHistory();
const [courses, setCourses] = useState([]);
const [student, setStudent] = useState([]);
const [loading, setLoading] = useState(false);

async function getCourses(db) {
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
    getCourses(db);
  }, []);

  if (loading) {
    return <h1> Loading .. </h1>
  }

  async function enrollCourse(classs,daytime,room,section,size,instructor,instructoruiid){
      // check if the student is already enrolled in the course
        // get the data for the students in the course 
        const studentCol = collection(db, "Instructor", instructoruiid,"Courses", classs, "Roster");
            onSnapshot(studentCol, (querySnapshot) => {
            const course = [];
            querySnapshot.forEach((doc) => {
                course.push(doc.data());
            });
            console.log("line 47 "+ course[0].Student);
            setStudent(course);
            });
        // now we need to perfrom a query to see if the student is in the course
        for(let i = 0; i<student.length; i++){
            if(student[i].Student === userData.getUd()){
              console.log("hi")
                alert("You have already enrolled in this course");
                await history.push('StudentRegister');
            }
        }
      // first check size of class
      if(parseInt(size)===0){
          // put the guy/girl on waitlist
          await setDoc(doc(db, "Waitlist", userData.getUd()), {
            Class: classs,
            DayTime: daytime,
            Room: room,
            Secion: section,
            Instructor: instructor,
            Instructoruiid: instructoruiid
          });
          alert("Class is filled up, you have been placed on the wait list");
        }
        // if the class is not filled then...
       else {
        // put the student in the instrcutors roster
        await setDoc(doc(db, "Instructor", instructoruiid,"Courses", classs, "Roster",classs), {
            Student: userData.getUd()
          });
          // put the course in student database
        await setDoc(doc(db, "Students", userData.getUd(),"Courses", classs), {
          Class: classs,
          DayTime: daytime,
          Room: room,
          Secion: section,
          Instructor: instructor,
          Instructoruiid: instructoruiid
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