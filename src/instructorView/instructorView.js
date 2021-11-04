import './instructorView.css'
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, getDocs, onSnapshot } from 'firebase/firestore';

export default function InstructorView() {
    const [Instructor, setInstructor] = useState('false');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
    const [Loading, setLoading] = useState('false');

    async function getCourses(db) {
        const docRef = doc(db, "Instructor", "{Instructor.name}", "Courses", "CurrentCourses")
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data:", docSnap.data());
        }
        else {
            console.log("No such document!");
            return -1;
        }

        //const instructor = [];
        const currentCourses = [];
        //const instructorsCol = collection(db, 'Instructor');
        //setLoading(true);

        const getDataCourses = onSnapshot(docSnap, (querySnapshot) => {
          docSnap.forEach((doc) => {
              currentCourses.push(doc.data());
          });
          setCurrentClasses(currentCourses);
          return currentCourses;
        }); 
        
    }
    function closeNavLink() {
        window.scroll(0,0);
    }
    function Schedule (db){

    }

    function Roster(event) {

    }

    function Grades () {

    }
    return (
        <div>
            <nav>
                <div className = "firstNav">
                    <Link to = '/' onClick = {closeNavLink}>
                      <p className = "logo">CCNYZero</p>
                    </Link>
                    <div>
                        <Link to = '/AboutUs' onClick = {closeNavLink}>
                            <p className = "links">About Us</p>

                        </Link>
                    </div>
                    <div>
                    <p className = "introMessage">Hello, Instructor{Instructor}</p>
                    </div>
                </div>
            </nav>


      </div>
    )
}