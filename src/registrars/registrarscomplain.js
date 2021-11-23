import './registrarscomplain.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc } from 'firebase/firestore';
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
  const taboowords = ["shit","dang","damn"];

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

  async function getInstructor1(db) {
    const complainsCol = collection(db, 'Instructor');
    setLoading(true);
   onSnapshot(complainsCol, (querySnapshot) => {
      const complain = [];
      querySnapshot.forEach((doc) => {
          complain.push(doc.data());
      });
      setInstructor(complain);
    });
    setLoading(false);
    // changeUI();
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
  // change UI
  // function changeUI(){
  //   console.log(Reviews.length);
  //   console.log(Instructor.length);
  //   for(let i = 0; i<Instructor.length; i++){
  //     for(let j= 0; j<Reviews.length; j++){
  //       console.log("hi");
  //       if(Instructor[i].useruiid === Reviews[j].InstructorName){
  //         instuid = Instructor[i].useruiid;
  //         instName = Instructor[i].firstname + " " + Instructor[i].lastname;
  //         console.log(instName);
  //         Reviews[j].InstructorName = Instructor[i].firstname + " " + Instructor[i].lastname;
  //         console.log(Reviews);
  //         // // average formula
  //         // let t_total = (Instructor[i].Reviews) * (Instructor[i].numReviews);
  //         // let new_total = (t_total) + (Reviews[j].Rating);
  //         // let new_updated_total = (new_total)/((Instructor[i].numReviews) + 1);
  //         // console.log(new_updated_total);
  //         // let newReviews = (Instructor[i].numReviews) + 1;
  //         // const instRef = doc(db, "Instructor", Instructor[i].useruiid);
  //         // updateDoc(instRef, {
  //         //   Reviews: new_updated_total,
  //         //   numReviews:newReviews
  //         // });
  //         Reviews[j].Rating = Instructor[i].Review;
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    setLoading(true);
    getStudents(db);
    getInstructor(db);
    getInstructor1(db);
  }, []);

  // IMPLEMENT LATER
  async function HandleComplaint(){
  }

  async function InstructorWarn(a,b){
  // Add a new document in collection "cities"
  // const random  = Math.floor(Math.random() * 100)
  if(b<3){
    for(let i = 0; i<Instructor.length; i++){
      if(Instructor[i].useruiid === a){
        var count = Instructor[i].numWarn;
        count  = ++count;
        const washingtonRef = doc(db, "Instructor",a);
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        numWarn: count
      });
    }
    await addDoc(collection(db, "Instructor",a,"Warnings"), {
      Warn: "You have been Reviewed with a low rating. Please imporve your effort in teaching.",
    });
  }
  if(count===3){
    alert("Instrcutor has been suspended");
    }
  }
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
              <td> { review.InstructoravgReview} </td>
              <td className="Review"> { review.Review} </td>
              <td>
                <button onClick={() => InstructorWarn(review.InstructorUiid,
                                                      review.InstructoravgReview
                                                      )}>Warn</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
}