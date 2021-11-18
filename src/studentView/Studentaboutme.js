import './studentaboutme.css'
import React from 'react';
import { userData } from '../contexts/userProfile';
export default function Studentaboutme() {
    return (
        <div>
        <p>First Name: {userData.getFirstname()}</p>
        <p>Last Name: {userData.getLastname()}</p>
        <p>Date of Birth: {userData.getDob()}</p>
        <p>GPA: {userData.getGPA()}</p>
        <p>EMPL: {userData.getEmpl()}</p>
        <p>Email: {userData.getEmail()}</p>
        </div>
    );
}