import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import { db } from "../firebase.js";
import { useHistory } from 'react-router-dom';
import Tabs from '../components/Tabs';
import { getDoc,collection,onSnapshot, setDoc,doc,addDoc } from '@firebase/firestore';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import { FaStar } from "react-icons/fa";

export default function StudentView() {
    const history = useHistory();
   const instname = useRef();
   const classname = useRef(); 
   const experience = useRef();  
   const [Student, setStudent] = useState('');
   const [CurrentClasses, setCurrentClasses] = useState([]);
   const [Loading, setLoading] = useState('false');
   const [InputValue, setInputValue] = useState('');
   const [OptionSelected, setOptionSelected] = useState("schedule");
   const instructorRef = useRef();
   const courseRef = useRef();
   const options = [{label: "Schedule", value: "schedule"}, {label:"Record", value: "record"}, {label: "Drop", value: "drop"} , 
                    {label: "Enroll", value: "enroll"}, {label:"Grades", value: "grades"}, {label: "Complaints", value: "complaints"}, 
                    {label: "Rate", value: "rate"}, {label: "Warning", value: "warning"}];

    const handleInputChange = value => {
      setInputValue(value);
  }

  const handleChange = value => {
    setOptionSelected(value);
  }

    async function getStudentCourses(db) {
        const coursesCol = collection(db, 'Students', userData.getUd(),"Courses");
        setLoading(true);
       onSnapshot(coursesCol, (querySnapshot) => {
          const student = [];
          querySnapshot.forEach((doc) => {
              student.push(doc.data());
          });
          console.log(student);
          setCurrentClasses(student);
        });
        setLoading(false);
      }
    
    async function getWarnings(db){

        // var e = document.getElementById("dd1");
        // var strUser = e;
        // console.log(strUser); // en
        
        function la(src){
        console.log(src); 
        }
     }
    
    async function getCourses(db){
            
        
            function la(src){
            console.log(src); 
            }
        }

    async function getRoster(db){

        // var e = document.getElementById("dd1");
        // var strUser = e;
        // console.log(strUser); // en
    
        function la(src){
        console.log(src); 
        }                    
    }
        // <select defaultValue={this.state.selectValue} 
 // onChange={this.handleChange} 
    //  async function handleChange(event) {
    //      console.log(event);
    //     //this.setState({value: event.target.value});
    //     // setOptionSelected(this.state.value);
    // }
    async function submitreview(){
        await addDoc(collection(db, "Reviews"), {
            SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
            Course: document.getElementById("input-class").value,
            InstructorName: document.getElementById("input-name").value,
            Rating: currentValue,
            Review: document.getElementById("input-details").value 
          });
          alert("Review submitted, Thank you for your Feedback!");
          await history.push('Studentview');  
    }

 useEffect(() => {
    setLoading(true);
    getStudentCourses(db);
  }, []);


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    console.log(value)
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const colors = {
    violet: "#c722e0",
    grey: "#a9a9a9",  
    };

    return (
        <div className ='studentPage'>
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
                            
                            <textarea className="input-name" placeholder="What's the name?" style={styles.textarea2} />
                            
                            <textarea className="input-details"placeholder="Describe your issue." style={styles.textarea} />

                            <button className="button"> Submit </button>  
                        </div>
                        }       
                        {(OptionSelected.value === "rate") && <div className="rating"style={styles.container}>
                            <h2> Ratings </h2>
                            
                            <textarea className="input-name" id="input-name" ref={instname} placeholder="What's the instructor's name?" style={styles.textarea2} />
                            <textarea className="input-class" id = "input-class" ref={classname} placeholder="What's the class?" style={styles.textarea2} />
                            <div style={styles.stars}>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index ? colors.violet : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    />
                                )
                             })}
                            </div>
                                <textarea className="input-details" id="input-details"ref={experience} placeholder="What's your experience?" style={styles.textarea} />

                            <button onClick = {submitreview}className="button"> Submit </button>
      
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
                                <img src= "https://i.pravatar.cc/150?img=56" alt='' height="100px" width="100px"/>
                            </div>
                    </div>
                    <div className="lower-container">
                            <h3>Student Information</h3>
                            <p>First Name: {userData.getFirstname()}</p>
                            <p>Last Name: {userData.getLastname()}</p>
                            <p>Date of Birth: {userData.getDob()}</p>
                            <p>GPA: {userData.getGPA()}</p>
                            <p>EMPL: {userData.getEmpl()}</p>
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


