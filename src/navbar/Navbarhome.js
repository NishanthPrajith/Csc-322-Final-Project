import './navbarhome.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import React from 'react';


export default function NavBar() {
  const { logout } = useAuth();
  let period;
  switch (parseInt(userData.getPeriod())) {
    case 0:
      period = "Class Set Up Period"
      break;
    case 1:
      period = "Course Registration Period"
      break;
    case 2:
        period = "Class Running Period"
        break;
    case 3:
        period = "Grading Period"
        break;
    default:
      period = ""
      break;
  }

  function closeNavLink() {
    window.scroll(0, 0);
  }

  return (
    <div>
      <nav className="Navbar">
        <div className="firstNav">
          {!userData.getStatus() &&
            <Link to='/' onClick={closeNavLink}>
              <h1 className="navbar-logo">CCNYZero<i className="fab fa-react"></i><Link to='/'></Link></h1>
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
              userData.getStatus() && <p className="username"> {period } </p>
            }
            {
              userData.getStatus() && <button onClick={() => logout()} className="signout"> Sign Out</button>
            }
            {(userData.getRole() === 0) &&
              <Link to='/Studentview' onClick={closeNavLink}>
                <p className="nav-links">Student Center</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/RegistrarsApplication' onClick={closeNavLink}>
                <p className="nav-links">Review Applications</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/RegistrarsComplains' onClick={closeNavLink}>
                <p className="nav-links">Review Complains</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/GradMembers' onClick={closeNavLink}>
                <p className="nav-links">Grad Members</p>
              </Link>
            }
            {(userData.getRole() === 2) &&
              <Link to='/SuspendedStudents' onClick={closeNavLink}>
                <p className="nav-links">Suspended Students</p>
              </Link>
            }
            {((userData.getRole() === 2) && (userData.getPeriod() === 0)) &&
              <Link to='/Regclasssetup' onClick={closeNavLink}>
                <p className="nav-links">Class set-up period</p>
              </Link>
            }
            {((userData.getRole() === 2) && (userData.getPeriod() === 3)) &&
              <Link to='/GradingReview' onClick={closeNavLink}>
                <p className="nav-links">Grading Review</p>
              </Link>
            }
            {((userData.getRole() === 2))  &&
              <Link to='/GraduatingStudents' onClick={closeNavLink}>
                <p className="nav-links">Graduating Students</p>
              </Link>
            }

          </div>

        </div>
      </nav>
    </div>
  )
}
