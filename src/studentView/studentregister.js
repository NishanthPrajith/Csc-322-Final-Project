import './studentregister.css'
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import emailjs from 'emailjs-com';

async function seeCourses(){

}
export default function StudentRegister() {
const [courses, setCourses] = useState([]);








    return (
        <div>
        <table className="sCourses">
                <tr>
                    <th>Class</th>
                    <th>Day/Time</th>
                    <th>Room</th>
                    <th>Section</th>
                    <th>Size</th>
                    <th></th>
                </tr>
                {courses.map((course) => (
                    <tr>
                        <td> {course.Class} </td>
                        <td> {course.DayTime} </td>
                        <td> {course.Room} </td>
                        <td> {course.Section} </td>
                        <td> {course.Size} </td>
                        <td><button onClick={() => seeCourses(course.Class, 
                                                      course.DayTime, 
                                                      course.Room, 
                                                      course.Section, 
                                                      course.Size
                                                      )}>Assign Course</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}