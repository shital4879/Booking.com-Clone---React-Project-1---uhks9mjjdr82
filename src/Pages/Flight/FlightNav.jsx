import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignOut from '../../component/register/SignOut';


export default function FlightNav() {

    const [openSign, setOpenSing] = useState(false);
    const navigate = useNavigate();
    const RegisterPage = () => {
        navigate(`/Register`);
      };
      const SignInPage = () => {
        navigate(`/SignIn`);
      };
      
      const [activeButton, setActiveButton] = useState(0);
      
      
      const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
      };
  return (
    <div>
       <div className="navbar">
        <div className="navContainer">
          <span className="logo">Booking.com</span>
          <div className="navItems">
            {!localStorage.getItem("token") && (
              <button className="navButton" onClick={RegisterPage}>
                Register
              </button>
            )}
            {!localStorage.getItem("token") && (
              <button className="navButton" onClick={SignInPage}>
                Sign in
              </button>
            )}
            {localStorage.getItem("token") && (
              <div>
              <div style={{width:"180px",display:"flex"}}></div>
              <div
                className="profile"
                style={{ marginLeft: "50px", }}
                onClick={(e) => {
                  e.stopPropagation(), setOpenSing(!openSign);
                }}
              >
                {openSign && <SignOut />}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="head">
        <div className="header">
          <div className="headerContainer">
            <div className="headerList">
                <div className="headerList">
              <nav className="navlink" style={{display:"flex"}}>
              <NavLink 
              className="nav-bar-link"
              to="/"
              id="activebutton"
              style={{marginRight:"40px",display:"flex",marginLeft:"-80px"}}
              >
                <FontAwesomeIcon icon={faBed} className="stays-i"  style={{marginRight:"-1px",paddingLeft:"6px"}}/>
                Stays</NavLink>
              <NavLink
              className="navv"
              to="/flight"
              id="activebutton"
              style={{display:"flex",marginLeft:"-60px"}}
              >
                <FontAwesomeIcon icon={faPlane} className="flights-i" style={{marginRight:"-1px",paddingLeft:"6px"}}/>
                Flights</NavLink>
              </nav>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
