import './registrarscomplain.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function RegistrarsComplain(){
const [complains, setStudents] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getStudents(db) {
    const complainsCol = collection(db, 'Complaints');
    setLoading(true);
   onSnapshot(complainsCol, (querySnapshot) => {
      const complain = [];
      querySnapshot.forEach((doc) => {
          complain.push(doc.data());
      });
      setStudents(complain);
    });
    setLoading(false);
  }
  async function getInstructor(db) {
    const reviewsCol = collection(db, 'Reviews');
    setLoading(true);
    onSnapshot(reviewsCol, (querySnapshot) => {
      const review = [];
      querySnapshot.forEach((doc) => {
          review.push(doc.data());
      });
      setReviews(review);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getInstructor(db);
  }, []);


  // IMPLEMENT LATER
  async function ComplaintPopup(){
  
  }

  async function InstructorWarn(a,b){
    
  }

    return (
        <div className= "studentsRegView">
        
        <table className = "xStu">
          <h2>Complaints</h2>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Complaint</th>
            </tr>
            { complains.map((complain) => (
            <tr>
              <td> { complain.SentBy } </td>
              <td> { complain.IssuedName } </td>
              <td> { complain.Complaint } </td>
              <td> <button onClick={() => ComplaintPopup()}>Complaint</button></td>
            </tr>
          ))}
        </table>
        <table className = "xFac">
            <h2>Reviews</h2>
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Rating</th>
                <th>Review</th>
            </tr>
          { Reviews.map((review) => (
            <tr>
              <td> { review.SentBy} </td>
              <td> { review.Course} </td>
              <td> { review.InstructorName} </td>
              <td> { review.Rating} </td>
              <td> { review.Review} </td>
              <td>
                <button onClick={() => InstructorWarn(review.firstname,
                                                      review.lastname
                                                      )}>Warn</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
}