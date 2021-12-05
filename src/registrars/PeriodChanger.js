import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc,getDoc, query, where, increment, orderBy, limit } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';
import StudentcourseAssignPopup from './StudentDeregister';


export default async function PeriodChanger(Students, Instructors, waitlist,complains,Reviews) {
    let docRef = await getDoc(doc(db,"gradingperiod","0t678Obx9SKShD3NR3I4"));
    let docData = docRef.data().classsetup;
    if(docData === "0"){
        alert("Class Set-Up Period");
        for(let i = 0; i < Students.length; i++){
            let studentID = Students[i].useruiid;
            Students[i].registerAllow = false;
            //Students[i].lessThan2CoursesWarning = false;
            Students[i].canceledCourses = false;
            updateDoc(doc(db, "Students", studentID), {registerAllow: false, canceledCourses: false}); //lessThan2CoursesWarning: false
        }

        for(let i = 0; i < Instructors.length; i++){
            let instructorID = Instructors[i].useruiid;
            Instructors[i].canceledCourses = false;
            updateDoc(doc(db, "Instructor", instructorID), {canceledCourses: false});
        }        
    }
    else if(docData === "1"){
        alert("Class Registration Period");
        for(let i = 0; i < Students.length; i++){
            let studentID = Students[i].useruiid;
            if(Students[i].registerAllow == false){
                Students[i].registerAllow = true;
                updateDoc(doc(db, "Students", studentID), {registerAllow: true});
            }
        }
    }
    else if(docData === "2"){
       alert("Class Running Period");
        for(let i = 0; i < Students.length; i++){
            let studentID = Students[i].useruiid;
            Students[i].registerAllow = false;
            updateDoc(doc(db, "Students", studentID), {registerAllow: false});     // lessThan2CoursesWarning: false, // ,  canceledCourses: false
        }
        alert("a");

        for(let i = 0; i < Students.length; i++){
            let studentID = Students[i].useruiid;
            if(Students[i].numCourses < 2 && !(Students[i].lessThan2CoursesWarning)){
                StudentWarn2(studentID,"You have received a warning for enrolling in less than 2 classes", Students, waitlist, complains, Reviews);
                Students[i].lessThan2CoursesWarning = true;
            }
            updateDoc(doc(db, "Students", studentID), {lessThan2CoursesWarning: true});
        }
        alert("b");

        //CancelCourses();   
        const clistDelete = [];          
        const coursesCol = query(collection(db,'AssignedClasses'), where("StudentsEnrolled" , "<", 2)); 
        console.log(coursesCol);    
            //Starts CourseCancellation process

        onSnapshot(coursesCol, async function(courseSnapshot) {
        console.log(courseSnapshot); 
        //SetCanceledCourses = True for instructors and warn each one affected.
        courseSnapshot.forEach(async function(classes){
            if(classes.exists){
              let instructorID = classes.data().Instructoruiid;  //InstructorUiid and courseName is assigned for each instance of a class of Size < 5
              let courseName = classes.data().Class;
              let instructorDocRef = doc(db,"Instructor", instructorID);
              let instructorCourseDocRef = doc(db,"Instructor", instructorID,"Courses", courseName);
              const docSnap = await getDoc(instructorCourseDocRef);
              clistDelete.push(courseName);
              console.log("CourseName : ", courseName);
              for(let i = 0; i<Instructors.length; i++){  //Change was made.
                if((Instructors[i].useruiid == instructorID) && docSnap.exists()){
                  Instructors[i].canceledCourses = true;
                  let temp = Instructors[i].numCourses
                  Instructors[i].numCourses = temp - 1;
                  var test = false;
                  if (Instructors[i].numCourses == 0) {
                    test = true;
                  }
                  //updateDoc(instructorDocRef, {canceledCourses: true, numCourses: increment(-1), numWarn: warncount});     //Instructors of these courses are given a CanceledCourse: true, , numCourses: increment(-1)
                  //deleteDoc(instructorCourseDocRef);     //Class is deleted from their list of courses.
                  let warncount = Instructors[i].numWarn + 1;
                  Instructors[i].numWarn = warncount;
                  //updateDoc(instructorDocRef, {numWarn: warncount});
                  //  break;
                  // add the doc to the warnings
                  await updateDoc(instructorDocRef, {canceledCourses: true, Suspended: test, numCourses: Instructors[i].numCourses, numWarn: warncount});     //Instructors of these courses are given a CanceledCourse: true, , numCourses: increment(-1)
                  await deleteDoc(instructorCourseDocRef);     //Class is deleted from their list of courses.                  
                  await addDoc(collection(db, "Instructor",instructorID,"Warnings"), {Warn: "One of your courses has been canceled:" + courseName, numofWarn: warncount}); 

                }
              }
    
         //   updateDoc(instructorDocRef, {canceledCourses: true, numCourses: increment(-1)});     //Instructors of these courses are given a CanceledCourse: true, , numCourses: increment(-1)
         //   deleteDoc(instructorCourseDocRef);     //Class is deleted from their list of courses.     
    
            //InstructorWarn2(instructorID, "One of your courses has been canceled:" + courseName, Instructors);       // This is being repeated 3 times, for 2 classes?                  
            // for(let i = 0; i<Instructors.length; i++){  //Fix  this
            //     if(Instructors[i].useruiid === instructorID){
            //       let warncount = Instructors[i].numWarn + 1;
            //       alert(warncount);
            //         const washingtonRef = doc(db, "Instructor",instructorID);
            //         // Set the "capital" field of the city 'DC'
            //         updateDoc(washingtonRef, {
            //             numWarn: warncount
            //         });
            //       //  break;
            //       // add the doc to the warnings
            //       addDoc(collection(db, "Instructor",instructorID,"Warnings"), {
            //       Warn: "One of your courses has been canceled:" + courseName,
            //       numofWarn: warncount
            //       });
            //       }
            //   }
      
              for(let i = 0; i< Students.length; i++){        //Checks all students to see if the cancelled course is in their Courses
                let allCoursesStudent = collection(db,"Students",Students[i].useruiid, "Courses");
                onSnapshot(allCoursesStudent, (studentSnapshot) => {
                  studentSnapshot.forEach((studentCourse) =>{
                    if(studentCourse.data().Class != courseName)
                      return;
                    let studentDocRef = doc(db,"Students", Students[i].useruiid);
                    let studentCourseDocRef = doc(db,"Students", Students[i].useruiid,"Courses", courseName);
                    updateDoc(studentDocRef, {canceledCourses: true, numCourses: increment(-1)}); //Or setDoc with ,{merge: true} // , numCourses: increment(-1)
                    deleteDoc(studentCourseDocRef);
                  });
                }); 
              }
              //alert("wow");
              await deleteDoc(doc(db,"AssignedClasses", courseName)); //Delete the Assigned Course overall.
            }
          });  
        });  
        

        //console.log("Initial : ", clistDelete);
        //console.log(clistDelete.length);

        //  for (let k = 0; k < clistDelete.length; k++) {
        //    console.log(clistDelete[k]);
        //    console.log(k);
        //    deleteDoc(doc(db,"AssignedClasses", clistDelete[k]));
        //  }
        
        // console.log(Instructors.length);
        // for(let i = 0; i <Instructors.length; i++){
        //     let CANCELED = Instructors[i].canceledCourses;
        //     let NUMCOURSES = Instructors[i].numCourses;
        //     if(CANCELED == true){   //FIX THIS
        //         alert("d");
        //         if(NUMCOURSES == 0){ 
        //             alert(NUMCOURSES);
        //             Instructors[i].Suspended = true;
        //             updateDoc(doc(db, "Instructor", Instructors[i].useruiid), {Suspended: true});   //, canceledCourses: false
        //         }
        //     }
        // }
        
    }

    else if(docData === "3"){
        alert("Grading Period");
        for(let i = 0; i <Instructors.length; i++){
            Instructors[i].gradingTime = true;
            updateDoc(doc(db, "Instructor", Instructors[i].useruiid), {gradingTime: true});
        }   //Technically, we dont need this. We can simply check the period of the user or the period in general and make the grade button do nothing if not docData === "3".
    }

    else if(docData === "4") {
        alert("Semester End");
        // //Not Yet Tested
        // // AssignGradesMissed();
        // for(let i = 0; i < Instructors.length; i++){
        //     let instructorID = Instructors[i].useruiid;
        //     if(Instructors[i].AssignGradesMissedWarning == true)
        //         break;
        //     let courseRef =collection(db,"Instructor", instructorID,"Courses");
        //     onSnapshot(courseRef, (coursesList) => {
        //         coursesList.forEach((course) => {
        //             let courseName = course.data().Class;
        //             let rosterRef = collection(db,"Instructor", instructorID,"Courses",courseName, "Roster");
        //             onSnapshot(rosterRef, (rosterList) => {
        //                 let warningGiven = getDoc(doc(db,"Instructor", instructorID)).data().AssignGradesMissedWarning;
        //                 rosterList.forEach((entry) => {
        //                     if(entry.data().Grade == "" && !warningGiven){
        //                        InstructorWarn(instructorID, `You failed to grade all of your students within ${courseName} and possibly other classes as well, please assign grades ASAP!`);
        //                        updateDoc(doc(db,"Instructor", instructorID), {AssignGradesMissedWarning: true});
        //                     }
        //                 });
        //             });
        //         });
        //     }); 
        // }  

        // // InstructorInterrogation();
        // for(let i = 0; i < Instructors.length; i++){
        //     let instructorID = Instructors[i].useruiid;
        //     let courseRef = collection(db,"Instructor", instructorID, "Courses");
        //     onSnapshot(courseRef, (coursesList) => {
        //         coursesList.forEach((course) => {
        //             if(course.data().ClassGPA > 3.5 && !(course.data().Interrogated) )
        //                 QuestionRegistrar(`Why is your class GPA for ${course.data().Class} so High? Who bribed you?`);
        //                 updateDoc(doc(db, "Instructor", instructorID, "Courses", course.data().Class), {Interrogated:  true});
        //             if(course.data().ClassGPA < 2.5 && !course.data().Interrogated)
        //                 QuestionRegistrar(`Why is your class GPA for ${course.data().Class} so Low? Who hurt you?`);
        //                 updateDoc(doc(db, "Instructor", instructorID, "Courses", course.data().Class), {Interrogated:  true});
        //         })
        //     });
        // }        
        // // StudentTermination();
        // for(let i = 0; i < Students.length; i++){
        //     let studentID = Students[i].useruiid;
        //     if(Students[i].GPA < 2.0){
        //       terminateStudent(studentID, "You have been kicked out due to your GPA < 2.0.");
        //       break;
        //     }
        //     let studentRef = collection(db,"Students", studentID, "Record");
        //     onSnapshot((studentRef), (recordList) => {
        //       recordList.forEach((record) => {
        //         if(record.data().GradeArray == 2 && GradeArray[0] == GradeArray[1]){
        //           terminateStudent(studentID, "You have been kicked for failing the same course twice. Not once...but Twice.");
        //         }
        //       });
        //     });
        //   }        
        // // StudentIntervention();
        // for(let i = 0; i < Students.length; i++){
        //     if((Students[i].GPA > 2.0 && Students[i].GPA < 2.25) && (!Students[i].Intervened)){
        //       warnStudent(Students[i].useruiid, "The Registrar demands an interview from you to discuss your poor Academic progress.");
        //       updateDoc(doc(db,"Students",Students[i].useruiid), {Intervened: true});
        //     }
        // } 

        // // StudentHonorRoll();         //GraduationCheck for students.
        // for(let i = 0; i < Students.length; i++){
        //     let studentID = Students[i].useruiid;
        //     if(Students[i].SemesterGPA > 3.75 || Students[i].GPA > 3.5) 
        //         updateDoc(doc(db, "Students", studentID), {HonorRoll: true});
        //     else
        //       updateDoc(doc(db, "Students", studentID), {HonorRoll: false})
        
        //     if(Students[i].HonorRoll && Students[i].numWarn > 0){     //Update Warnings for every student (and Instructors too) to have TimeStamp field (Date + Time)
        //         let oldestWarning = query(collection(db,"Students",studentID, "Warnings"), orderBy("Timestamp"), limit(1));
        //         deleteDoc(doc(db,"Students", studentID, oldestWarning));
        //         updateDoc(doc(db,"Students", studentID), {numWarn: increment(-1)});
        //     } 
        // }
    }
    else{
        return;
    }
}

    async function StudentWarn2(a, message, students, waitlist,complains,Reviews){ //FIX THIS
        // issue a warning to the student
        for(let i = 0; i<students.length; i++){
          if(students[i].useruiid === a){
              let studentfirstname = students[i].firstname;
              let studentlastname = students[i].lastname;
              let studentuiid = students[i].useruiid;
              let studentdata = students[i];
              let warncount = students[i].numWarn + 1;
              if (warncount>=3){
                // cleare him from the waitlist 
                for(let w = 0; w < waitlist.length; w++){
                  if(waitlist[w] === a){
                    deleteDoc(doc(db, "Waitlist", a));
                  }
                } 
                // delete complain
                for(let c = 0; c < complains.length; c++){
                  if(complains[c].SentBy === studentfirstname + " " + studentlastname){
                    deleteDoc(doc(db, "Complaints", complains[c].Uid));
                  }
                } 
                // delete review
                for(let r = 0; r < Reviews.length; r++){
                  if(Reviews[r].SentBy === studentfirstname + " " + studentlastname){
                    deleteDoc(doc(db, "Reviews", Reviews[r].Uid));
                  }
                }
                // send out an email to the student since he has been suspended to the student's email
                // email template params
                var templateParams = {
                  name: studentfirstname + " " + studentlastname,
                  message: "You are recieving this message, becuase you have recieved 3 warnigs and you MUST pay $100 in fines to the registrar!",
                  from_name: " CCNYZero"
                  };
                // email js
                emailjs.send('gmail', 'template_g5n9s3v', templateParams, 'user_n9Gt3cMzwdE1CRjrKfdqY')
                .then((result) => {
                }, (error) => {
                }); 
                // add this student to the suspended collection with data
                await setDoc(doc(db, "SuspendedStudents", studentuiid), studentdata);
                alert("Student has reached 3 warnings and student has been suspended!");
                // delete the student from the student collection       
                await deleteDoc(doc(db, "Students", a));
              }
              const washingtonRef = doc(db, "Students",a);
              await updateDoc(washingtonRef, {
                  numWarn: warncount
              });
              //break;
              await addDoc(collection(db, "Students",a,"Warnings"), {
                Warn: message,
                numofWarn: warncount
              });
        }
        }
        // add the doc to the warnings
    }
    
      // IMPLEMENT LATER
      async function InstructorWarn2(a,message,instructors){    //FIX THIS
         // isue a warning to the instructor
        for(let i = 0; i<instructors.length; i++){
          if(instructors[i].useruiid === a){
            let warncount = instructors[i].numWarn + 1;
            alert(warncount);
              const washingtonRef = doc(db, "Instructor",a);
              // Set the "capital" field of the city 'DC'
              await updateDoc(washingtonRef, {
                  numWarn: warncount
              });
            //  break;
            // add the doc to the warnings
            await addDoc(collection(db, "Instructor",a,"Warnings"), {
            Warn: message,
            numofWarn: warncount
            });
            }
        }

      }






