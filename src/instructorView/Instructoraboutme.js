import './Instructoraboutme.css'
import React from 'react';
import { userData } from '../contexts/userProfile';
export default function Instructoraboutme() {
    return (
        <div>
        <p>First Name: {userData.getFirstname()}</p>
        <p>Last Name: {userData.getLastname()}</p>
        <p>Date of Birth: {userData.getDob()}</p>
        <p>College GPA: {userData.getGPA()}</p>
        <p>Email: {userData.getEmail()}</p>
        </div>
    );
}