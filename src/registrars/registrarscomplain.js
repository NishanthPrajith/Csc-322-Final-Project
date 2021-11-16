import './registrarscomplain.css'
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { userData } from '../contexts/userProfile';

export default function registrarscomplain(){
    return(
        <div>
            <h1>Pending Complains</h1>
        </div>
    );
}