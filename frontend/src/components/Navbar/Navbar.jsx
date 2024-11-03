import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';


import './NavbarStyles.css'; // Import the CSS file

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/request');
      window.location.href = response.data.url; // Redirect to Google sign-in URL
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className={nav ? 'navbar navbar-bg' : 'navbar'} onClick={handleNav}>
      <div className="nav-icons" onClick={handleSignIn}>
        <BsPerson className="icon" />
      </div>
    </div>
  );
}

export default Navbar;
