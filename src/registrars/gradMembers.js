import './gradMembers.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StudentcourseAssignPopup from './StudentDeregister';

var StudentRegisterUiid;
export default function GradMembers(){
  const messagestring = "You have been warned by the registrar after a complain investigation!"
  const history = useHistory();
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [complains, setComplains] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [studentscourses, setStudentscourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // POP UP FUNCTIONS 
  const togglestudentcoursePopup = () => {
    setIsOpen(!isOpen);
}
const closetogglestudentcoursePopup = () => {
    setIsOpen(!isOpen);
}
  // GET WAITLIST
  async function getWaitlist(db) {
    const waitlistCol = collection(db, 'Waitlist');
    setLoading(true);
    onSnapshot(waitlistCol, (querySnapshot) => {
      const waitlist = [];
      querySnapshot.forEach((doc) => {
        waitlist.push(doc.id);
      });
      setWaitlist(waitlist);
    });
    setLoading(false);
  }
  // COMPLAIN AND REVIEW
  async function getComplaint(db) {
    const complainsCol = collection(db, 'Complaints');
    const complainsColid = collection(db, 'Complaints');
    setLoading(true);
    onSnapshot(complainsCol, (querySnapshot) => {
      let complain = [];
      querySnapshot.forEach((doc) => {
        complain.push(doc.data())
      });
      onSnapshot(complainsColid, (querySnapshot) => { 
        const complainid = [];
        querySnapshot.forEach((doc) => {
          complainid.push(doc.id)
        });
        for(let i=0; i<complainid.length; i++){
          complain[i].Uid = complainid[i];
        }
        setComplains(complain)
        });
    });
    setLoading(false);
  }
  
  async function getReviews(db) {
    const reviewsCol = collection(db, 'Reviews');
    const reviewsColid = collection(db, 'Reviews');
    setLoading(true);
    onSnapshot(reviewsCol, (querySnapshot) => {
      const review = [];
      querySnapshot.forEach((doc) => { 
        review.push(doc.data());
      });
      onSnapshot(reviewsColid, (querySnapshot) => {
        const reviewsid = [];
        querySnapshot.forEach((doc) => {
          reviewsid.push(doc.id)
        });
        for(let i=0; i<reviewsid.length; i++){
          review[i].Uid = reviewsid[i];
        }
      setReviews(review);
      });
    });
    setLoading(false);
  }

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
      const instructor = [];
      querySnapshot.forEach((doc) => {
          instructor.push(doc.data());
      });
      setInstructors(instructor);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getInstructor(db);
    getReviews(db);
    getComplaint(db);
    getWaitlist(db);
  }, []);

  // IMPLEMENT LATER
  async function StudentWarn(a){ 
    // issue a warning to the student
    for(let i = 0; i<students.length; i++){
      if(students[i].useruiid === a){
        let studentfirstname = students[i].firstname;
        let studentlastname = students[i].lastname;
        let studentuiid = students[i].useruiid;
        var studentdata = students[i];
        var warncount = students[i].numWarn;
        warncount += 1;
          if (warncount>=3){
            // cleare him from the waitlist 
            for(let w = 0; w < waitlist.length; w++){
              if(waitlist[w] === a){
                deleteDoc(doc(db, "Waitlist", a));
              }
            } 
            // delete complain
            for(let c = 0; c < complains.length; c++){
              if(complains[c].SentBy === studentfirstname + " " + studentlastname){
                deleteDoc(doc(db, "Complaints", complains[c].Uid));
              }
            } 
            // delete review
            for(let r = 0; r < Reviews.length; r++){
              if(Reviews[r].SentBy === studentfirstname + " " + studentlastname){
                deleteDoc(doc(db, "Reviews", Reviews[r].Uid));
              }
            }
            // add this student to the suspended collection with data
            await setDoc(doc(db, "SuspendedStudents", studentuiid), studentdata);
            const washingtonRef = doc(db, "SuspendedStudents", studentuiid);
            await updateDoc(washingtonRef, {
              message:  studentfirstname + " " + studentlastname + ". You are recieving this message, becuase you have recieved 3 warnigs and you MUST pay $100 in fines to the registrar!"
            });
            alert("Student has reached 3 warnings and student has been suspended!");
            // delete the student from the student collection       
            await deleteDoc(doc(db, "Students", a));
            await history.push('GradMembers');
          }
        const washingtonRef = doc(db, "Students",a);
        await updateDoc(washingtonRef, {
            numWarn: warncount
        });
        break;
        }
    }
    // add the doc to the warnings
    await addDoc(collection(db, "Students",a,"Warnings"), {
        Warn: messagestring,
        numofWarn: 1
      });
      alert("Student has been warned, please update your Complain list!");
      await history.push('GradMembers');
}

  // IMPLEMENT LATER
  async function InstructorWarn(a){
     // isue a warning to the instructor
    for(let i = 0; i<instructors.length; i++){
      if(instructors[i].useruiid === a){
          var warncount = instructors[i].numWarn;
          warncount += 1;
          const washingtonRef = doc(db, "Instructor",a);
          // Set the "capital" field of the city 'DC'
          await updateDoc(washingtonRef, {
              numWarn: warncount
          });
          break;
        }
    }
  // add the doc to the warnings
  await addDoc(collection(db, "Instructor",a,"Warnings"), {
      Warn: messagestring,
      numofWarn: 1
    });
    alert("Instructor has been warned, please update your Complain list!");
    await history.push('GradMembers');
  }

  // IMPLEMENT LATER
  async function De_Register(a){
    StudentRegisterUiid = a;
    // DEREGISTER THE STUDENT FROM THE COURSE 
    // FIRST WE NEED TO GET THE COURSES FROM THE STUDENT COLLECTION
    const studentCourses = collection(db, 'Students', a,"Courses");
    setLoading(true);
   onSnapshot(studentCourses, (querySnapshot) => {
      const studentcourses = [];
      querySnapshot.forEach((doc) => {
          studentcourses.push(doc.data());
      });
      setStudentscourses(studentcourses);
    });
    setLoading(false);
    togglestudentcoursePopup();
  }
  // IMPLEMENT LATER
  async function De_Register_Popup(a){
    // DEREGISTER THE STUDENT FROM THE COURSE 
    // FIRST WE NEED TO GET THE COURSES FROM THE STUDENT COLLECTION
    await deleteDoc(doc(db, "Students", StudentRegisterUiid,"Courses",a));
    alert("De-Registered the student from the course!");
    await history.push('GradMembers');
  }

  async function Suspend(c){     
      for(let i = 0; i<instructors.length; i++){
        if(instructors[i].useruiid === c){
          var varpush = instructors[i];
         await setDoc(doc(db, "Suspended", c), varpush);
      }
    }
    alert("Instructor has been suspended!");
  }

  return (
    <div className="grad-members">

      <table className = "student-grad-table">
      <h2>Student</h2>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Empl</th>
          <th>UIID</th>
        </tr>
        { students.map((student) => (
        <tr>
          <td> { student.firstname } </td>
          <td> { student.lastname } </td>
          <td> { student.empl } </td>
          <td> { student.useruiid } </td>
          <td><button className="warn-button-grad"onClick={() => StudentWarn(student.useruiid
                                                     )}>Warn</button>
              <button className="de-register-button"onClick={() => De_Register(student.useruiid
                                                     )}>De-register</button></td>                                   
        </tr>
        ))}
      </table>

      <table className = "instructor-grad">
      <h2>Instructor</h2>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>UIID</th>
        </tr>
        { instructors.map((tclass) => (
        <tr>
          <td> { tclass.firstname} </td>
          <td> { tclass.lastname} </td>
          <td> { tclass.useruiid} </td>
          <td> <button className="warn-button-grad2"onClick={() => InstructorWarn(tclass.useruiid
                                                      )}>Warn</button>
                <button className="suspend-button-grad"onClick={() => Suspend(tclass.useruiid
                                                      )}>Suspend</button>
          </td>
        </tr>
        ))}
      </table>
      {isOpen && <StudentcourseAssignPopup
            content={<>
                <p>Assign course(s) to this instructor</p>
                <table className="xCourses">
                <tr>
                    <th>Class</th>
                    <th>Day/Time</th>
                    <th>Room</th>
                    <th>Instructor</th>
                    <th>Section</th>
                    <th></th>
                </tr>
                {studentscourses.map((course) => (
                    <tr>
                        <td> {course.Class} </td>
                        <td> {course.DayTime} </td>
                        <td> {course.Room} </td>
                        <td> {course.Instructor} </td>
                        <td> {course.Secion} </td>
                        <td><button onClick= {() => De_Register_Popup(course.Class)}>De-Register Course</button></td>
                    </tr>
                ))}
            </table>
            </>}
            handleClose={closetogglestudentcoursePopup}
             />}
    </div>
  )
};
