import './registrarsApplications.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";
import { useState, useEffect } from 'react';

export default function RegistrarsApplications() {
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

    function accept() {
        
    }
    function reject() {

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
                    <th>Decision</th>
                </tr>
                {user.map((user) => (
                    <tr>
                        <td> {user.firstname} </td>
                        <td> {user.lastname} </td>
                        <td> {user.gpa} </td>
                        <td> {user.dob} </td>
                        <td> {user.email} </td>
                        <td> {user.role} </td>
                        <button onClick={accept}>Accept</button>
                        <button onClick={reject}>Reject</button>
                    </tr>
                ))}
            </table>
        </div>

    );
}


