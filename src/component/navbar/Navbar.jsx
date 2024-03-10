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
  const [openSign, setOpenSing] = useState(false);
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
  const [activeButton, setActiveButton] = useState(1);

  // Function to handle button click
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
              <button
                // className="headerListItem active"
                id="activebutton"
                className={activeButton == 1 ? 'active' : 'activity'}
                onClick={() => {handleButtonClick(1),navigate("/")}}
              >
                <FontAwesomeIcon icon={faBed} className="stays-i" />
                <span>Stays</span>
              </button>
              <button
                // className="headerListItem"
                className={activeButton == 2 ? 'active' : 'activity'}
                id="activebutton"
                onClick={() => {handleButtonClick(2),navigate("/flight")}}
              >
                <FontAwesomeIcon icon={faPlane} className="flights-i" />
                <span>Flights</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {type !== "list" && (
        <>
          <div className="headerTitle">
            <h1 className="heading1" style={{ fontSize: "40px" }}>
              Find your next stay
            </h1>
            <p className="para" style={{ fontSize: "26px" }}>
              Search low prices hotels,homes and much more...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
