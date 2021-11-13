import './registrarsApplications.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import firebaseApp, { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, query, getDoc, getDocs, onSnapshot, addDoc } from 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";
import { useState, useEffect } from 'react';

export default function RegistrarsApplications() {
    let history = useHistory();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

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
    useEffect(() => {
        setLoading(true);
        getUser(db);
    }, []);

    if (loading) {
        return <h1> Loading .. </h1>
    }

    async function Accept(a, b, c, d, e, f, g, v ){
        const collectionRef = collection(db, "Students");
        const collectionRef2 = collection(db, "Instructor");
        if(f == "0"){
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e,Role: "Student", password: g}
            await addDoc(collectionRef, payload);
            await deleteDoc(doc(db, "Users", v));
        }else{
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e,Role: "Instructor", password: g}
            await addDoc(collectionRef2, payload);
            await deleteDoc(doc(db, "Users", v));
        }
        // First await call will add a document to our Student collection
        // Second await call will remove the student from "Users" collection 
        // Adjusts role depending on input
    }

    async function Reject(v){
        await deleteDoc(doc(db, "Users", v));
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
                {user.map((user) => (
                    <tr>
                        <td> {user.firstname} </td>
                        <td> {user.lastname} </td>
                        <td> {user.gpa} </td>
                        <td> {user.dob} </td>
                        <td> {user.email} </td>
                        <td> {user.role} </td>                         
                        <button onClick={() => Accept(user.firstname, 
                                                      user.lastname, 
                                                      user.gpa, user.dob, 
                                                      user.email, user.role, 
                                                      user.password, 
                                                      user.useruiid
                                                      )}>Accept</button>
                        <button onClick={() => Reject(user.useruiid)}>Reject</button>  
                    </tr>
                ))}
            </table>
        </div>

    );
}