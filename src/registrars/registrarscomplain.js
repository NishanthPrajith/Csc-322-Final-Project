import './registrarscomplain.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';


var instName;
var instuid;
export default function RegistrarsComplain(){
const [complains, setStudents] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [Instructor, setInstructor] = useState([]);
  const [loading, setLoading] = useState(false);
  const taboowords = []

  async function getStudents(db) {
    console.log("hi");
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

  async function getInstructor1(db) {
    const complainsCol = collection(db, 'Instructor');
    setLoading(true);
   onSnapshot(complainsCol, (querySnapshot) => {
      const complain = [];
      querySnapshot.forEach((doc) => {
          complain.push(doc.data());
      });
      console.log(complain);
      setInstructor(complain);
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
      console.log(review);
      for(let i = 0; i<Instructor.length; i++){
        for(let j= 0; j<review.length; j++){
          if(Instructor[i].useruiid === review[j].InstructorName){
            instuid = Instructor[i].useruiid;
            instName = Instructor[i].firstname + " " + Instructor[i].lastname;
            review[j].InstructorName = instName;
            // average formula
            let t_total = (Instructor[i].Review) * (Instructor[i].numReview);
            let new_total = (t_total) + (review[j].Rating);
            let new_updated_total = (new_total)/((Instructor[i].numReview) + 1);
            let newreview = (Instructor[i].numReview) + 1;
            const instRef = doc(db, "Instructor", Instructor[i].useruiid);
            // await updateDoc(instRef, {
            //   Review: new_updated_total,
            //   numReview:newreview
            // });
            review[j].Rating = new_updated_total;
          }
        }
      }
      console.log(review);
      setReviews(review);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getInstructor(db);
    getInstructor1(db);
  }, []);

  // IMPLEMENT LATER
  async function HandleComplaint(){
  }

  async function InstructorWarn(a){
    var avgReview;
    // for()

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
              <td className="Compla"> { complain.Complaint } </td>
              <td> <button onClick={() => HandleComplaint()}>Handle</button></td>
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
              <td className="Review"> { review.Review} </td>
              <td>
                <button onClick={() => InstructorWarn(review.Review,
                                                      )}>Warn</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
}