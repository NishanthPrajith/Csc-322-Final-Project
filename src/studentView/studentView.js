import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState } from 'react';
import Tabs from '../components/Tabs';
export default function studentView() {

    // //  const [Student, setStudent] = useState('');
    //  //   const [CurrentClasses, setCurrentClasses] = useState([]);
    // //  const [CurrentRoster, setCurrentRoster] = useState([]);
    // //  const [Loading, setLoading] = useState('false');

    //  async function getCourses(db) {
    // //     var myUserId = firebase.auth().currentUser.uid;
    //  }

    // async function getEnroll(db) {

    // }

    // async function getGrades(db){

        // var e = document.getElementById("dd1");
        // var strUser = e;
        // console.log(strUser); // en
    
        function la(src){
        console.log(src); 
        }

        // <select defaultValue={this.state.selectValue} 
 // onChange={this.handleChange} 
 
    return (
        <div>
        <h1>Welcome!</h1>
              {/* <form classname="dd" id="dd1"> */}
                    <label for="options">Choose an option:</label>
                        <select >
                            <option value="" selected="selected"></option>
                            <option value="record">Record</option>
                            <option value="drop" >Drop</option>
                            <option value="enroll">Enroll</option>
                            <option value="grades">Grades</option>
                            <option value="complain">Complain</option>
                            <option value="rate">Rate</option>
                        </select>
                        {/* <input type="submit" value="Submit"/> */}
            {/* </form>    */}
        </div>

    
    );
}