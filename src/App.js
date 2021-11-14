import './App.css';
import NavBarHome from './navbar/Navbarhome.js'
import SignIn from './signIn/SignIn'
import Footer from './footer/Footer'
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import ForgotPassword from './forgotPassword/ForgotPassword'
import Error from './error/error.js'
import AboutUs from './aboutus/AboutUs.js'
import StudentView from './studentView/studentView.js'
import Registrars from './registrars/registrars.js'
import RegistrarsApplications from './registrars/registrarsApplications.js'
import InstructorView from './instructorView/instructorView.js'
import NewAcceptedStudent from './studentView/newAcceptedStudent.js'
import { AuthProvider } from "./contexts/Authcontext"
import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { userData } from './contexts/userProfile';

function App() {
  const location = useLocation();

  return (
    <div className="App">

      <AuthProvider>
        <NavBarHome />
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
          </Route>
          <Route path="/projects">
            <p>Done</p>
          </Route>
          <Route exact path="/SignIn">
            <SignIn />
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          <Route exact path="/AboutUs">
            <AboutUs />
          </Route>
          <Route exact path="/instructorView">
            <instructorView />
          </Route>
          <Route exact path="/ForgotPassword">
            <ForgotPassword />
          </Route>
          {(userData.getRole() == 2) &&
            <Route exact path="/Registrars">
              <Registrars />
            </Route>
          }
          {(userData.getRole() == 2) &&
            <Route exact path="/RegistrarsApplication">
              <RegistrarsApplications />
            </Route>
          }
          {(userData.getRole() == 0) &&
            <Route exact path="/Studentview">
              <StudentView />
            </Route>
          }
          {(userData.getRole() == 0) &&
            <Route exact path="/NewAcceptedStudent">
              <NewAcceptedStudent />
            </Route>
          }
          {(userData.getRole() == 1) &&
            <Route exact path="/Instructorview">
              <InstructorView />
            </Route>
          }
          <Route>
            <Error />
          </Route>
        </Switch>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
