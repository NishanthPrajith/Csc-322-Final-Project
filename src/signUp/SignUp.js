import './SignUp.css'
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
      <div>
        <div class="login-page">
          <div class="form">
            <p className = "title"> Sign Up </p>
            <form class="login-form">
              <input type="text" className = "One" name = "FullName" autocomplete = "off" placeholder="Full Name" required/>
              <label className = "three">Full Name</label>
              <input type="text" className = "Two" name = "Username" autocomplete = "off" placeholder="Username" required/>
              <label className = "one">Username</label>
              <input type="password" placeholder="Password" autocomplete = "off" required/>
              <label className = "two">Password</label>
              <button>Register</button>
              <p class="message">Already registered? <Link to="/SignIn">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
