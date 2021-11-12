import React, { Component } from 'react'
import './navbarhome.css';
import { Link } from "react-router-dom";
import { userData } from '../contexts/userProfile';
import { useAuth } from "../contexts/Authcontext";
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import { auth } from '../firebase';


export default function NavBar() {
  const history = useHistory();
  const { logout } = useAuth();

  function closeNavLink() {
    window.scroll(0, 0);
  }

  return (
    <div>
      <nav>
        <div className="firstNav">
          <Link to='/' onClick={closeNavLink}>
            <p className="logo">CCNYZero</p>
          </Link>
          <div>
            <Link to='/AboutUs' onClick={closeNavLink}>
              <p className="links">About Us</p>
            </Link>
            {(userData.getRole() == 1) &&
              <Link to='/admin' onClick={closeNavLink}>
                <p className="links">Admin</p>
              </Link>
            }
            {
              userData.getStatus() && <p className="username"> {userData.getName()} </p>
            }
            {(userData.getRole() == 0) &&
              <Link to='/Studentview' onClick={closeNavLink}>
                <p className="links">Student</p>
              </Link>
            }
            {(userData.getRole() == 2) &&
              <Link to='/RegistrarsApplication' onClick={closeNavLink}>
                <p className="links">Review Applications</p>
              </Link>
            }
          </div>

        </div>
      </nav>
    </div>
  )
}
