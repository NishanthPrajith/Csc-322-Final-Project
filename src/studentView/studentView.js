import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState } from 'react';
import Tabs from '../components/Tabs';
export default function studentView() {

    //  const [Student, setStudent] = useState('');
     //   const [CurrentClasses, setCurrentClasses] = useState([]);
    //  const [CurrentRoster, setCurrentRoster] = useState([]);
    //  const [Loading, setLoading] = useState('false');

     async function getCourses(db) {
    //     var myUserId = firebase.auth().currentUser.uid;
     }

    async function getEnroll(db) {

    }

    async function getGrades(db){

    }
    return (
        <div>
        <h1>Welcome!</h1>
              <p>{ userData.getName() }</p>
              <p>{ userData.getEmpl() }</p>
              <Tabs>
                <div label="Schedule" onClick = {getCourses}>
                        <table className = "CourseStyle">
                            <tr>
                                <th>Class</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Meeting Times</th>
                                <th> Enrolled</th>
                            </tr>
                        {/* { CurrentClasses.map((Class) => (
                            <tr>
                                <td> { Class.name } </td>
                                <td> { Class.time } </td>
                                <td> { Class.location } </td>
                                <td> { Class.date } </td>
                                <td> {Class.Enrolled } </td>
                            </tr>
                        ))} */}
                        </table>
                </div>
                <div label= "Enroll" onClick = {getEnroll}>                    

                </div>
                <div label = "Grades" onClick = {getGrades}>

                </div>                
                </Tabs>      
        </div>

    
    );
}