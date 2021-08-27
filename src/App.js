
import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from "./firebase.js";
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';

function App() {
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
    <div className="App">
      { schools.map((school) => (
        <div>
          <h1> { school.Name } </h1>
          <p> { school.Desc } </p>
        </div>
      ))}

      <p>Done</p>
    </div>
  );
}

export default App;
