
import './AboutUs.css';
import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';




export default function AboutUs() {
  const [students, setStudents] = useState([]);
  const [tclasses, setTclasses] = useState([]);
  const [lclasses, setLclasses] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getStudents(db) {
    const studentsCol = collection(db, 'TopStudents');
    setLoading(true);
    const getData = onSnapshot(studentsCol, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data());
      });
      console.log(cities);
      setStudents(cities);
    });

    setLoading(false);
  }
  async function getTclasses(db) {
    const schoolsCol = collection(db, 'TopClasses');
    setLoading(true);
    const getData = onSnapshot(schoolsCol, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data());
      });
      console.log(cities);
      setTclasses(cities);
    });

    setLoading(false);
  }
  async function getLclasses(db) {
    const schoolsCol = collection(db, 'LowClasses');
    setLoading(true);
    const getData = onSnapshot(schoolsCol, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data());
      });
      console.log(cities);
      setLclasses(cities);
    });

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getTclasses(db);
    getLclasses(db);
  }, []);

  if (loading) {
    return <h1> Loading .. </h1>
  }

  return (
    <div className = "main">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <div className= "students">
        <table className = "x" >
          <tr><th>First Name</th><th>Last Name</th><th>GPA</th></tr>
        { students.map((student) => (
          <tr>
            <td> { student.First } </td>
            <td> { student.Last } </td>
            <td> { student.GPA } </td>
          </tr>
        ))}
        </table>
        </div>
        <table className = "x">
          <tr><th>Course</th><th>Rating</th></tr>
        { tclasses.map((tclass) => (
          <tr>
            <td> { tclass.Course } </td>
            <td> { tclass.Rating } </td>
          </tr>
        ))}
        </table>
        <table className = "x">
          <tr><th>Course</th><th>Rating</th></tr>
        { lclasses.map((lclass) => (
          <tr>
            <td> { lclass.Class } </td>
            <td> { lclass.Rating } </td>
          </tr>
        ))}
        </table>
    </div>
    )
}