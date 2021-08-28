import './home.css'

import { db } from "../firebase.js";
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';


export default function Home() {

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getCities(db) {
    const schoolsCol = collection(db, 'schools');
    setLoading(true);
    const getData = onSnapshot(schoolsCol, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data());
      });
      console.log(cities);
      setSchools(cities);
    });

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getCities(db);
  }, []);

  if (loading) {
    return <h1> Loading .. </h1>
  }

  return (
    <div className = "main">
      { schools.map((school) => (
        <div>
          <h1> { school.Name } </h1>
          <p> { school.Desc } </p>
        </div>
      ))}
    </div>
  )
}
