import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState } from 'react';
import Tabs from '../components/Tabs';
import { getDoc } from '@firebase/firestore';
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
            <div>   
                <label for="options">Choose an option:</label>
                        <select >
                            <option value="" selected="selected"></option>
                            <option value ="schedule">Schedule</option>
                            <option value="record">Record</option>
                            <option value="drop" >Drop</option>
                            <option value="enroll">Enroll</option>
                            <option value="grades">Grades</option>
                            <option value="complain">Complain</option>
                            <option value="rate">Rate</option>
                        </select>                 
                    {/* <button onClick = {getRoster}>Roster</button> */}
            </div>

            <div label="Schedule" onClick = {getCourses}>
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
            </div>
          
              {/* <form classname="dd" id="dd1"> */}

                        {/* <input type="submit" value="Submit"/> */}
            {/* </form>    */}
        </div>

    
    );
}