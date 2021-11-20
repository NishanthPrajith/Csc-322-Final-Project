import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState } from 'react';
import React from 'react'
import Tabs from '../components/Tabs';
import { getDoc } from '@firebase/firestore';
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
            <Typography component="div" style={{ backgroundColor: "Purple", height: '30vh' }}>
                <div>   
                    <label for="options">Choose an option:</label>
                            <select >
                                <option value ="schedule" selected>Schedule</option>
                                <option value="record">Record</option>
                                <option value="drop" >Drop</option>
                                <option value="enroll">Enroll</option>
                                <option value="grades">Grades</option>
                                <option value="complain">Complain</option>
                                <option value="rate">Rate</option>
                                <option value="warning">Warning</option>
                            </select>                 
                        {/* <button onClick = {getRoster}>Roster</button> */}
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
                                    <img src="https://i.pravatar.cc/150?img=56" alt="W3Schools.com" width="100" height="132"/>
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