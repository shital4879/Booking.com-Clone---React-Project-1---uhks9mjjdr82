import React, { useEffect, useState } from "react";
import "./navbar.css";
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { json, useNavigate } from "react-router-dom";
import SignOut from "../register/SignOut";


const Navbar = ({ type }) => {
  const[openSign,setOpenSing] = useState(false);
  const navigate = useNavigate();

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };
  // const SignOut = () =>{
  //   navigate()
  // }

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
            {localStorage.getItem("token") &&
              <div className="profile"  style={{marginLeft:"0px",marginRight:"110px"}} onClick={(e)=>{e.stopPropagation(),setOpenSing(!openSign)}} >
                {openSign && 
                <SignOut/>
                }
              </div>
            }

          </div>
        </div>
      </div>

      <div className="head">
        <div className="header">
          <div className="headerContainer">
            <div className="headerList">
              <div className="headerListItem active" onClick={()=>navigate("/")}>
                <FontAwesomeIcon icon={faBed} className="stays-i" />
                <span>
                  Stays</span>
              </div>
              <div
                className="headerListItem"
                onClick={() => navigate("/flight")}
              >
                
                <FontAwesomeIcon icon={faPlane} className="flights-i" />
                <span>Flights</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {type !== "list" && (
        <>
          <div className="headerTitle">
            <h1 className="heading1" style={{fontSize:"40px"}}>Find your next stay</h1>
            <p className="para" style={{fontSize:"26px"}}>
              Search low prices hotels,homes and much more...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
