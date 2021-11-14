import './studentView.css'
import { userData } from '../contexts/userProfile';
export default function studentView() {

    // const [Student, Student] = useState('');
    // const [CurrentClasses, setCurrentClasses] = useState([]);
    // const [CurrentRoster, setCurrentRoster] = useState([]);
    // const [Loading, setLoading] = useState('false');

    // async function getCourses() {
    //     var myUserId = firebase.auth().currentUser.uid;
    // }
    return (
        <div>
        <h1>Welcome!</h1>
              <p>{userData.getName()}</p>
              <p>{userData.getEmpl()}</p>
        </div>
    );
}