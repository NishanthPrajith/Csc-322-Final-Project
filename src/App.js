
import './App.css';
import NavBar from './navbar/Navbar.js'
import SignIn from './signIn/SignIn'
import Footer from './footer/Footer'
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
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
      <Footer />
    </div>
  );
}

export default App;
