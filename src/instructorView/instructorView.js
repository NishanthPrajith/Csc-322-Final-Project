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


export default function InstructorView() {
    const [Instructor, setInstructor] = useState('');
    const [CurrentClasses, setCurrentClasses] = useState([]);
    const [CurrentRoster, setCurrentRoster] = useState([]);
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
    const options = [{label: "Schedule", value: "schedule"}, {label:"Record", value: "record"}, {label: "Drop", value: "drop"} , 
                    {label: "Enroll", value: "enroll"}, {label:"Grades", value: "grades"}, {label: "Complaints", value: "complaints"}, 
                    {label: "Warning", value: "warning"}];


    const handleInputChange = value => {
        setInputValue(value);
    }
                  
    const handleChange = value => {
        setOptionSelected(value);
    }
    // get the instructors courses
    /*async function getInstructorCourses(db) {
        const coursesCol = collection(db, 'Instructor', userData.getUd(),"Courses");
        setLoading(true);
       onSnapshot(coursesCol, (querySnapshot) => {
          const instructor = [];
          querySnapshot.forEach((doc) => {
              instructor.push(doc.data());
          });
          console.log(instructor);
          setCurrentClasses(instructor);
        });
        setLoading(false);
    }*/

    async function submitComplaint(){
        await addDoc(collection(db, "Complaints"), {
            SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
            IssuedName: document.getElementById("input-name").value,
            Complaint: document.getElementById("input-details").value 
          });
          alert("Complaint submitted, Thank you for your Feedback!");
          await history.push('Instructorview');  
    }

    // //setInstructor(userData.getName());

    // // async function GetInfo(db){
    // //     const { login, currentUser } = useAuth();
    // //     const {emailRef, passwordRef} = useRef();
    // //     try{
    // //         const useruiid = await login(emailRef.current.value, passwordRef.current.value);
    // //         const docRef = doc(db, "Instructor", useruiid);
    // //         const docSnap = await getDoc(docRef);
    // //         if(docSnap.exists())
    // //             setInstructor(docSnap.data().firstname + ' ' + docSnap.data().lastname);  
    // //     }
    // //     catch (error) {
    // //         document.getElementById('error').style.display = "block";
    // //     }        
    // // }

    //  async function getCourses(db) {
    // //     const docRef = doc(db, "Instructor", "{Instructor.name}", "Courses", "CurrentCourses")
    // //     const docSnap = await getDoc(docRef);

    // //     if(docSnap.exists()){
    // //         console.log("Document data:", docSnap.data());
    // //     }
    // //     else {
    // //         console.log("No such document!");
    // //         return -1;
    // //     }

    // //     //const instructor = [];
    // //     const currentCourses = [];
    // //     //const instructorsCol = collection(db, 'Instructor');
    // //     //setLoading(true);

    // //     const getDataCourses = onSnapshot(docSnap, (querySnapshot) => {
    // //       docSnap.forEach((doc) => {
    // //           currentCourses.push(doc.data());
    // //       });
    // //       setCurrentClasses(currentCourses);
    // //       return currentCourses;
    // //     }); 
        
    //  }
    // // function closeNavLink() {
    // //     window.scroll(0,0);
    // // }
    // // function Schedule (db){

    // // }

    // // function Roster(event) {

    // // }

    // // function Grades () {

    // // }

    // async function getRoster (db) {

    // }

    // async function getGrades(db) {


    // }

    useEffect(() => {
        setLoading(true);
        // getInstructorCourses(db);
        // getStudents(db);
        // getTclasses(db);
        // getLclasses(db);
      }, []);

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

                        {(OptionSelected.value === "complaints") && <div className="complaint"style={styles.container}>
                        <h2> Complaint </h2>
                            
                            <textarea className="input-name" id="input-name" ref={instname} placeholder="What's the name?" style={styles.textarea2} />
                            
                            <textarea className="input-details"id="input-details"ref={complaint} placeholder="Describe your issue." style={styles.textarea} />

                            <button onClick ={submitComplaint} className="button"> Submit </button>  
                        </div>
                        }       
                        {(OptionSelected.value === "warning") && <table className>
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
