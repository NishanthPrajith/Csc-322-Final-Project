import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, addDoc,getDoc, query, where } from 'firebase/firestore';
import { db } from "../firebase.js";

export default async function PeriodChanger(Students, Instructors, waitlist,complains,Reviews,complainings) {

    let docRef = await getDoc(doc(db,"gradingperiod","0t678Obx9SKShD3NR3I4"));
    let docData = docRef.data().classsetup;
    if(docData === "0"){
        alert("Class Set-Up Period");
        for(let i = 0; i < Students.length; i++){
          let studentID = Students[i].useruiid;
          Students[i].canceledCourses = false;
          updateDoc(doc(db, "Students", studentID), {canceledCourses: false}); //lessThan2CoursesWarning: false
        }
        for(let i = 0; i < Instructors.length; i++){
          let instructorID = Instructors[i].useruiid;
          Instructors[i].canceledCourses = false;
          updateDoc(doc(db, "Instructor", instructorID), {canceledCourses: false});
        }        
    }
    else if(docData === "1"){
      alert("Class Registration Period");
    }
    else if(docData === "2"){ //This is Req 4
       alert("Class Running Period");
        for(let i = 0; i < Students.length; i++){
          let studentID = Students[i].useruiid;
          if(Students[i].numCourses < 2 && !(Students[i].lessThan2CoursesWarning)){
            StudentWarn2(studentID,"You have received a warning for enrolling in less than 2 classes", Students, waitlist, complains, Reviews);
            Students[i].lessThan2CoursesWarning = true;
          }
          updateDoc(doc(db, "Students", studentID), { lessThan2CoursesWarning: Students[i].lessThan2CoursesWarning});     // lessThan2CoursesWarning: false, // ,  canceledCourses: false
        }
        
        //CancelCourses();           
        const coursesCol = query(collection(db,'AssignedClasses'), where("StudentsEnrolled" , "<", 1)); 
        onSnapshot(coursesCol, async function(courseSnapshot) {   //canceledCourses = True for instructors and warn each one affected.
          courseSnapshot.forEach(async function(classes){
            if(classes.exists){
              let instructorID = classes.data().Instructoruiid;  //InstructorUiid and courseName is assigned for each instance of a class of StudentsEnrolled < 5
              let courseName = classes.data().Class;
              let instructorDocRef = doc(db,"Instructor", instructorID);
              let instructorCourseDocRef = doc(db,"Instructor", instructorID,"Courses", courseName);
              const instructorDocSnap = await getDoc(instructorCourseDocRef);
              for(let i = 0; i<Instructors.length; i++){  //Change was made.
                if((Instructors[i].useruiid === instructorID) && instructorDocSnap.exists()){
                  Instructors[i].canceledCourses = true;
                  let temp = Instructors[i].numCourses
                  Instructors[i].numCourses = temp - 1;
                  var test = false;
                  if (Instructors[i].numCourses === 0) {
                    test = true;
                  }
                  let warncount = Instructors[i].numWarn + 1;
                  Instructors[i].numWarn = warncount;; 
                  
                  //Checks all students to see if the cancelled course is in their Courses
                  for(let i = 0; i< Students.length; i++){         
                    let allCoursesStudent = collection(db,"Students",Students[i].useruiid, "Courses");
                    onSnapshot(allCoursesStudent, async function(studentSnapshot) {
                      studentSnapshot.forEach(async function(studentCourse){
                        setTimeout(async function() { 
                          let studentDocRef = doc(db,"Students", Students[i].useruiid);
                          let studentCourseDocRef = doc(db,"Students", Students[i].useruiid,"Courses", studentCourse.data().Class);
                          let studentDocSnap = await getDoc(studentCourseDocRef) 
                          if(studentDocSnap.exists()){
                            if(studentCourse.data().Class === courseName){  
                              let tempStd = Students[i].numCourses;
                              Students[i].numCourses = tempStd - 1;
                              await updateDoc(studentDocRef, {canceledCourses: true, numCourses: Students[i].numCourses}); //Or setDoc with ,{merge: true} // , numCourses: increment(-1)
                              await deleteDoc(studentCourseDocRef);
                            }
                          }
                        }, 300);
                      });
                    });
                  }
                  // update the doc for the instructor, deletes the course, and add the doc to the warnings                  
                   await updateDoc(instructorDocRef, {canceledCourses: true, Suspended: test, numCourses: Instructors[i].numCourses, numWarn: warncount});     
                   await deleteDoc(instructorCourseDocRef);                
                   await addDoc(collection(db, "Instructor",instructorID,"Warnings"), {Warn: "One of your courses has been canceled:" + courseName, numofWarn: warncount});                 
                }
              }
              await deleteDoc(doc(db,"AssignedClasses", courseName)); //Delete the Assigned Course overall.
            }
          });  
        });    
    }

    else if(docData === "3"){
        alert("Grading Period");
    }

    else if(docData === "4") {
        alert("Semester End");
        for(let p = 0; p < complainings.length; p++){
          var varpush = complainings[p];
          varpush.numCourses = 0;
          varpush.Suspended = false;
          varpush.numWarn = 0;
          varpush.canceledCourses =  false;
          await updateDoc(doc(db, "Suspended", varpush.useruiid), varpush);
          await setDoc(doc(db, "Instructor", varpush.useruiid), varpush);
          await deleteDoc(doc(db, "Suspended", varpush.useruiid));
        }

        for(let k = 0; k < Instructors.length; k++){
          if(Instructors[k].Suspended === true){
            await setDoc(doc(db, "Suspended", Instructors[k].useruiid), Instructors[k]);
            await deleteDoc(doc(db,"Instructor", Instructors[k].useruiid));
          }
        }
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
                // add this student to the suspended collection with data
                await setDoc(doc(db, "SuspendedStudents", studentuiid), studentdata);
                const washingtonRef = doc(db, "SuspendedStudents", studentuiid);
                await updateDoc(washingtonRef, {
                  message:  studentfirstname + " " + studentlastname + ", You are receiving this message because you have received 3 warnings and MUST pay $100 in fines to the Registrar!"
                });
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
    }
    






