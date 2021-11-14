import './instructorView.css'
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import Tabs from '../components/Tabs';

export default function InstructorView() {
    const [Instructor, setInstructor] = useState('');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
    const [Loading, setLoading] = useState('false');

    
    async function GetInfo(db){
        const { login, currentUser } = useAuth();
        const {emailRef, passwordRef} = useRef();
        try{
            const useruiid = await login(emailRef.current.value, passwordRef.current.value);
            const docRef = doc(db, "Instructor", useruiid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists())
                setInstructor(docSnap.data().firstname + ' ' + docSnap.data().lastname);  
        }
        catch (error) {
            document.getElementById('error').style.display = "block";
        }        
    }

     async function getCourses(db) {
    //     const docRef = doc(db, "Instructor", "{Instructor.name}", "Courses", "CurrentCourses")
    //     const docSnap = await getDoc(docRef);

    //     if(docSnap.exists()){
    //         console.log("Document data:", docSnap.data());
    //     }
    //     else {
    //         console.log("No such document!");
    //         return -1;
    //     }

    //     //const instructor = [];
    //     const currentCourses = [];
    //     //const instructorsCol = collection(db, 'Instructor');
    //     //setLoading(true);

    //     const getDataCourses = onSnapshot(docSnap, (querySnapshot) => {
    //       docSnap.forEach((doc) => {
    //           currentCourses.push(doc.data());
    //       });
    //       setCurrentClasses(currentCourses);
    //       return currentCourses;
    //     }); 
        
     }
    // function closeNavLink() {
    //     window.scroll(0,0);
    // }
    // function Schedule (db){

    // }

    // function Roster(event) {

    // }

    // function Grades () {

    // }

    async function getRoster (db) {

    }

    async function getGrades(db) {


    }

    useEffect(() => {
        setLoading(true);
        // getStudents(db);
        // getTclasses(db);
        // getLclasses(db);
      }, []);

    return (
        <div>
            <Tabs>
                <div label="Schedule" onClick = {getCourses}>
                    {/* <button onClick = {getCourses}>Schedule</button>                  */}
                </div>
                <div label= "Roster" onClick = {getRoster}>                    
                    {/* <button onClick = {getRoster}>Roster</button> */}
                </div>
                <div label = "Grades" onClick = {getGrades}>
                    {/* <button onClick = {getGrades}>Grades</button> */}
                </div>                
            </Tabs>    
            <p className ="introMessage">Hello, Instructor: {Instructor}</p>
        </div>
    )
};
