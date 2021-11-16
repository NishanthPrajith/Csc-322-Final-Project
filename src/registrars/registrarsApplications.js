import './registrarsApplications.css';
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import emailjs from 'emailjs-com';
import courseAssignPopup from './courseAssignPopup';

export default function RegistrarsApplications() {
    const [User, setUser] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglecourseAssignPopup = () => {
        console.log("im in this function");
        setIsOpen(!isOpen);
      }
 
      
    async function getUser(db) {
        const studentsCol = collection(db, 'Users');
        setLoading(true);
        const getData = onSnapshot(studentsCol, (querySnapshot) => {
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
        const getData = onSnapshot(courses, (querySnapshot) => {
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
        if(f == "0"){
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e, Role: "Student", password: g, useruiid:useruiid, empl: h}
            console.log(useruiid);
            // payload sets fields
            await setDoc(doc(db, "Students", useruiid), payload);
            await deleteDoc(doc(db, "Users",useruiid ));
            
        }else{
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e,Role: "Instructor", password: g, useruiid:useruiid}
            console.log(useruiid);
            console.log("I am here");
            togglecourseAssignPopup();
            console.log("I am here after ");
            // first make the alert dialog/popup appear
            // then we want to display the classes
            // then we want to assign the selected classes to the instructor
            // then close the alert box and return to the page
           // await setDoc(doc(db, "Instructor", useruiid), payload); // add more stuff so it goes to the collection in instructor
            // await deleteDoc(doc(db, "Users", useruiid));
        }
        // First await call will add a document to our Student collection
        // Second await call will remove the student from "Users" collection 
        // Adjusts role depending on input
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

        <div>
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
                        {/* <button onClick={() => Reject(user.useruiid)}>Reject</button> */}
                        <button onClick={() => sendEmail(user.firstname,
                                                         user.lastname,
                                                         user.gpa,
                                                         user.useruiid
                                                         )}>Reject</button>  
                    </tr>
                ))}
            </table>
            {isOpen && <courseAssignPopup
            content={<>
                <b>Design your Popup</b>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <button>Test button</button>
            </>}
            handleClose={togglecourseAssignPopup}
            />}
        </div>
    );
}