import './home.css'
import '../signIn/SignIn.js'

import React from 'react';
import SignIn from '../signIn/SignIn';


export default function Home() {
  return (
    <div className = "main">
      <SignIn /> 
    </div>
  )
}
