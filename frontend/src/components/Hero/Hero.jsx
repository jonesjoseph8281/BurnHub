import React from 'react'
import axios from "axios";
import './HeroStyles.css'
import Video from '../../assets/background.mp4'
import logo from '../../assets/logo.png'

function Hero() {
  const handleSignIn = async () => {
    try {
        const response = await axios.post('http://localhost:3000/request');
        window.location.href = response.data.url; // Redirect to Google sign-in URL
    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
};

  return (
    <div className='hero'>
        <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
        </video>
        <div className="logo" onClick={() => handleSignIn()}>
                <img src={logo} alt="BurnHub Logo" className="logo-image" />
        </div>
        <div className="content">
          <h2>Because Good Advice is Overrated!</h2>
        </div>
    </div>
  )
}

export default Hero