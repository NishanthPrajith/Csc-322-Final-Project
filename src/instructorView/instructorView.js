import './instructorView.css'
import { useAuth } from "../contexts/Authcontext";
import { useState, useRef, useEffect } from 'react';
import { db } from "../firebase.js";
import { userData } from '../contexts/userProfile';
import { collection, doc, query, getDocs, onSnapshot } from 'firebase/firestore';
import { getDoc, setDoc,addDoc } from '@firebase/firestore';
import Tabs from '../components/Tabs';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import InstructorComplainPopup from './InstructorComplainPopup';
import InstructorComplainPopup1 from './InstructorComplainPopup1';


export default function InstructorView() {
    const [Instructor, setInstructor] = useState('');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [Warnings, setWarnings] = useState([]);
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
    const instructorRef = useRef();
    const courseRef = useRef();
    const options = [{label: "Schedule", value: "schedule"}, {label:"Record", value: "record"}, {label: "Drop", value: "drop"} , 
                    {label: "Enroll", value: "enroll"}, {label:"Grades", value: "grades"}, {label: "Complaints", value: "complaints"}, 
                    {label: "Warning", value: "warning"}];


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
 
 
    async function submitComplaint(){
        await addDoc(collection(db, "Complaints"), {
            SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
            IssuedName: document.getElementById("input-name").value,
            Complaint: document.getElementById("input-details").value 
          });
          alert("Complaint submitted, Thank you for your Feedback!");
          await history.push('Instructorview');  
    }

    async function getWarnings(db){
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
        getInstructorCourses(db)
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
        // a == student uiid 
        toggleComplainPopup1();
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
                {OptionSelected.value === "schedule" && <table className = "CourseStyler">
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                    <th> Instructor</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Section } </td>
                                    <td> {Class.Instructor } </td>
                                </tr>
                            ))}
                        </table>    
                        }  
                     
                        {(OptionSelected.value === "record") && <table className>
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
                        
                        {(OptionSelected.value === "enroll") && <table className>
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

                        {(OptionSelected.value === "complaints") && 
                        <div className="complaint"style={styles.container}>
                        <table className = "CourseStyler2">
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
                                    )}className="button">Complain</button></td>
                                </tr>
                            ))}
                        </table>         
                        </div>
                        }       
                        {(OptionSelected.value === "warning") && <table className>
                                <tr>
                                    <th>Warning</th>
                                    <th>Warning #</th>
                                </tr>
                            { Warnings.map((warn) => (
                                <tr>
                                    <td> { warn.Warn } </td>
                                    <td> { warn.Warnnum } </td>
                                </tr>
                            ))}
                        </table>    
                        }    
     
                </div>
            </Container>  

        <Container className = "MyInfo" maxWidth = "false">
            <div className ="MyInfo">
                    <div className='Card'>
                    <div className='upper-container'>
                            <div className='image-container'>
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
                <p>Complain on this student</p>
                <table className="xInstView">
                <tr>
                    <th>Student</th>
                </tr>
                {InstructorRoster.map((course) => (
                    <tr>
                        <td> {course.StudentName} </td>
                        <td><button onClick={() => Complain1(course.Student
                                    )}className="complain-popup-button">Complain</button></td>
                    </tr>
                ))}
            </table>
            </>}
            handleClose={toggleComplainclosePopup}
        />} 

        {isOpen1 && <InstructorComplainPopup1
            content={<>
                <p>Complain on this student</p>
                <table className="xInstView2">
                <tr>
                    <th>Student</th>
                </tr>
                {InstructorRoster.map((course) => (
                    <tr>
                        <td> {course.StudentName} </td>
                        <td><button onClick={() => Complain1(course.Student
                                    )}className="complain-popup-button">Complain</button></td>
                    </tr>
                ))}
            </table>
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
      margin: "20px 0",
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
