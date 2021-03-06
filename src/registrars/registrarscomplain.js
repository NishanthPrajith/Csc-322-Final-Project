import './registrarscomplain.css';
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc} from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RegistrarsComplain(){
  const history = useHistory();
  const [complains, setComplains] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [Instructor, setInstructor] = useState([]);

  async function getComplaints(db) {
    const complainsCol = collection(db, 'Complaints');
    const complainsColid = collection(db, 'Complaints');
    onSnapshot(complainsCol, (querySnapshot) => {
      let complain = [];
      querySnapshot.forEach((doc) => {
        complain.push(doc.data())
      });
      onSnapshot(complainsColid, (querySnapshot) => {
        const complainid = [];
        querySnapshot.forEach((doc) => {
          complainid.push(doc.id)
        });
        for(let i=0; i<complainid.length; i++){
          complain[i].Uid = complainid[i];
        }
        setComplains(complain)
        });
    });
  }
  
  async function getReviews(db) {
    const reviewsCol = collection(db, 'Reviews');
    const reviewsColid = collection(db, 'Reviews');
    onSnapshot(reviewsCol, (querySnapshot) => {
      const review = [];
      querySnapshot.forEach((doc) => { 
        review.push(doc.data());
      });
      onSnapshot(reviewsColid, (querySnapshot) => {
        const reviewsid = [];
        querySnapshot.forEach((doc) => {
          reviewsid.push(doc.id)
        });
        for(let i=0; i<reviewsid.length; i++){
          review[i].Uid = reviewsid[i];
        }
      setReviews(review);
      });
    });
  }

  async function getInstructors(db) {
    const complainsCol = collection(db, 'Instructor');
    onSnapshot(complainsCol, (querySnapshot) => {
      const complain = [];
      querySnapshot.forEach((doc) => {
        complain.push(doc.data());
      });
      setInstructor(complain);
    });
  }

  useEffect(() => {
    getComplaints(db);
    getReviews(db);
    getInstructors(db);
  }, []);

  async function HandleComplaint(a){ 
  await deleteDoc(doc(db, "Complaints", a));
  alert("Thank you for dealing with this complaint!");
  await history.push('RegistrarsComplains');
  }

  async function InstructorWarn(a,b){
    if(b<4){
      for(let i = 0; i<Instructor.length; i++){
        if(Instructor[i].useruiid === a){
          var count = Instructor[i].numWarn;
          count  = ++count;
          const washingtonRef = doc(db, "Instructor",a);
          await updateDoc(washingtonRef, {
            numWarn: count
          });
        }
      }
      // WITHOUT UID IS ADD DOC
      await addDoc(collection(db, "Instructor",a,"Warnings"), { 
        Warn: "You have been Reviewed with a low rating. Please improve your effort in teaching.",
        Warnnum: count
      });
    }
    // Will suspend the instructor by deleting doc and pushing to "suspended" collection
    if(count===3){
      // To copy a collections contents to another collection we do this:
      const instRef = collection(db, 'Instructor');
      onSnapshot(instRef, (querySnapshot) => {
        const inst = [];
        querySnapshot.forEach((doc) => {
          inst.push(doc.data());
      });
      var q ; 
      for(let i =0; i < complains.length; i++){
        q = complains[i].Suspended;
        break;
    }
      q = true;
      const washingtonRef = doc(db, "Instructor",a);
      updateDoc(washingtonRef, {
        Suspended: q
      });
         
      const instRef2 = collection(db, 'AssignedClasses');
      onSnapshot(instRef2, (querySnapshot) => {
        const inst2 = [];
        querySnapshot.forEach((doc) => {
          inst2.push(doc.data());
        });

        const complRef = collection(db, 'Complaints');
      onSnapshot(complRef, (querySnapshot) => {
        const complaintCol = [];
        querySnapshot.forEach((doc) => {
          complaintCol.push(doc.data());
      });

      for(let j = 0; j<inst2.length; j++){
        if(inst2[j].Instructoruiid === a){
          deleteDoc(doc(db, "AssignedClasses", inst2[j].Class)); 
        } 
      }

      for(let i = 0; i<inst.length; i++){
        if(inst[i].useruiid === a){
          var varpush = inst[i];
          var update = {
                        firstname: varpush.firstname,
                        lastname: varpush.lastname,
                        Email: varpush.Email, 
                        DateofBirth: varpush.DateofBirth,
                        password: varpush.password,
                        Role: varpush.Role,
                        numWarn: 0, 
                        numReview: varpush.numReview, 
                        Review: varpush.Review,
                        useruiid: a,
                        numCourses: varpush.numCourses,
                        Suspended: varpush.Suspended,
                        canceledCourses: varpush.canceledCourses,
                        gradingTime: varpush.gradingTime,
                      }
          setDoc(doc(db, "Instructor", a), update);
          for(let c = 0; c < complains.length; c++){
            if(complains[c].IssuedName === varpush.firstname + " " + varpush.lastname){
              deleteDoc(doc(db, "Complaints", complains[c].Uid));
            }
          } 
          for(let r = 0; r < Reviews.length; r++){
            if(Reviews[r].InstructorName === varpush.firstname + " " + varpush.lastname){
              deleteDoc(doc(db, "Reviews", Reviews[r].Uid));
            }
            break;
          }
          //setDoc(doc(db, "Suspended", a), update);
          break;
        }
      }
    });
        });
      });
    alert("Be sure to suspend this instructor as they have met the 3 warnings needed to be suspended!");
    }
  }
    
  return (
    <div className= "review-complains">
      <table className = "complain-table">
        <h2>Complaints</h2>
          <tr>
            <th>From</th>
            <th>To</th>
            <th className="complain-table-th-for-complaint">Complaint</th>
          </tr>
          { complains.map((complain) => (
          <tr>
            <td> { complain.SentBy } </td>
            <td> { complain.IssuedName } </td>
            <td className="Complain-column"> { complain.Complaint } </td>
            <td> <button className="handle-button"onClick={() => HandleComplaint(complain.Uid)}>X</button></td>
          </tr>
        ))}
      </table>
        
      <table className = "review-table">
        <h2>Reviews</h2>
          <tr>
            <th>Name</th>
            <th className="review-table-th-for-course">Course</th>
            <th className="review-table-th-for-instructor">Instructor</th>
            <th className="review-table-th-for-rating">Rating</th>
            <th className="review-table-th-for-review">Review</th>
          </tr>
          { Reviews.map((review) => (
          <tr>
            <td> { review.SentBy} </td>
            <td> { review.Course} </td>
            <td className="Instructor-column"> { review.InstructorName} </td>
            <td> { review.InstructoravgReview} </td>
            <td className="Review-column"> { review.Review} </td>
            <td>
            <button className="warn-button"onClick={() => InstructorWarn(review.InstructorUiid,
                                                      review.InstructoravgReview
                                                      )}>Warn</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
  
}