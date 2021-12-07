import './instructorView.css'
import { useAuth } from "../contexts/Authcontext";
import { useState, useRef, useEffect } from 'react';
import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, onSnapshot,deleteDoc, addDoc, setDoc, updateDoc} from 'firebase/firestore';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import InstructorComplainPopup from './InstructorComplainPopup';
import InstructorComplainPopup1 from './InstructorComplainPopup1';
import InstructorRosterPopup from './InstructorRosterPopup';

var studentComplainName;
var studentassigncourse;
var studentassigngrade;
export default function InstructorView() {
    const grades = ["A+","A+","A-","B+","B","B-","C+","C","C-","D+","D","F"]
    const gradeRef = useRef();
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [Warnings, setWarnings] = useState([]);
    const [waitlist, setWaitlist] = useState([]);
    const [InstructorCourses, setInstructorCourses] = useState([]);
    const [InstructorRoster, setInstructorRoster] = useState([]);
    const [Students, setStudents] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [Loading, setLoading] = useState('false');
    const [ScheduleSelected, setScheduleSelected] = useState('false');

    const history = useHistory();
    const complaint = useRef();
    const [InputValue, setInputValue] = useState('');
    const [OptionSelected, setOptionSelected] = useState("schedule");
    const [CanceledCourses, setCanceledCourses] = useState(false);
    const options = [{label: "Schedule", value: "schedule"}, {label:"Grades", value: "grades"}, 
                    {label: "Drop", value: "drop"} , {label: "Complaints", value: "complaints"}, {label: "Warning", value: "warning"},{label: "Waitlist", value: "waitlist"}];


    const handleInputChange = value => {
        setInputValue(value);
    }
                  
    const handleChange = value => {
        setOptionSelected(value);
    }
    
    const toggleComplainPopup = (a) => {
        setIsOpen(!isOpen);
    }
    async function toggleComplainclosePopup () {
        setIsOpen(!isOpen);
    }

    const toggleComplainPopup1 = (a) => {
        setIsOpen1(!isOpen1);
    }
    async function toggleComplainclosePopup1 () {
        setIsOpen1(!isOpen1);
    }

    const toggleRosterPopup = (a) => {
        studentassigncourse = a;
        setIsOpen2(!isOpen2);
    }
    async function toggleRosterclosePopup () {
        setIsOpen2(!isOpen2);
    }



    // get the students on the waitlist 
    // GET WAITLIST
    async function getWaitlist(db) {
        const waitlistCol = collection(db, 'Waitlist');
        setLoading(true);
        onSnapshot(waitlistCol, (querySnapshot) => {
        const waitlist = [];
        querySnapshot.forEach((doc) => {
            waitlist.push(doc.data());
        });
        setWaitlist(waitlist);
        });
        setLoading(false);
    }

    async function getWarnings1(db){
        const instWarnings = collection(db, 'Instructor', userData.getUd(),"Warnings");
        setLoading(true);
       onSnapshot(instWarnings, (querySnapshot) => {
          const warn = [];
          querySnapshot.forEach((doc) => {
              warn.push(doc.data());
          });
          setWarnings(warn);
        });
        setLoading(false);
    }

    // gets the student database
    async function getWarnings(db){
        const stuUidtoName = collection(db, 'Students');
        setLoading(true);
       onSnapshot(stuUidtoName, (querySnapshot) => {
          const uidtoName = [];
          querySnapshot.forEach((doc) => {
            uidtoName.push(doc.data());
          });
          setStudents(uidtoName);
        });
        setLoading(false);
    }


    // get instructor courses 
    async function getInstructorCourses(db) {
        const coursesCol = collection(db, 'Instructor', userData.getUd(), "Courses");
        setLoading(true);
       onSnapshot(coursesCol, (querySnapshot) => {
          const course = [];
          querySnapshot.forEach((doc) => {
              course.push(doc.data());
          });
          setInstructorCourses(course);
        });
        setLoading(false);
      }

    useEffect(() => {
        setLoading(true);
        getWarnings(db);
        getWarnings1(db);
        getInstructorCourses(db);
        getWaitlist(db);
      }, []);

      async function Complain(a){
        // get instructor roster 
       const instComplainStu = collection(db, 'Instructor', userData.getUd(), "Courses", a, "Roster");
        setLoading(true);
        onSnapshot(instComplainStu, (querySnapshot) => {
            const instComp = [];
            querySnapshot.forEach((doc) => {
                instComp.push(doc.data());
            });
            for(let i = 0; i<Students.length; i++){
                for(let j = 0; j<instComp.length; j++){
                    if(Students[i].useruiid === instComp[j].Student){;
                        instComp[j].StudentName = Students[i].firstname + " " + Students[i].lastname;
                    }
                }
            }
            setInstructorRoster(instComp);
        });
        setLoading(false);
        toggleComplainPopup();
     }

     async function Complain1(a){
         studentComplainName = a;
        // a == student uiid 
        toggleComplainPopup1();
     }
     async function submitComplaint(){
        await addDoc(collection(db, "Complaints"), {
            SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
            IssuedName: studentComplainName,
            Complaint: document.getElementById("input-details").value 
          });
          alert("Complaint submitted, Thank you for your Feedback!");
          await history.push('Instructorview');  
    }

    // get student in waitlist
    async function StudentEnrollWaitlist(a,b,c,d,e){
        // a == class 
        // b == DayTime 
        // c == Room 
        // d == Section 
        // e == studnetuiid
        let data={
            Class:a,
            DayTime:b,
            Instructor: userData.getFirstname() + " " + userData.getLastname(),
            Instructoruiid: userData.getUd(),
            Room: c,
            Secion: d
        }
        // enroll the student in the course
        await addDoc(collection(db, "Instructor", userData.getUd(),"Courses",a,"Roster"), {
            Student: e
          });
        // add the accepted student to their courses
        await setDoc(doc(db, "Students", e,"Courses",a), data);
        // delete the doc with instrcutor userdata
        await deleteDoc(doc(db, "Waitlist", userData.getUd()));
    }

    // Reject the student from the waitlist 
    async function RejectStudentEnrollWaitlist(c){
        await deleteDoc(doc(db, "Waitlist", c));
    }

    // Roster Function for Grades
    async function Roster(a){
        // get instructor roster 
       const instComplainStu = collection(db, 'Instructor', userData.getUd(), "Courses", a, "Roster");
        setLoading(true);
        onSnapshot(instComplainStu, (querySnapshot) => {
            const instComp = [];
            querySnapshot.forEach((doc) => {
                instComp.push(doc.data());
            });
            for(let i = 0; i<Students.length; i++){
                for(let j = 0; j<instComp.length; j++){
                    if(Students[i].useruiid === instComp[j].Student){;
                        instComp[j].StudentName = Students[i].firstname + " " + Students[i].lastname;
                    }
                }
            }
            setInstructorRoster(instComp);
        });
        setLoading(false);
        toggleRosterPopup(a);
     }
    // function for terminating the student
     async function Terminate_Student(a){
        const washingtonRef1 = doc(db, "Students", a);
        let studentdata; 
        // a == studentuiid
        const StuRecord = collection(db, "Students");
        setLoading(true);
        onSnapshot(StuRecord, (querySnapshot) => {
            const instComp = [];
            querySnapshot.forEach((doc) => {
                instComp.push(doc.data());
            });
            for(let i = 0; i<instComp.length; i++){
                if(instComp[i].useruiid === a){
                    studentdata = instComp[i];
                    break; 
                }
            }
        }); 
        await setDoc(doc(db, "SuspendedStudents", a), studentdata);
        const washingtonRef = doc(db, "SuspendedStudents", a);
        await updateDoc(washingtonRef, {
            message: "You have failed two same courses, therefore you have been terminated!"
        });
        return
    }

    // function for instructor to enter grades
    async function Instructor_Grade(a){
        // a == instructoruiid
        const washingtonRef1 = doc(db, "Students", a);
        const washingtonRef2 = doc(db, "Instructor", userData.getUd(),"Courses",studentassigncourse);
        let t_total;
        let numberinstructorclassgpa;
        // check to see if the grade enter is valid
        if(!grades.includes(gradeRef.current.value.toUpperCase())){
            alert("Invaid Student Grade");
            return
        } 
        // extract the teachers class GPA
        for(let i = 0; i<InstructorCourses.length; i++){
            if(InstructorCourses[i].Class === studentassigncourse){
                const instructorclassgpa = InstructorCourses[i].ClassGPA;
                numberinstructorclassgpa = InstructorCourses[i].StudentsGraded;
                t_total = (instructorclassgpa) * (numberinstructorclassgpa);
            }
        }
        // query to get the students GPA
        let studentGPA;
        const StuGPA = collection(db, "Students");
        setLoading(true);
        onSnapshot(StuGPA, (querySnapshot) => {
            const instComp = [];
            querySnapshot.forEach((doc) => {
                instComp.push(doc.data());
            });
            for(let i = 0; i<instComp.length; i++){
                if(instComp[i].useruiid === a){
                    studentGPA = instComp[i].GPA;
                    break; 
                }
            }
        });
        // check if the student is getting their second "F"
        const StuRecord = collection(db, "Students",a, "Record");
        setLoading(true);
        onSnapshot(StuRecord, (querySnapshot) => {
            const instComp = [];
            querySnapshot.forEach((doc) => {
                instComp.push(doc.data());
            });
            for(let i = 0; i<instComp.length; i++){
                if(instComp[i].Class === studentassigncourse){
                    if(instComp[i].Grade === "F"){
                        if(gradeRef.current.value === "F"){
                            // terminate the student
                            Terminate_Student(a)
                        }
                    }
                    else{
                        break;
                    }
                }
            }
        });
        // setting the grade for the particular student
        await setDoc(doc(db, "Students", a,"Record",studentassigncourse), {
            Class: studentassigncourse,
            Grade: gradeRef.current.value.toUpperCase(),
            Instructor: userData.getFirstname() + " " + userData.getLastname()
        });
        // adjust the gpa after assigning the grade 
        switch (gradeRef.current.value.toUpperCase()) {
            case 'A':
            case 'A+':
                let avg = ((parseFloat(studentGPA) + 4.0) /2).toFixed(2).toString();
                let new_total = (t_total) + (4.0);
                var new_updated_total = (new_total)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'A-':
                let avg1 = ((parseFloat(studentGPA) + 3.7) /2).toFixed(2).toString();
                let new_total1 = (t_total) + (3.7);
                var new_updated_total1 = (new_total1)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg1
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total1,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total1,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });                  
                break;
            case 'B+':
                let avg2 = ((parseFloat(studentGPA) + 3.3) /2).toFixed(2).toString();
                let new_total2 = (t_total) + (3.3);
                var new_updated_total2 = (new_total2)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg2
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total2,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total2,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'B':
                let avg3 = ((parseFloat(studentGPA) + 3.0) /2).toFixed(2).toString();
                let new_total3 = (t_total) + (3.0);
                var new_updated_total3 = (new_total3)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg3
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total3,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total3,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'B-':
                let avg4 = ((parseFloat(studentGPA) + 2.7) /2).toFixed(2).toString();
                let new_total4 = (t_total) + (2.7);
                var new_updated_total4 = (new_total4)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg4
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total4,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total4,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'C+':
                let avg5 = ((parseFloat(studentGPA) + 2.3) /2).toFixed(2).toString();
                let new_total5 = (t_total) + (2.3);
                var new_updated_total5 = (new_total5)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg5
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total5,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total5,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'C':
                let avg6 = ((parseFloat(studentGPA) + 2.0) /2).toFixed(2).toString();
                let new_total6 = (t_total) + (2.0);
                var new_updated_total6 = (new_total6)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg6
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total6,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total6,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'C-':
                let avg7 = ((parseFloat(studentGPA) + 1.7) /2).toFixed(2).toString();
                let new_total7 = (t_total) + (1.7);
                var new_updated_total7 = (new_total7)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg7
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total7,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total7,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'D+':
                let avg8 = ((parseFloat(studentGPA) + 1.3) /2).toFixed(2).toString();
                let new_total8 = (t_total) + (1.3);
                var new_updated_total8 = (new_total8)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg8
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total8,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total8,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            case 'D':
                let avg9 = ((parseFloat(studentGPA) + 1.0) /2).toFixed(2).toString();
                let new_total9 = (t_total) + (1.0);
                var new_updated_total9 = (new_total9)/((numberinstructorclassgpa) + 1);
                ++numberinstructorclassgpa;
                await updateDoc(washingtonRef1, {
                GPA: avg9
                });
                await updateDoc(washingtonRef2, {
                ClassGPA: new_updated_total9,
                StudentsGraded: numberinstructorclassgpa
                });
                await setDoc(doc(db, "GradedClasses", studentassigncourse), {
                Class: studentassigncourse,
                ClassGPA: new_updated_total9,
                Instructor: userData.getFirstname() + " " + userData.getLastname(),
                InstructorUIID: userData.getUd()
                });
                break;
            default:
          }
        // since the student got the grade and the GPA was updated sucesfully, now we can delte the current course from his schedule
        await deleteDoc(doc(db, "Students",a,"Courses",studentassigncourse));
        alert("Sucessfully graded studnet!");
        // now we also need to update the class GPA average

        toggleRosterclosePopup()
    }

      return (
        <div className = "InstructorPage">
        <Container className = "Dropdown" maxWidth = "false">
                <div> 
                    <div className='Card2'>
                        <div className = "upper-container2">  
                            <div className='image-container'>
                                <img src= "https://www.logolynx.com/images/logolynx/ab/ab3cf43cb423c7d9c20eadde6a051a5d.jpeg" alt='' height="100px" width="100px"/>
                            </div>    
                        </div>
                        <div className="lower-container2">
                            <h2>Selection Menu</h2>
            
                            <Select className ="Selection" options = { options } value ={OptionSelected} onInputChange = {handleInputChange} onChange = {handleChange}>
                            </Select>
                        </div>
                    </div>
                </div>    
        </Container>  

        <Container className= "Display" maxWidth = "false" >
        <div className= "Display-2" style={{ backgroundColor: "white", height: '80vh' , width: '150vh'}}>
                {OptionSelected.value === "schedule" && <table className = "instructor-schedule-table">
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                </tr>
                            { InstructorCourses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                </tr>
                            ))}
                        </table>    
                        }  
                        {/* cannot assign grades becuase its not the right period  */}
                        {(userData.getPeriod()===3 && OptionSelected.value === "grades") && <table className = "instructor-grades-table">
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Section</th>
                                    <th>Room</th>
                                </tr>
                            { InstructorCourses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Secion } </td>
                                    <td> { Class.Room } </td>
                                    <td><button onClick={() => Roster(Class.Class
                                    )}className="roster-instructor-button">Roster</button></td>
                                </tr>
                            ))}
                        </table>    
                        }
                        {(userData.getPeriod()!==3 &&OptionSelected.value === "grades") && 
                        <div >
                                <h1>You cannot grade during this period.</h1>
                                <h2>Please try again next period!</h2>
                        </div>  
                        }
                        
                        {(OptionSelected.value === "drop") && <table className = "instructor-drop-table">
                                 <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                </tr>
                            { InstructorCourses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td><button className= "drop-instructor-button">Drop</button></td>
                                </tr>
                            ))}
                        </table>    
                        }
                        
                        {(OptionSelected.value === "complaints") && 
                        <div className="instructor-complaint-page"style={styles.container}>
                        <table className = "CourseStyler-complaint-instructor">
                            <tr>
                                    <th>Course</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                </tr>
                            {InstructorCourses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td><button onClick={() => Complain(Class.Class
                                    )}className="complaint-instructor-button">Complain</button></td>
                                </tr>
                            ))}
                        </table>         
                        </div>
                        } 

                        {(OptionSelected.value === "warning") && <div className="instructor-warning-page">
                            <h1>Total Warnings:</h1>
                            <p>Reminder: Getting 3 warnings will result in a suspension!</p>
                                <table className ="CourseStyler-warning-instructor">
                                    <tr>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                    </tr>
                                    { Warnings.map((warn) => (
                                    <tr>
                                        <td> {warn.numofWarn} </td>
                                        <td> {warn.Warn} </td>
                                    </tr>
                                    ))}
                                </table>  
                        </div>  
                        }

                        {(OptionSelected.value === "waitlist") && 
                        <div className="instructor-complaint-page"style={styles.container}>
                        <table className = "CourseStyler-complaint-instructor">
                            <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                </tr>
                            {waitlist.map((Class) => (
                                <tr>
                                    <td> { Class.StudentName } </td>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td><button onClick={() => StudentEnrollWaitlist(Class.Class,
                                                                                     Class.DayTime,
                                                                                     Class.Room,
                                                                                     Class.Secion,
                                                                                     Class.Student
                                    )}className="complaint-instructor-button">Enroll</button></td>
                                    <td><button onClick={() => RejectStudentEnrollWaitlist(Class.Instructoruiid
                                    )}className="complaint-instructor-button">X</button></td>
                                </tr>
                            ))}
                        </table>         
                        </div>
                        }     
     
                </div>
            </Container>  

        <Container className = "MyInfo" maxWidth = "false">
            <div className ="MyInfo">
                    <div className='Card'>
                    <div className='upper-container'>
                            <div className='image-container2'>
                                <img src= "https://i.pravatar.cc/150?img=17" alt='' height="100px" width="100px"/>
                            </div>
                    </div>
                    <div className="lower-container">
                            <h3>Instructor Information</h3>
                            <p>First Name: {userData.getFirstname()}</p>
                            <p>Last Name: {userData.getLastname()}</p>
                            <p>Date of Birth: {userData.getDob()}</p>
                            <p>Email: {userData.getEmail()}</p>
                    </div>
                </div>
            </div> 
        </Container>         


        {isOpen && <InstructorComplainPopup
            content={<>
                <h2 className="complaint-h2">Complain on this student</h2>
                <table className="complain-popup-table-instructor">
                
                <tr>
                    <th>Student</th>
                    <th></th>
                </tr>
                {InstructorRoster.map((course) => (
                    <tr>
                        <td> {course.StudentName} </td>
                        <td><button onClick={() => Complain1(course.StudentName
                                    )}className="complain-popup-button">Complain</button></td>
                    </tr>
                ))}
            </table>
            </>}
            handleClose={toggleComplainclosePopup}
        />} 

        {isOpen1 && <InstructorComplainPopup1
            content={<>
                <div className="complaint"style={styles.container}>
                        <h2> Complaint </h2>
                            <textarea className="input-details"id="input-details"ref={complaint} placeholder="Describe your issue." style={styles.textarea} />
                            <button onClick ={submitComplaint} className="submit-complaint-popup-button"> Submit </button>  
                        </div>
            </>}
            handleClose={toggleComplainclosePopup1}
        />} 

        {isOpen2 && <InstructorRosterPopup
            content={<>
                <h2 className="roster-h2">Assign a grade</h2>
                <table className="roster-popup-table-instructor">
                
                <tr>
                    <th>Student</th>
                    <th>Grade</th>
                </tr>
                {InstructorRoster.map((course) => (
                    <tr>
                        <td> {course.StudentName} </td>
                        <td> <input type="text" ref={gradeRef} id="studentgrade" name="fname" /></td>
                        <td><button className="assign-grades-popup-button" onClick = {() => Instructor_Grade(course.Student,
                                                                                                            )}>Assign</button></td>
                    </tr>
                ))}
            </table>
            </>}
            handleClose={toggleRosterclosePopup}
        />} 
    </div>
    );
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "5px 0",
      minHeight: 100,
      width: 300
    },
    textarea2: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "10px 0",
        minHeight: 40,
        width: 100
    },
  
  };
