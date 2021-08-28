
import './navbar.css';
import { Link } from "react-router-dom";

export default function NavBar() {

    function closeNavLink() {
        window.scroll(0,0);
    }

    return (
        <nav>
            <div className = "firstNav">
                <p className = "logo">Online Store</p>
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
                </div>
            </div>
            <div className = "LoginInNav">
              <Link to = '/SignIn' onClick = {closeNavLink}>
                  <p className = "links">Sign In</p>
              </Link>
            </div>
        </nav>
    )
}
