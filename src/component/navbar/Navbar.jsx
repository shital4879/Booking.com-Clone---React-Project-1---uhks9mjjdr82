import React, {useEffect, useState} from 'react'
import "./navbar.css";
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser
}from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { json, useNavigate } from 'react-router-dom';


const Navbar =({type})=>{
  const navigate = useNavigate()

  return (
    <div>
    <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>Booking.com</span>
            <div className='navItems'>
                <button className='navButton'>Register</button>
                <button className='navButton'>Sign in</button>
            </div>
        </div>
    </div>

  <div className='head'>
    <div className='header'>
        <div className='headerContainer'>
        <div className='headerList'>
            <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} className="stays-i"/>
            <span>Stays</span>
            </div>
            <div className='headerListItem'onClick={()=>navigate('/flight')}>
            <FontAwesomeIcon icon={faPlane} className="flights-i"/>
            <span>Flights</span>
            </div>
        </div>
       </div>
       </div>
    </div>
    
   {type !== "list" &&
    <>
    <div className="headerTitle">
          <h1 className="heading1">Find your next stay</h1>
          <p className="para">Search low prices hotels,homes and much more...</p>
     </div>
     </>
  }

    </div>
  )
}

export default Navbar;
