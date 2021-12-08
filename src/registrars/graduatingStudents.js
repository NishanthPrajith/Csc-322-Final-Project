import './graduatingStudents.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';

export default function GraduatingStudents() {
    const [Graduate, setGraduate] = useState([]);
    const [Students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getGraduatingApplications(db) {
        const gradStuCol = collection(db, 'AppliedGraduation');
        setLoading(true);
        onSnapshot(gradStuCol, (querySnapshot) => {
            const gsc = [];
            querySnapshot.forEach((doc) => {
                gsc.push(doc.data());
            });
            setGraduate(gsc);
        });
        setLoading(false);
    }

    async function getStudents(db) {
        const gradStuCol = collection(db, 'Students');
        setLoading(true);
        onSnapshot(gradStuCol, (querySnapshot) => {
            const stu = [];
            querySnapshot.forEach((doc) => {
                stu.push(doc.data());
            });
            setStudents(stu);
        });
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getGraduatingApplications(db);
        getStudents(db)
    }, []);

    if (loading) {
        return <h1> Loading .. </h1>
    }

    async function Accept(a) {
        // a == studentuiid
        // put the student in graduatedstudent collection
        await setDoc(doc(db, "GraduatedStudents", a), {
            message: "Congratulations on your long journey for a Masters Degree @ CCNY ZERO. Your efforts have payed off and we wish you the best of luck in your future endeavors. ~ CCNY ZERO",
        });
        await deleteDoc(doc(db, "AppliedGraduation", a));
        await deleteDoc(doc(db, "Students", a));
        alert("Student successfully appected for graduation!");
    }

    async function Reject(a) {
        // a == studentuiid
        let warncount;
        let studentdata;
        for (let i = 0; i < Students.length; i++) {
            if (Students[i].useruiid === a) {
                studentdata = Students[i];
                warncount = Students[i].numWarn;
                warncount += 1;
                break;
            }
        }
        if (warncount >= 3) {
            // add this student to the suspended collection with data
            await setDoc(doc(db, "SuspendedStudents", a), studentdata);
            const studentRef = doc(db, "SuspendedStudents", a);
            await updateDoc(studentRef, {
                message: "You have reached 3 warnings and therefore are suspended!"
            });
            alert("Student has reached 3 warnings and will be suspended.");
        }
        else {
            // add the doc to the warnings
            await addDoc(collection(db, "Students", a, "Warnings"), {
                Warn: "You have been given one warning for reckless graduation applciation",
                numofWarn: 1
            });
            const studentRef = doc(db, "Students", a);
            await updateDoc(studentRef, {
                numWarn: warncount
            });
            alert("Student successfully warned for reckless application");
        }
        await deleteDoc(doc(db, "AppliedGraduation", a));
    }

    return (
        <table className="xApplicationStudents">
            <tr>
                <th>Name</th>
                <th>GPA</th>
                <th>EMPL</th>
                <th>Credits Left</th>
                <th>Total Credits</th>
            </tr>
            {Graduate.map((gsc) => (
                <tr>
                    <td> {gsc.name} </td>
                    <td> {gsc.GPA} </td>
                    <td> {gsc.EMPL} </td>
                    <td> {gsc.Totalcredsleft} </td>
                    <td> {gsc.TotalCreds} </td>
                    <td>
                        <button onClick={() => Accept(gsc.StudentUiid)}>Accept</button>
                        <button onClick={() => Reject(gsc.StudentUiid)}>Reject</button></td>
                </tr>
            ))}
        </table>
    )

};