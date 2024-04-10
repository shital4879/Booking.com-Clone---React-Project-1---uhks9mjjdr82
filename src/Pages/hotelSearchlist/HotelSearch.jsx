import React,{useState} from 'react'
import "./hotelsearch.css"
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import SearchHotel from '../../component/search/SearchHotel'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignOut from '../../component/register/SignOut'
import Nav from '../../component/navbar/Nav'

const HotelSearch = () => {
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
      {/* <Navbar type="list"/> */}
      {/* <Header/> */}


      <Nav/>

      {/* <div className="head">
        <div className="header">
          <div className="headerContainer">
            <div className="headerList">
                <div className="headerList">
              <nav className="navlink" style={{display:"flex"}}>
              <NavLink 
              className="navv"
              to="/"
              id="activebutton"
              style={{marginRight:"40px",display:"flex",marginLeft:"-80px"}}
              >
                <FontAwesomeIcon icon={faBed} className="stays-i"  style={{marginRight:"-1px",paddingLeft:"6px"}}/>
                Stays</NavLink>
              <NavLink
              className="nav-bar-link"
              to="/flight"
              id="activebutton"
              style={{display:"flex"}}
              >
                <FontAwesomeIcon icon={faPlane} className="flights-i" style={{marginRight:"-1px",paddingLeft:"6px"}}/>
                Flights</NavLink>
              </nav>
            </div>
            </div>
          </div>
        </div>
      </div> */}

      <SearchHotel/>
    </div>
  )
}

export default HotelSearch;
