import './registrarsApplications.css';
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import { useRef } from 'react';
import emailjs from 'emailjs-com';
import CourseAssignPopup from './courseAssignPopup';
import ClassSetUpPeriodPopup from './classSetUpPeriodPopup';

var ud;
var firtname;
var lastname;
var classes;
export default function RegistrarsApplications() {
    const [User, setUser] = useState([]);
    const [courses, setCourses] = useState([]);
    const [period, setPeriod] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [loading, setLoading] = useState(false);
    const periodNum = useRef();

    const togglecourseAssignPopup = (a) => {
        setIsOpen(!isOpen);
        ud = a;
    }
    async function togglecourseAssignclosePopup () {
        setIsOpen(!isOpen);
        await deleteDoc(doc(db, "Users", ud));
    }

    const toggleclassSetUpPeriodPopup = () => {
        setIsOpen2(!isOpen2);
    }
    function toggleclassSetUpPeriodclosePopup () {
        setIsOpen2(!isOpen2);
        alert("Class Set-Up Period changed successfully!");
    }
 
      
    async function getUser(db) {
        const studentsCol = collection(db, 'Users');
        setLoading(true);
        onSnapshot(studentsCol, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                user.push(doc.data());
            });
            setUser(user);
        });
        setLoading(false);
    }

    async function getPeriod(db) {
        const gp = collection(db, 'gradingperiod');
        setLoading(true);
        onSnapshot(gp, (querySnapshot) => {
            const p = [];
            querySnapshot.forEach((doc) => {
                p.push(doc.data());
            });
            setPeriod(p);
        });
        setLoading(false);
    }

    async function getCourses(db) {
        const courses = collection(db, 'classes');
        setLoading(true);
        onSnapshot(courses, (querySnapshot) => {
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
        getPeriod(db);
        getCourses(db);
        getUser(db);
    }, []);

    if (loading) {
        return <h1> Loading .. </h1>
    }

    async function Accept(a, b, c, d, e, f, g ,useruiid, h){
        if(f === "0"){         
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e, Role: "Student", password: g, useruiid:useruiid, empl: h, numWarn: 0, numCourses:0, registerAllow:false,canceledCourses:false,lessThanRwoCourses:false,Graduate:false}
            await setDoc(doc(db, "Students", useruiid), payload);
            await deleteDoc(doc(db, "Users",useruiid ));
        }else{
            const payload = {firstname: a, lastname: b, DateofBirth: d, Email: e,Role: "Instructor", password: g, useruiid:useruiid, Review: 1, numReview: 1, numWarn: 0,numCourses:0,coursesCanceled:false,Suspended:false,}
             const userid = useruiid;
             firtname = a;
             lastname = b;  
            togglecourseAssignPopup(useruiid);
            await setDoc(doc(db, "Instructor", useruiid), payload);
        }
    }

    async function Assign(a,b,c,d,f){
        classes=a;
        try{
        await setDoc(doc(db, "Instructor", ud, "Courses", a), {
            DayTime: b,
            Room: c,
            Secion: d,
            Size: f,
            Instructor: firtname + " " + lastname,
            Class: classes
          });
          await setDoc(doc(db, "AssignedClasses", a), {
            Class: classes,
            DayTime: b,
            Room: c,
            Secion: d,
            Size: f,
            Instructor: firtname + " " + lastname,
            Instructoruiid: ud,
            StudentsEnrolled:0
          });
        }catch{
            alert("Error");
        }
    }

    async function sendEmail(a,b,c,d){
        var templateParams = {
            name: a + " " + b,
            message: "Sorry to inform you, however, due to your gpa we can not accept you into this program and you have been rejected.",
            from_name: " CCNYZero"
            };
        var templateParams2 = {
            name: a + " " + b,
            message: "Sorry to inform you, however, our program has already been filled. ",
            from_name: " CCNYZero"
            };
        if(parseInt(c) < 1.9){
            emailjs.send('gmail', 'template_g5n9s3v', templateParams, 'user_n9Gt3cMzwdE1CRjrKfdqY')
            .then((result) => {
            }, (error) => {
            });
        }else{
            emailjs.send('gmail', 'template_g5n9s3v', templateParams2, 'user_n9Gt3cMzwdE1CRjrKfdqY')
            .then((result) => {
            }, (error) => {
            });
        }
            await deleteDoc(doc(db, "Users",d));
    }

    async function changePeriod(event) {
        event.preventDefault();
        var period = {  classsetup: periodNum.current.value}
        try{
            await setDoc(doc(db, "gradingperiod", "0t678Obx9SKShD3NR3I4"), period);
            alert("Class Period Updated Sucessfully"); 
          }catch{
            document.getElementById('error').style.display = "block";
        }
    }
    async function changePeriodcset(){
        toggleclassSetUpPeriodPopup();
    }

    return (

        <div className = "applicationHeading">
            <h1>Pending applications</h1>
            <button className="class-button" onClick={changePeriodcset}>Change Period</button>
            {isOpen2 && <ClassSetUpPeriodPopup
            content={<>
                <table className="xPeriod">
            <tr>
                    <th>Current Period</th>
                    <th>Change Period</th>
                </tr>
                {period.map((p) => (
                    <tr>
                        <td> {p.classsetup} </td>
                        <input type="number" ref={periodNum} className="five" placeholder="Class" autoComplete="off" required />                  
                        <button className="class-button" onClick={changePeriod}>Change Period</button>
                       
                    </tr>
                ))}

            </table>
            </>}
            handleClose={toggleclassSetUpPeriodclosePopup}
             />}
            <p>Key: Role 1: Instructor, Role 0: Student</p>
            <table className="xApplication">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>GPA</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {User.map((user) => (
                    <tr>
                        <td> {user.firstname} </td>
                        <td> {user.lastname} </td>
                        <td> {user.gpa} </td>
                        <td> {user.dob} </td>
                        <td> {user.email} </td>
                        <td> {user.role} </td>  
                        <td>                       
                        <button onClick={() => Accept(user.firstname, 
                                                      user.lastname, 
                                                      user.gpa, 
                                                      user.dob, 
                                                      user.email, 
                                                      user.role, 
                                                      user.password, 
                                                      user.useruiid,
                                                      user.empl
                                                      )}>Accept</button>
                        <button onClick={() => sendEmail(user.firstname,
                                                         user.lastname,
                                                         user.gpa,
                                                         user.useruiid
                                                         )}>Reject</button>  </td>
                    </tr>
                ))}
            </table>
            {isOpen && <CourseAssignPopup
            content={<>
                <p>Assign course(s) to this instructor</p>
                <table className="xCourses">
                <tr>
                    <th>Class</th>
                    <th>Day/Time</th>
                    <th>Room</th>
                    <th>Section</th>
                    <th>Size</th>
                    <th></th>
                </tr>
                {courses.map((course) => (
                    <tr>
                        <td> {course.Class} </td>
                        <td> {course.DayTime} </td>
                        <td> {course.Room} </td>
                        <td> {course.Section} </td>
                        <td> {course.Size} </td>
                        <td><button onClick={() => Assign(course.Class, 
                                                      course.DayTime, 
                                                      course.Room, 
                                                      course.Section, 
                                                      course.Size
                                                      )}>Assign Course</button></td>
                    </tr>
                ))}
            </table>
            </>}
            handleClose={togglecourseAssignclosePopup}
             />}
        </div>
    );
}