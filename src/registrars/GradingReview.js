import './GradingReview.css'
import { useState, useEffect } from 'react';
import { db } from "../firebase.js";
import { collection, addDoc,setDoc,doc,onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

var instructordata;
export default function GradingReview(){
    const [Loading, setLoading] = useState('false');
    const [CurrentClasses, setGradedClasses] = useState([]);
    const [CurrentInstructors, setInstructors] = useState([]);

    // gets the instructors collection 
    async function getInstructors(db){
        const Instructors = collection(db, 'Instructor');
        setLoading(true);
       onSnapshot(Instructors, (querySnapshot) => {
          const inst = [];
          querySnapshot.forEach((doc) => {
            inst.push(doc.data());
          });
          setInstructors(inst);
        });
        setLoading(false);
    }

    // gets the graded students data
    async function getGradedClasses(db){
        let sort = [];
        const GradedClasses = collection(db, 'GradedClasses');
        setLoading(true);
       onSnapshot(GradedClasses, (querySnapshot) => {
          const classs = [];
          querySnapshot.forEach((doc) => {
            classs.push(doc.data());
          });
          for(let i = 0; i<classs.length; i++){
              if(classs[i].ClassGPA>3.5 || classs[i].ClassGPA<2.5){
                sort.push(classs[i])
              }
          }
          setGradedClasses(sort);
        });
        setLoading(false);
    }

    async function Warn_Instructor(a){
        // a == instructoruiid
        let numof_instructor_warnings;
        for(let i = 0; i<CurrentInstructors.length; i++){
            if(CurrentInstructors[i].useruiid===a){
                instructordata = CurrentInstructors[i];
                numof_instructor_warnings = CurrentInstructors[i].numWarn;
                break;
            }
        }
        ++numof_instructor_warnings;
        if(numof_instructor_warnings>=3){
            // the instructor has 3 or more warnings, so we need to suspend him
            // add the doc to the warnings 
            await setDoc(doc(db, "Suspended", a), instructordata);
            // await deleteDoc(doc(db, "Instructor", a));
            const washingtonRef = doc(db, "Suspended", a);
            await updateDoc(washingtonRef, {
            message: "You have been suspended due 3+ warnings!"
            });
            return
        }
        else{
            // warn them 
            // add the doc to the warnings
            const washingtonRef = doc(db, "Instructor", a);
            await updateDoc(washingtonRef, {
            numWarn: numof_instructor_warnings
            });
            await addDoc(collection(db, "Instructor",a,"Warnings"), {
                Warn: "You have been warned becuase ClassGPA being above 3.5 or less than 2.5!",
                numofWarn: 1
            });
            alert("Instructor has been warned!");
            return
        }

    }

    async function Delete_Investigation(a) {
        // a === class === doc id 
        await deleteDoc(doc(db, "GradedClasses", a));
        return
    }
    async function Terminate_Instructor(a) {
        // a == instructor uiid
        await setDoc(doc(db, "Suspended", a), instructordata);
        // await deleteDoc(doc(db, "Instructor", a));
        const washingtonRef = doc(db, "Suspended", a);
        await updateDoc(washingtonRef, {
        message: "You have been suspended due 3+ warnings!"
        });
        alert("Instructor has been terminated!");
        return
    }

    useEffect(() => {
        setLoading(true);
        getGradedClasses(db);
        getInstructors(db)
      }, []);

    if (Loading) {
    return <h1> Loading .. </h1>
    }

    return (

        <div className = "gradingReviewHeading">
        <h1>Investigating Professors</h1>
        <table className="registars-grading-review-table">
            <tr>
                <th>Instructor</th>
                <th>Course</th>
                <th> Class GPA</th>
            </tr>
            { CurrentClasses.map((Class) => (
                <tr>
                    <td> { Class.Class } </td>
                    <td> { Class.Instructor } </td>
                    <td> { Class.ClassGPA.toFixed(2) } </td>
                    <td className="all-the-buttons"> <button className="warn-button-grading-review" onClick = {() => Warn_Instructor(Class.InstructorUIID)}>Warn</button> 
                         <button className="terminate-button-grading-review" onClick = {() => Terminate_Instructor(Class.InstructorUIID)}>Terminate</button> 
                         <button className="delete-button-grading-review" onClick = {() => Delete_Investigation(Class.Class)}>X</button> </td>
                </tr>
            ))}
        </table>

    </div>


    )
}

