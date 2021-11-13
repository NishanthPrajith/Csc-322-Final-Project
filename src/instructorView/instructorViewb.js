import './instructorView.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";

export default function InstructorViewb() {
    const [Instructor, setInstructor] = useState('');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
    const [Loading, setLoading] = useState('false');

    // function writeUserData(emplId, name, email) {
    //     const db = getDatabase();
    //     set(ref(db, 'Instructor/' + emplId), {
    //       username: name,
    //       email: email,
    //     });
    //   } 
      
    //writeUserData(398393, 'John Doe', 'fdjlfdjdfl@yahoo.com');
    
    async function getCourses() {
        var myUserId = firebase.auth().currentUser.uid;
        //var myReviews = firebase.firestore().collectionGroup('Instructor')
        //.where('collection', '==', myUserId);
        //myReviews.get().then(function (querySnapshot) {
    // Do something with these reviews!
        const UserRef = collection(db, "Instructor");
        //const q  = query(UserRef, where (""))
        const instructorNames = collection(db, 'Instructor');
        // const docSnap = await getDoc(docRef);

        // if(docSnap.exists()){
        //     console.log("Document data:", docSnap.data());
        // }
        // else {
        //     console.log("No such document!");
        //     return -1;
        // }

        const currentCourses = [];
        setLoading(true);
        const getDataCourses = onSnapshot(docSnap, (querySnapshot) => {
          docSnap.forEach((doc) => {
              currentCourses.push(doc.data());
          });
          setCurrentClasses(currentCourses);
          return CurrentClasses;
        }); 
        
    }

    async function getCourseNames() {
        let documentRef = firestore.doc('Instructor/John Smith/');
        documentRef.listCollections().then(collections => {
        for (let collection of collections) {
        console.log(`Found subcollection with id: ${collection.id}`);
  }
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
                </div>
                <table className = "x">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>GPA</th>
            </tr>
            { CurrentClasses.map((cCourses) => (
            <tr>
              <td> { cCourses.collection} </td>
            </tr>
          ))}
        </table>
            </nav>

      </div>
    )
}