
import './App.css';
// import NavBar from './navbar/Navbar.js'
import SignIn from './signIn/SignIn'
import Footer from './footer/Footer'
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import Error from './error/error.js'
import { AuthProvider } from "./contexts/Authcontext"
import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { useEffect } from 'react';
import { userData } from './contexts/userProfile';

function App() {
  const location = useLocation();

  return (
    <div className="App">

      <AuthProvider>
      {/* <NavBar /> */} lol tufayel i sgay 
        <Switch location = {location} key = {location.key}>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route exact path = "/about">
          </Route>
          <Route path = "/projects">
            <p>Done</p>
          </Route>
          <Route exact path = "/SignIn">
            <SignIn />
          </Route>
          <Route exact path = "/SignUp">
            <SignUp />
          </Route>
          { !userData.getStatus() &&
            <Route exact path = "/admin">
              <p>Admin</p>
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
