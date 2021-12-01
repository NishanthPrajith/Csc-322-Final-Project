import './GradingReview.css'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";
import { collection, addDoc,setDoc,doc } from 'firebase/firestore';


export default function GradingReview(){
    
    return (

        <div className = "gradingReviewHeading">
        <h1>Investigating Professors</h1>
        <table className="registars-grading-review-table">
            <tr>
                <th>Instructor</th>
                <th>Course</th>
                <th> Class GPA</th>
            </tr>
            <tr>
                <td> Dummy Data  </td>
                <td> Dummy Data  </td>
                <td>  Dummy Data </td>
                    <button className = "gradingReview-warn-button">Warn</button>
                    <button className = "gradingReview-terminate-button">Terminate</button> 
            </tr>
        </table>

    </div>


    )
}

