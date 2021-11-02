import './home.css'
import '../signIn/SignIn.js'

import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import SignIn from '../signIn/SignIn';


export default function Home() {
  return (
    <div className = "main">
      <SignIn /> 
      <iframe width="420" height="315"src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>     
    </div>
  )
}
