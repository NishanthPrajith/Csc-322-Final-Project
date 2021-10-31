
import './navbar.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';

export default function NavBar() {
    const history = useHistory();
    const { logout } = useAuth();

    function closeNavLink() {
        window.scroll(0,0);
    }

    async function signOut(event) {
      closeNavLink();
      event.preventDefault();
      try {
        await logout();
        history.push('/');
      } catch {
        alert("Failed to log out")
      }
    }

    return (
        <nav>
            <div className = "firstNav">
                <Link to = '/' onClick = {closeNavLink}>
                  <p className = "logo">CCNY ZERO</p>
                </Link>
                <div>
                    <Link to = '/' onClick = {closeNavLink}>
                        <p className = "links">Home</p>
                    </Link>
                    <Link to = '/about' onClick = {closeNavLink}>
                        <p className = "links">About Me</p>
                    </Link>
                    <Link to = '/projects' onClick = {closeNavLink}>
                        <p className = "links">Projects</p>
                    </Link>
                    <Link to = '/contactme' onClick = {closeNavLink}>
                        <p className = "links">Contact Me</p>
                    </Link>
                    { !userData.getStatus() &&
                      <Link to = '/admin' onClick = {closeNavLink}>
                          <p className = "links">Admin</p>
                      </Link>
                    }
                </div>
            </div>
            <div className = "LoginInNav">
              <p className = "displayName"> { userData.getName() } </p>
              <Link to = '/SignIn' style = {userData.getStatus() ? {} : {display: "none"}} onClick = {closeNavLink}>
                  <p className = "links">Sign In</p>
              </Link>

              <Link to = '/' style = {userData.getStatus() ? {display: "none"} : {}} onClick = {signOut}>
                  <p className = "links">Sign Out</p>
              </Link>
            </div>
        </nav>
    )
}
