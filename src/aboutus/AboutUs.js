
import './AboutUs.css';
import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';




export default function AboutUs() {
  const [students, setStudents] = useState([]);
  const [tclasses, setTclasses] = useState([]);
  const [lcasses, setLclasses] = useState([]);
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

      { students.map((student) => (
        <div>
          <p> { student.First } </p>
          <p> { student.Last } </p>
          <p> { student.GPA } </p>
        </div>
      ))}
    </div>
    )
}