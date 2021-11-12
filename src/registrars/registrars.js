import './registrars.css'
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from "../firebase.js";
import { collection, doc, query, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";

export default function registrars() {

    // const [Student, Student] = useState('');
    // const [CurrentClasses, setCurrentClasses] = useState([]);
    // const [CurrentRoster, setCurrentRoster] = useState([]);
    // const [Loading, setLoading] = useState('false');

    // async function getCourses() {
    //     var myUserId = firebase.auth().currentUser.uid;
    // }
    return (
        <h1>REGISTRARS VIEW</h1>
    );
}