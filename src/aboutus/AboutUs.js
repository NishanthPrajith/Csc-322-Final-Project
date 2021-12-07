import './AboutUs.css';
import { db } from "../firebase.js";
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';


export default function AboutUs() {
  const [students, setStudents] = useState([]);
  const [tclasses, setTclasses] = useState([]);
  const [lclasses, setLclasses] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getStudents(db) {
    const studentsCol = collection(db, 'TopStudents');
    setLoading(true);
   onSnapshot(studentsCol, (querySnapshot) => {
      const student = [];
      querySnapshot.forEach((doc) => {
          student.push(doc.data());
      });
      student.sort((a,b)=> {
        return (a.GPA<b.GPA) ? 1:-1
      })
      setStudents(student.slice(0,5));
    });
    setLoading(false);
  }
  async function getTclasses(db) {
    const schoolsCol = collection(db, 'TopClasses');
    setLoading(true);
    onSnapshot(schoolsCol, (querySnapshot) => {
      const topratingclass = [];
      querySnapshot.forEach((doc) => {
          topratingclass.push(doc.data());
      });
      topratingclass.sort((a,b)=> {
        return (a.Rating<b.Rating) ? 1:-1
      })
      setTclasses(topratingclass.slice(0,5));
    });
    setLoading(false);
  }
  async function getLclasses(db) {
    const schoolsCol = collection(db, 'TopClasses');
    setLoading(true);
    onSnapshot(schoolsCol, (querySnapshot) => {
      const lowratingclass = [];
      querySnapshot.forEach((doc) => {
          lowratingclass.push(doc.data());
      });
      lowratingclass.sort((a,b)=> {
        return (a.Rating>b.Rating) ? 1:-1
      })
      setLclasses(lowratingclass.slice(0,5));
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
      <div className = "AboutFirstHeader">
        <div>
          <h1> Welcome to The City College of New York </h1>
        </div>
      </div>
      

      <div className = "AboutFourthHeader">
        <div className = "one">
          <p>About Us</p>
        </div>
        <div className = "two">
          <p>The City College of New York (established as 'The Free Academy' in 1847) is the founding institution of the City University of New York and home to eight schools and divisions, each dedicated to the advancement of research and knowledge. We're the place where Albert Einstein first presented his theory of general relativity outside of Europe, our alumni discovered the polio vaccine, helped build the Internet, and designed the Panama Canal. And, our alumni have gone on to become Supreme Court Justices, Secretaries of State, leaders of industry, world-renowned researchers and award winning actors and musicians. We’re the City College of yesterday, today and tomorrow. See yourself here. City College.</p>
        </div>
      </div>

      <div className = "AboutSecondHeader3" >
        <div>
          <h2>CCNY Schools and Divisions</h2>
          <div className = "AboutSecondHeader3-div">
            <p>Division of Humanities & the Arts</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>CUNY School of Medicine</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>The Grove School of Engineering</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>The Bernard and Anne Spitzer School of Architecture</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>Colin Powell School for Civic and Global Leadership</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>Division of Interdisciplinary Studies at the Center for Worker Education</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>School of Education</p>
          </div>
          <div className = "AboutSecondHeader3-div">
            <p>The Division of Science</p>
          </div>    
        </div>
      </div>
      <div className = "AboutThirdHeader">
        <div>
          <div>
            <h3>$5M+</h3>
            <p>Total student scholarships, stipends, and fellowships awarded</p>
          </div>
          <div>
            <h3>115+</h3>
            <p>Number of undergraduate majors and master's programs</p>
          </div>
          <div>
            <h3>150+</h3>
            <p>Total number of countries that CCNY students represent</p>
          </div>
          <div>
            <h3>95.6%</h3>
            <p>Full-time faculty members who hold terminal degrees in their fields</p>
          </div>
        </div>
      </div>
      <div className="videoHome">
      <iframe
            title='video'
            width="560"
            height="315"
            src="https://www.youtube.com/embed/q4LZ3NdkmH8"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <div className= "students">
        <h2>Top students and Top Classes</h2>
        <table className = "x">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>GPA</th>
            </tr>
            { students.map((student) => (
            <tr>
              <td> { student.First } </td>
              <td> { student.Last } </td>
              <td> { student.GPA } </td>
            </tr>
          ))}
        </table>
        <table className = "x">
            <tr>
              <th>Course</th>
              <th>Rating</th>
            </tr>
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
              <td> { lclass.Course } </td>
              <td> { lclass.Rating } </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}