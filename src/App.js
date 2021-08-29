
import './App.css';
import NavBar from './navbar/Navbar.js'
import SignIn from './signIn/SignIn'
import Footer from './footer/Footer'
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import { AuthProvider } from "./contexts/Authcontext"
import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  return (
    <div className="App">

      <AuthProvider>
      <NavBar />
        <Switch location = {location} key = {location.key}>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route exact path = "/about">
          </Route>
          <Route path = "/projects">
          </Route>
          <Route exact path = "/SignIn">
            <SignIn />
          </Route>
          <Route exact path = "/SignUp">
            <SignUp />
          </Route>
        </Switch>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
