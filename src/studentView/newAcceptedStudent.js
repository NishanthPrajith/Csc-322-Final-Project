import './newAcceptedStudent.css'
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { db } from "../firebase.js";

export default function newAcceptedStudent() {
    return (
        // {userData.getName()}
        <div>
        <h1>Welcome!</h1>
        <table className = "xNewStudent">
            <tr>
              <th>{userData.getName()}</th>
              <th>{userData.getEmpl()}</th>
            </tr>
        </table>
        </div>
    );
}