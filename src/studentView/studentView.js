import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState } from 'react';
import React from 'react'
import Tabs from '../components/Tabs';
import { getDoc } from '@firebase/firestore';
import Studentaboutme from '../studentView/Studentaboutme';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
export default function StudentView() {

   const [Student, setStudent] = useState('');
   const [CurrentClasses, setCurrentClasses] = useState([]);
   const [CurrentRoster, setCurrentRoster] = useState([]);
   const [Loading, setLoading] = useState('false');


    //  async function getCourses(db) {
    // //     var myUserId = firebase.auth().currentUser.uid;
    //  }

    // async function getEnroll(db) {

    // }

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

    return (
        <div>
        <h1 class= "noselect">Welcome!</h1>
        <Container className = "Dropdown" maxWidth = "xs">
            <Typography component="div" style={{ backgroundColor: "white" }}>
                <div> 
                    <div className='Card'>
                        <div className = "upper-container">      
                            <h2>Selection Menu</h2>

                        </div>
                        <div className="lower-container2">
                        <label for="options">Choose an option:</label>
                            <select>
                                <option value="" selected="selected"></option>
                                <option value ="schedule">Schedule</option>
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
            </Typography>
        </Container>    

        <div>
            <Container className = "Display" maxWidth = "lg">
                <Typography component="div" style={{ backgroundColor: 'blue', height: '90vh' }}>
                    <div>   
               
                    </div>
                </Typography>
            </Container>  
        </div>

        <Container className = "MyInfo" maxWidth = "sm">
            <Typography component="div" style={{ backgroundColor: 'White'}}>
                <div>
                    <div className='Card'>
                        <div className='upper-container'>
                            <div className='image-container'>
                                <img src= "https://www.logolynx.com/images/logolynx/ab/ab3cf43cb423c7d9c20eadde6a051a5d.jpeg" alt='' height="100px" width="100px"/>
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
            </Typography>
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
            {/* </form>    */}
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