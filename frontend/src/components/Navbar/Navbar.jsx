import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'
import axios from "axios";

import './NavbarStyles.css';

function Navbar() {
  const handleSignIn = async () => {
    try {
        const response = await axios.post('http://localhost:3000/request');
        window.location.href = response.data.url; // Redirect to Google sign-in URL
    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
};
        const[nav, setNav] = useState(false)
        const handleNav = () => setNav(!nav)
  return (
    <div className={nav ? 'navbar navbar-bg' : 'navbar'}>
        <div className="nav-icons" onClick={() => handleSignIn()}>
              <BsPerson className='icon' />  
        </div>
    </div>
  )
}

export default Navbar