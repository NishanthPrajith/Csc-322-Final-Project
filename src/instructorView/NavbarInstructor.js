
import './navbarInstructor.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';

export default function NavbarInstructor() {
    const history = useHistory();
    const { logout } = useAuth();

    function closeNavLink() {
        window.scroll(0,0);
    }

    async function signOut(event) {
        event.preventDefault();
        try {
            await logout();
            closeNavLink();
            history.push('/');
        } catch {
            alert("Failed to log out");
        }
    }

    return (
        <nav>
            <div className = "firstNav">
                <Link to = '/' onClick = {closeNavLink}>
                  <p className = "logo">CCNYZero</p>
                </Link>
                <div>
                    <Link to = '/' onClick = {closeNavLink}>
                        <p className = "links">Home</p>
                    </Link>
                    <Link to = '/Schedule' onClick = {closeNavLink}>
                        <p className = "links">Schedule</p>
                    </Link>
                    <Link to = '/Roster' onClick = {closeNavLink}>
                        <p className = "links">Roster</p>
                    </Link>
                    <Link to = '/Grades' onClick = {closeNavLink}>
                        <p className = "links">Grades</p>
                    </Link>
                    { !userData.getStatus() &&
                      <Link to = '/admin' onClick = {closeNavLink}>
                          <p className = "links">Admin</p>
                      </Link>
                    }
                </div>
            </div>
            <div className = "LoginInNav">
              <p className = "displayName"> { userData.data().firstname + ' ' + userData.data().lastname } </p>
              <Link to = '/' style = {userData.getStatus() ? {display: "none"} : {}} onClick = {signOut}>
                  <p className = "links">Sign Out</p>
              </Link>
            </div>
        </nav>
    )
}
