import React from 'react'
import './HeroStyles.css'
import Video from '../../assets/background.mp4'
import logo from '../../assets/logo.png'

function Hero() {


  return (
    <div className='hero'>
        <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
        </video>
        <div className="logo">
                <img src={logo} alt="BurnHub Logo" className="logo-image" />
        </div>
        <div className="content">
          <h2>Because Good Advice is Overrated!</h2>
        </div>
    </div>
  )
}

export default Hero