import './instructorView.css'
import { useAuth } from "../contexts/Authcontext";
import { useState, useRef, useEffect } from 'react';
import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, query, getDocs, onSnapshot,deleteDoc } from 'firebase/firestore';
import { getDoc, setDoc,addDoc } from '@firebase/firestore';
import Tabs from '../components/Tabs';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import InstructorComplainPopup from './InstructorComplainPopup';
import InstructorComplainPopup1 from './InstructorComplainPopup1';

var studentComplainName;
export default function InstructorView() {
    const [Instructor, setInstructor] = useState('');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [Warnings, setWarnings] = useState([]);
    const [waitlist, setWaitlist] = useState([]);
    const [InstructorCourses, setInstructorCourses] = useState([]);
    const [InstructorRoster, setInstructorRoster] = useState([]);
    const [Students, setStudents] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [Loading, setLoading] = useState('false');
    const [ScheduleSelected, setScheduleSelected] = useState('false');
    console.log(userData.getUd()); 

    const history = useHistory();
    const instname = useRef();
    const classname = useRef(); 
    const complaint = useRef();
    const [InputValue, setInputValue] = useState('');
    const [OptionSelected, setOptionSelected] = useState("schedule");
    const [CanceledCourses, setCanceledCourses] = useState(false);
    const instructorRef = useRef();
    const courseRef = useRef();
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
          console.log(warn);
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


    // get instrcutor courses 
    async function getInstructorCourses(db) {
        const coursesCol = collection(db, 'Instructor', userData.getUd(), "Courses");
        setLoading(true);
       onSnapshot(coursesCol, (querySnapshot) => {
          const course = [];
          querySnapshot.forEach((doc) => {
              course.push(doc.data());
          });
          console.log(course);
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
        console.log(a);
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
    async function StudentEnrollWaitlist(a,b,c){
        // a == studentuiid
        // b == course
        // c == Instructoruiid
        // enroll the student in the course
        await addDoc(collection(db, "Instructor", c,"Courses",b,"Roster"), {
            Student: a
          });
        // delete the doc with c
        await deleteDoc(doc(db, "Waitlist", c));
    }

    // Reject the student from the waitlist 
    async function RejectStudentEnrollWaitlist(c){
        await deleteDoc(doc(db, "Waitlist", c));
    }

      return (
        <div className = "InstructorPage">
        <h1 className= "noselect" style = {{color: "White"}}>Welcome!</h1>
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
        <div className= "Display" style={{ backgroundColor: "white", height: '80vh' , width: '150vh'}}>
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
                     
                        {(OptionSelected.value === "grades") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                </tr>
                            ))}
                        </table>    
                        }
                        
                        {(OptionSelected.value === "drop") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
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
                                    <td><button onClick={() => StudentEnrollWaitlist(Class.Student,
                                                                                     Class.Class,
                                                                                     Class.Instructoruiid
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
