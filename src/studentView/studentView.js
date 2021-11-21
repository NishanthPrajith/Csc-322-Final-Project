import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState, useEffect } from 'react';
import React from 'react'
import { db } from "../firebase.js";
import Tabs from '../components/Tabs';
import { getDoc,collection,onSnapshot } from '@firebase/firestore';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
export default function StudentView() {

   const [Student, setStudent] = useState('');
   const [CurrentClasses, setCurrentClasses] = useState([]);
   const [CurrentRoster, setCurrentRoster] = useState([]);
   const [Loading, setLoading] = useState('false');
   const [ScheduleSelected, setScheduleSelected] = useState('true');
   const [RecordSelected, setRecordSelected] = useState('false');


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

 useEffect(() => {
    setLoading(true);
    getStudentCourses(db);
  }, []);

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
                            <label for="options">Choose an option:</label>
                            <select>
                                <option value ="schedule" selected ="schedule" onClick = {()=> {setScheduleSelected("true")}}>Schedule</option>
                                <option value="record">Record</option>
                                <option value="drop" >Drop</option>
                                <option value="enroll">Enroll</option>
                                <option value="grades">Grades</option>
                                <option value="complaints">Complaints</option>
                                <option value="rate">Rate</option>
                                <option value="warning">Warning</option>
                            </select>                         
                        </div>
                    </div>
                </div>    
        </Container>    

        <Container className= "Display" maxWidth = "false" >
                <div className= "Display" style={{ backgroundColor: "black", height: '80vh' , width: '150vh'}}>
                        {ScheduleSelected && <table className = "CourseStyler">
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
                                    <td> { Class.Secion } </td>
                                    <td> {Class.Instructor } </td>
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
        
            {/*<div label="Schedule" onClick = {getCourses}>
                        <table className = "CourseStyler">
                            <tr>
                                <th>Class</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Meeting Times</th>
                                <th> Enrolled</th>
                            </tr>
                        { CurrentClasses.map((Class) => (
                            <tr>
                                <td> { Class.name } </td>
                                <td> { Class.time } </td>
                                <td> { Class.location } </td>
                                <td> { Class.date } </td>
                                <td> {Class.Enrolled } </td>
                            </tr>
                        ))}
                        </table>
                        </div>*/}
          
              {/* <form classname="dd" id="dd1"> */}

                        {/* <input type="submit" value="Submit"/> */}
            {/* /</div>/</form>    */}
        </div>

    
    );
}

/* <Container className = "MyInfo" maxWidth = "sm">
                <Typography component="div" style={{ backgroundColor: 'Green'}}>
                    <div>
                        <div>Student Information</div>       
                        { Studentaboutme() }
                    </div>
                </Typography>
            </Container>  */