import './navbarhome.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import React from 'react';


export default function NavBar(){
  const { logout } = useAuth();

  function closeNavLink() {
    window.scroll(0, 0);
  }

  return (
    <div>
      <nav className = "Navbar">
        <div className="firstNav">
          { !userData.getStatus() &&
          <Link to='/' onClick={closeNavLink}>
            <h1 className="navbar-logo">CCNYZero<i className="fab fa-react"></i><Link to ='/'></Link></h1>
          </Link>
          }
          <div className="nav-menu">
            <Link to='/AboutUs' onClick={closeNavLink}>
              <p className="nav-links">About Us</p>
            </Link>
            {(userData.getRole() === 1) &&
              <Link to='/instructorView' onClick={closeNavLink}>
                <p className="nav-links">Instructor Center</p>
              </Link>
            }
            {
              userData.getStatus() && <p className="username"> {userData.getName()} </p>
            }
             {
              userData.getStatus() && <button onClick={() => logout()} className="signout"> Sign Out</button>
            }
            {(userData.getRole() === 0) &&
              <Link to='/Studentview' onClick={closeNavLink}>
                <p className="nav-links">Student Center</p>
              </Link>
            }
             {(userData.getRole() === 0) &&
              <Link to='/StudentRegister' onClick={closeNavLink}>
                <p className="nav-links">Enroll Page</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/RegistrarsApplication' onClick={closeNavLink}>
                <p className="nav-links">Review Applications</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/Registrarscomplains' onClick={closeNavLink}>
                <p className="nav-links">Review Complains</p>
              </Link>
            }
            {((userData.getRole() === 2) && (userData.getPeriod() === 0)) &&
              <Link to='/Regclasssetup' onClick={closeNavLink}>
                <p className="nav-links">Class set-up period</p>
              </Link>
            }
          </div>

        </div>
      </nav>
    </div>
  )
}
