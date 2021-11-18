import './registrarsApplications.css';
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import emailjs from 'emailjs-com';
import CourseAssignPopup from './courseAssignPopup';

var ud;
export default function RegistrarsApplications() {
    const [User, setUser] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglecourseAssignPopup = (a) => {
        setIsOpen(!isOpen);
        console.log("line 18"+a);
        ud = a;
        console.log("line 20"+ud);
    }
    async function togglecourseAssignclosePopup () {
        setIsOpen(!isOpen);
        await deleteDoc(doc(db, "Users", ud));
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
        getCourses(db);
        getUser(db);
    }, []);

    if (loading) {
        return <h1> Loading .. </h1>
    }

    async function Accept(a, b, c, d, e, f, g ,useruiid, h){
        if(f === "0"){
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e, Role: "Student", password: g, useruiid:useruiid, empl: h}
            console.log(useruiid);
            // payload sets fields
            await setDoc(doc(db, "Students", useruiid), payload);
            await deleteDoc(doc(db, "Users",useruiid ));
        }else{
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e,Role: "Instructor", password: g, useruiid:useruiid}
             // first make the alert dialog/popup appear
             const userid = useruiid;
            //  console.log(useruiid);     
            togglecourseAssignPopup(useruiid);
            // then we want to display the classes -- done
            // then we want to assign the selected classes to the instructor-- done
            // then close the alert box and return to the page--done 
            // update user fields and then delte the doc
            await setDoc(doc(db, "Instructor", useruiid), payload);
        }
        // First await call will add a document to our Student collection
        // Second await call will remove the student from "Users" collection 
        // Adjusts role depending on input
    }

    async function Assign(a,b,c,d,f){
        // in this function we will assign the accepted instructor the classes
        // got the information, now to push this data to the instructor
        try{
        await setDoc(doc(db, "Instructor", ud, "Courses", a), {
            DayTime: b,
            Room: c,
            Secion: d,
            Size: f,
            Instructor: ud
          });
          await deleteDoc(doc(db, "classes", a));
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
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }else{
            emailjs.send('gmail', 'template_g5n9s3v', templateParams2, 'user_n9Gt3cMzwdE1CRjrKfdqY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }
            await deleteDoc(doc(db, "Users",d));
    }
    return (

        <div className = "applicationHeading">
            <h1>Pending applications</h1>
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