import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'

import './NavbarStyles.css';

function Navbar() {
        const[nav, setNav] = useState(false)
        const handleNav = () => setNav(!nav)
  return (
    <div className={nav ? 'navbar navbar-bg' : 'navbar'}>
        <div className="nav-icons">
              <BsPerson className='icon' />  
        </div>
    </div>
  )
}

export default Navbar