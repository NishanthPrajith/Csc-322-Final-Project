import './registrarsApplications.css';
import { db } from "../firebase.js";
import { collection, doc, deleteDoc, onSnapshot, setDoc,updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import React from 'react';
import { useRef } from 'react';
import CourseAssignPopup from './courseAssignPopup';
import ClassSetUpPeriodPopup from './classSetUpPeriodPopup';
import PeriodChanger from './PeriodChanger';

var ud;
var firtname;
var lastname;
var classes;
export default function RegistrarsApplications() {
    const [User, setUser] = useState([]);
    const [courses, setCourses] = useState([]);
    const [Students, setStudents] = useState([]);
    const [complainings, setComplainings] = useState([]);
    const [courseQ, setQuota] = useState([]);
    const [Instructors, setInstructors] = useState([]);
    const [period, setPeriod] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [loading, setLoading] = useState(false);
    const periodNum = useRef();
    const [waitlist, setWaitlist] = useState([]);
    const [complains, setComplains] = useState([]);
    const [Reviews, setReviews] = useState([]);
    const [AssignedClasses, setAssignedClasses] = useState([]);

    const togglecourseAssignPopup = (a) => {
        setIsOpen(!isOpen);
        ud = a;
    }
    async function togglecourseAssignclosePopup () {
        setIsOpen(!isOpen);
        await deleteDoc(doc(db, "Users", ud));
    }

    const toggleclassSetUpPeriodPopup = () => {
        setIsOpen2(!isOpen2);
    }
    function toggleclassSetUpPeriodclosePopup () {
        setIsOpen2(!isOpen2);
        alert("Class Set-Up Period changed successfully!");
    }
 
    async function getUser(db) {
        const studentsCol = collection(db, 'Users');
        setLoading(true);
        onSnapshot(studentsCol, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                user.push(doc.data());
            });
            setUser(user);
        });
        setLoading(false);
    }

    async function getPeriod(db) {
        const gp = collection(db, 'gradingperiod');
        setLoading(true);
        onSnapshot(gp, (querySnapshot) => {
            const p = [];
            querySnapshot.forEach((doc) => {
                p.push(doc.data());
            });
            setPeriod(p);
        });
        setLoading(false);
    }

    async function getCourses(db) {
        const courses = collection(db, 'classes');
        setLoading(true);
        onSnapshot(courses, (querySnapshot) => {
            const course = [];
            querySnapshot.forEach((doc) => {
                var f = doc.data();
                f['check'] = true;
                course.push(f);
            });
            setCourses(course);
        });
        setLoading(false);
    }

    async function getAssigned(db) {
        const assigned = collection(db, "AssignedClasses");
        setLoading(true);
        onSnapshot(assigned, (querySnapshot) => {
            const assignedClasses = [];
            querySnapshot.forEach((doc) => {
                assignedClasses.push(doc.data());
            });
            setAssignedClasses(assignedClasses);
        });
        setLoading(false);
    }   

    async function getQuota(db) {
        const max = collection(db, 'Quota');
        setLoading(true);
        onSnapshot(max, (querySnapshot) => {
            const courseQ = [];
            querySnapshot.forEach((doc) => {
                courseQ.push(doc.data());
            });
            setQuota(courseQ);
        });
        setLoading(false);
    }

    async function getInstructors(db) {
        const instructors = collection(db, "Instructor");
        setLoading(true);
        onSnapshot(instructors, (querySnapshot) => {
            const instructor = [];
            querySnapshot.forEach((doc) => {
                instructor.push(doc.data());
            });
            setInstructors(instructor);
        });
        setLoading(false);
    } 
    
    async function getStudents(db) {
        const students = collection(db, "Students");
        setLoading(true);
        onSnapshot(students, (querySnapshot) => {
            const student = [];
            querySnapshot.forEach((doc) => {
                student.push(doc.data());
            });
            setStudents(student);
        });
        setLoading(false);
    }

    async function getSuspended(db) {
        const complainsCol = collection(db, 'Suspended');
        setLoading(true);
        onSnapshot(complainsCol, (querySnapshot) => {
          const complainings = [];
          querySnapshot.forEach((doc) => {
            complainings.push(doc.data());
          });
          setComplainings(complainings);
        });
        setLoading(false);
      }

    async function getWaitlist(db) {
        const waitlistCol = collection(db, 'Waitlist');
        setLoading(true);
        onSnapshot(waitlistCol, (querySnapshot) => {
          const waitlist = [];
          querySnapshot.forEach((doc) => {
            waitlist.push(doc.id);
          });
          setWaitlist(waitlist);
        });
        setLoading(false);
      }
      // COMPLAIN AND REVIEW
      async function getComplaint(db) {
        const complainsCol = collection(db, 'Complaints');
        const complainsColid = collection(db, 'Complaints');
        setLoading(true);
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
        setLoading(false);
      }
      
      async function getReviews(db) {
        const reviewsCol = collection(db, 'Reviews');
        const reviewsColid = collection(db, 'Reviews');
        setLoading(true);
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
        setLoading(false);
      }        

    useEffect(() => {
        setLoading(true);
        getQuota(db);
        getPeriod(db);
        getCourses(db);
        getUser(db);
        getInstructors(db);
        getStudents(db);
        getSuspended(db);
        getReviews(db);
        getComplaint(db);
        getWaitlist(db);
        getAssigned(db);
    }, []);

    if (loading) {
        return <h1> Loading .. </h1>
    }

    async function Accept(a, b, c, d, e, f, g ,useruiid, h){
        if(f === "0"){
            const docRef = doc(db, "Quota", "rnBTGZKiLSm6dBEseZcF");
            var q ; 
            for(let i =0; i < courseQ.length; i++){
                q = courseQ[i].Quota;
                break;
            }
            ++ q; 
            if(q < 11){
            const payload = {firstname: a, lastname: b, GPA: c, DateofBirth: d, Email: e, Role: "Student", password: g, useruiid:useruiid, empl: h, numWarn: 0, numCourses:0, semesterGPA:"0.0",canceledCourses:false,lessThan2CoursesWarning:false,Graduate:false, numCoursesPassed:0,firsttimelogin:true}
            await setDoc(doc(db, "Students", useruiid), payload);
            await deleteDoc(doc(db, "Users",useruiid ));
            await updateDoc(docRef, {
                Quota: q,
            });
            }else{
                alert("Quota has already been met, student should be rejected!");
            }

        }else{
            var v = courses;
            for (var i = 0; i < courses.length; i++) {
                v[i]['check'] = true;
            }
            setCourses(courses);
            const payload = {firstname: a, lastname: b, DateofBirth: d, Email: e,Role: "Instructor", password: g, useruiid:useruiid, Review: 1, numReview: 1, numWarn: 0,numCourses:0,canceledCourses:false,Suspended:false, gradingTime: false}
            firtname = a;
            lastname = b;  
            togglecourseAssignPopup(useruiid);
            await setDoc(doc(db, "Instructor", useruiid), payload);
        }
    }

    async function Assign(a,b,c,d,f){
        for(let i = 0; i < AssignedClasses.length; i++){
            if(AssignedClasses[i].Class === a){
                alert("Course has been assigned already!");
                return;
            }
        }
        classes=a;
        try{
        await setDoc(doc(db, "Instructor", ud, "Courses", a), {
            DayTime: b,
            Room: c,
            Secion: d,
            Size: f,
            Instructor: firtname + " " + lastname,
            Class: classes,
            ClassGPA: 0,
            StudentsGraded: 0
          });
          await setDoc(doc(db, "AssignedClasses", a), {
            Class: classes,
            DayTime: b,
            Room: c,
            Secion: d,
            Size: f,
            Instructor: firtname + " " + lastname,
            Instructoruiid: ud,
            StudentsEnrolled:0,
            StudentsGraded:0
          });
        }catch{
            alert("Error");
        }
        
        var v = courses;
        for (let i = 0; i < courses.length; i++) {
           if (v[i]['Class'] === classes) {
               v[i]['check'] = false;
               break;
           }
        }
        setCourses(v);
        
        const docRef = doc(db, "Instructor", ud);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }

        const instRef = doc(db, "Instructor", ud);

        await updateDoc(instRef, {
            numCourses: docSnap.data()['numCourses'] + 1,
        });

        setLoading(false);

    }

    async function sendEmail(a,b,c,d,e){
        // e == role
        // d == uiid
        var templateParams = {
            message: a + " "+ b + "Sorry to inform you, however, due to your gpa we can not accept you into this program and you have been rejected.",
            };
        var templateParams1 = {
            message: a + " "+ b + "Sorry to inform you, however, our program has already been filled.",
            };
        var templateParams2 = {
            message: "Dear " + a + " "+ b + ", After careful review of your application, our team has decided to pursue other candidates whom we feel more closely align with our needs at this time. We hope your interest in CCNYZero will continue and encourage you to apply to future positions with us.",
            };
        var templateParams3 = {
            message: "Dear " + a + " "+ b + ", Thank you for applying to our graduate program, however, we have decided to not accept you as a student, please try again at a later date!",
            };
            //const docRef = doc(db, "Quota", "rnBTGZKiLSm6dBEseZcF");
            var q ; 
        for(let i =0; i < courseQ.length; i++){
            q = courseQ[i].Quota;
            break;
        }    
        if(parseFloat(c) < 2){
            await setDoc(doc(db, "Rejected",d), templateParams);
            await deleteDoc(doc(db, "Users",d));
        }
        else if (e ==="1"){
            await setDoc(doc(db, "Rejected", d), templateParams2);
            await deleteDoc(doc(db, "Users",d));
        }
        else if (q < 11 && parseFloat(c) > 3){
            await setDoc(doc(db, "Rejected", d), templateParams3);
            await deleteDoc(doc(db, "Users",d));
        }
        else{
            await setDoc(doc(db, "Rejected", d), templateParams1);
            await deleteDoc(doc(db, "Users",d));
        }
    }

    async function changePeriod(event) {
        event.preventDefault();
        var period = {  classsetup: periodNum.current.value }
        try{
            await setDoc(doc(db, "gradingperiod", "0t678Obx9SKShD3NR3I4"), period);
            alert("Class Period Updated Sucessfully");
            PeriodChanger(Students,Instructors,waitlist,complains,Reviews,complainings);
          }catch{
            document.getElementById('error').style.display = "block";
        }
    }

    async function changePeriodcset(){
        toggleclassSetUpPeriodPopup();
    }

    return (

        <div className = "applicationHeading">
            <h1>Pending applications
            <button className="change-period-class-button" onClick={changePeriodcset}>Change Period</button>
            </h1>
            
            {isOpen2 && <ClassSetUpPeriodPopup
            content={<>
                <table className="period-table-registrar">
                <tr>
                    <th>Current Period</th>
                    <th>Change Period</th>
                    
                </tr>
                {period.map((p) => (
                    <tr>
                        <td> {p.classsetup} </td>
                        <td><input type="number" ref={periodNum} className="five" placeholder="0"autoComplete="off" required max="4" /></td>               
                        <td> <button className="class-button-actually" onClick={changePeriod}>Change Period</button></td>
                        
                    </tr>
                    
                ))}
                    
            </table>
            
            </>}
            handleClose={toggleclassSetUpPeriodclosePopup}
             />}
            <p>Key: Role 1: Instructor, Role 0: Student</p>
            <table className="xApplication">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>GPA</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {User.map((user) => (
                    <tr>
                        <td> {user.firstname} </td>
                        <td> {user.lastname} </td>
                        <td> {user.gpa} </td>
                        <td> {user.dob} </td>
                        <td> {user.email} </td>
                        <td> {user.role} </td>  
                        <td>                       
                        <button onClick={() => Accept(user.firstname, 
                                                      user.lastname, 
                                                      user.gpa, 
                                                      user.dob, 
                                                      user.email, 
                                                      user.role, 
                                                      user.password, 
                                                      user.useruiid,
                                                      user.empl
                                                      )}>Accept</button>
                        <button onClick={() => sendEmail(user.firstname,
                                                         user.lastname,
                                                         user.gpa,
                                                         user.useruiid,
                                                         user.role
                                                         )}>Reject</button>  </td>
                    </tr>
                ))}
            </table>
            {isOpen && <CourseAssignPopup
            content={<>
                <p>Assign course(s) to this instructor</p>
                <table className="xCourses">
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
                        {course.check && <td><button onClick={() => Assign(course.Class, 
                                                      course.DayTime, 
                                                      course.Room, 
                                                      course.Section, 
                                                      course.Size
                                                      )}>Assign Course</button></td> }
                    </tr>
                ))}
            </table>
            </>}
            handleClose={togglecourseAssignclosePopup}
             />}
        </div>
    );
}