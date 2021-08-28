import './SignIn.css'
import { Link } from "react-router-dom";

export default function SignIn() {
    return (
      <div>
        <div class="login-page">
          <div class="form">
            <p className = "title"> Sign In </p>
            <form class="login-form">
              <input type="text" className = "five" placeholder="Username" autocomplete = "off" required/>
              <label className = "six">Username</label>
              <input type="password" placeholder="Password" autocomplete = "off" required/>
              <label className = "two">Password</label>
              <button>login</button>
              <p class="message">Not registered? <Link to="/SignUp">Create an account</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
