import './gradMembers.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { registerVersion } from '@firebase/app';
import { useHistory } from 'react-router-dom';
import StudentcourseAssignPopup from './StudentDeregister';

var StudentRegisterUiid;
export default function GradMembers(){
  const history = useHistory();
  const [students, setStudents] = useState([]);
  const [studentscourses, setStudentscourses] = useState([]);
  const [Instructor, setTclasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [CanceledCourses, setCanceledCourses] = useState([]);

  // POP UP FUNCTIONS 
  const togglestudentcoursePopup = () => {
    setIsOpen(!isOpen);
}
const closetogglestudentcoursePopup = () => {
    setIsOpen(!isOpen);
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

  // async function  CancelCourses() {
  //   // const coursesCol = collection(db, 'AssignedCourses');
  //    const canceledStudents = []
  //    const courses = [];
  //    const instructors = [];
     
  //    // StudentCourses = db.ref.child("Courses").on("value", function(CoursesEnrolled){
  //    //   CoursesEnrolled.numChildren();
  //    // });
  //    const studentCol = query(collection(db, "Students"), where("EnoughCourses", "==", false ));
  //    onSnapshot(studentCol,(querySnapshot) => {
  //      querySnapshot.forEach((doc) => {
  //        StudentWarn(doc.get('useruiid'))
  //     });
  //   });
 
  //   const coursesCol = query(collection(db,'AssignedCourses'), where("Size" , "<", 5));
  //   const courseSnapshot = await getDocs(coursesCol);
  //   courseSnapshot.forEach((doc)=> {
  //     let instructorUiid = doc.data().get("Instructoruiid");  //InstructorUiid and courseName is assigned for each instance of a class of Size < 5
  //     let courseName = doc.data().get("Class");

  //     courses.push(courseName);           //Data pushed into respective course and instructors array.
  //     instructors.push(instructorUiid);

  //     await updateDoc(doc(db,"Instructor", instructorUiid), {CanceledCourses: true});     //Instructors of these courses are given a CanceledCourse: true
  //     await deleteDoc(doc(db,"Instructor",instructorUiid,"Courses", courseName));     //Class is deleted from their list of courses.
  //     InstructorWarn(instructorUidd);                                                     // They Receive a warning.
  //   });

  //   coursesSnapshot.forEach((course) => {         //Updates canceledCourses to true for affected students;
  //     // let CanceledStudents = query(collection(db,"Students"), where("Courses" in [co)) 
  //     // 
  //       const allStudents = await getDocs(collection(db,"Students"));
  //       allStudents.forEach((student) =>{
  //         let Classes = await getDocs(student.collection("Courses"));
  //         Classes.forEach((doc) => {
  //           if(doc.data().get("Class") != course.data().get("Class"))
  //             break;
  //           else
  //             await updateDoc(student, { CanceledCourses: true }); //Or setDoc with ,{merge: true}
  //             await deleteDoc(student, "Courses", doc);
  //         });

  //       // instructors.forEach((instructor) => {
  //       //   let canceledInstructor = query(collection(db,"Instructors"), where(doc.id, "==", instructor));

  //       });

  //     await deleteDoc(doc(db,"AssignedCourses", course)); //Delete the Assigned Course overall.
  //   });

  // }

  // async function SuspensionCourseRunning(){
  //   let instructorList = await getDocs(collection(db, "Instructors"));
  //   instructorList.forEach((instructor) => {
  //     let numberOfCourses = await getDocs(instructor.collection("Courses"));
  //     numberOfCourses = db.ref.child("Courses").on("value", function(CoursesEnrolled){
  //       CoursesEnrolled.numChildren();
  //     });
  //   });
  // }

  // IMPLEMENT LATER
  async function StudentWarn(a){
    // issue a warning to the student
    for(let i = 0; i<students.length; i++){
      if(students[i].useruiid === a){
          var warncount = students[i].numWarn;
          warncount += 1;
          const washingtonRef = doc(db, "Students",a);
          // Set the "capital" field of the city 'DC'
          await updateDoc(washingtonRef, {
              numWarn: warncount
          });
          break;
        }
    }
  // add the doc to the warnings
  await addDoc(collection(db, "Students",a,"Warnings"), {
      Warn: "You have been given one warnings for taboo words",
      numofWarn: 1
    });
    alert("Student has been warned, please update your Complain list!");
    await history.push('GradMembers');
  }

  // IMPLEMENT LATER
  async function InstructorWarn(a){
     // isue a warning to the instructor
    for(let i = 0; i<Instructor.length; i++){
      if(Instructor[i].useruiid === a){
          var warncount = Instructor[i].numWarn;
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
      Warn: "You have been given one warnings for taboo words",
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

  // IMPLEMENT LATER
  async function Suspend(){

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
        { Instructor.map((tclass) => (
        <tr>
          <td> { tclass.firstname} </td>
          <td> { tclass.lastname} </td>
          <td> { tclass.useruiid} </td>
          <td> <button className="warn-button-grad2"onClick={() => InstructorWarn(tclass.useruiid
                                                      )}>Warn</button>
                <button className="suspend-button-grad"onClick={() => Suspend(tclass.firstname,
                                                     tclass.lastname
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

/*<table className = "instructor-grad">
      <h2>Instructor List</h2>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>UIID</th>
        </tr>
        { Instructor.map((tclass) => (
        <tr>
          <td> { tclass.firstname} </td>
          <td> { tclass.lastname} </td>
          <td> { tclass.useruiid} </td>
          <td> <button className="warn-button-grad2"onClick={() => InstructorWarn(tclass.firstname,
                                                      tclass.lastname
                                                      )}>Warn</button>
                <button className="suspend-button-grad"onClick={() => Suspend(tclass.firstname,
                                                     tclass.lastname
                                                     )}>Suspend</button>
          </td>
        </tr>
        ))}
      </table> */