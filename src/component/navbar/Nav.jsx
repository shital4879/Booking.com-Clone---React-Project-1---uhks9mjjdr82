import React, { useState } from 'react'
import {
    faBed,
    faPlane,
    faCar,
    faTaxi,
    faCircleQuestion,
  } from "@fortawesome/free-solid-svg-icons";
  
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { NavLink, json, useNavigate } from "react-router-dom";
  import SignOut from "../register/SignOut";


const Nav = () => {
  const navigate = useNavigate();
  const [openSign, setOpenSing] = useState(false);
    const RegisterPage = () => {
        navigate(`/Register`);
      };
      const SignInPage = () => {
        navigate(`/SignIn`);
      };
      //

  return (
    <div>
        <div style={{ width: "100%" }}>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo"  onClick={() => navigate("/")} style={{cursor:"pointer"}}>Booking.com</span>

          <div style={{ display: "flex", marginLeft: "-350px",marginTop:"-4px" }} className="navp1">
            <button style={{}} className="circle" disabled>
              INR
            </button>
            <button className="circle">
              <img
                src="https://faraz-khan-booking-com-clone-react-project-1-jza6qqtrfilv.vercel.app/images/IndiaFlag.png"
                alt=""
                style={{
                  height: "25px",
                  width: "30px",
                  borderRadius: "10%",
                  marginTop: "-4px",
                }}
              />
            </button>
            <button className="circle">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "25px", width: "30px", marginTop: "-4px" }}
              />
            </button>
            <button className="circle">List Your Property</button>
          </div>

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
                <div style={{ width: "180px", display: "flex" }}></div>
                <div
                  className="profile"
                  style={{ marginLeft: "50px" }}
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
              <nav className="navlink" style={{ display: "flex" }}>
                <NavLink
                  className="nav-bar-link"
                  to="/"
                  id="activebutton"
                  style={{ marginRight: "30px", display: "flex" }}
                >
                  <FontAwesomeIcon
                    icon={faBed}
                    className="stays-i"
                    style={{ marginRight: "-1px", paddingLeft: "6px" }}
                  />
                  Stays
                </NavLink>
                
                <NavLink
                  className="nav-bar-link"
                  to="/flight"
                  id="activebutton"
                  style={{ display: "flex" }}
                >
                  <FontAwesomeIcon
                    icon={faPlane}
                    className="flights-i"
                    style={{ marginRight: "-1px", paddingLeft: "6px" }}
                  />
                  Flights
                </NavLink>

                <div className="navitem2" style={{
                    display: "flex ",
                    marginLeft: "35px",
                    width: "225px",
                  }}>
                <NavLink
                  className="nav-bar"
                  to="/CarRentel"
                  id="activebutton"
                  style={{
                    display: "flex ",
                    marginLeft: "10px",
                    width: "225px",
                  }}
                >
                  <FontAwesomeIcon icon={faCar} className="nav-bar"/>
                  <h1
                    style={{
                      width: "80px",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    className="nav-bar"
                  >
                    Car Rentals
                  </h1>
                </NavLink>

                <NavLink
                  className="nav-bar"
                  to="/AirportTaxi"
                  id="activebutton"
                  style={{
                    display: "flex ",
                    width: "225px",
                    marginLeft: "35px",
                  }}
                >
                  <FontAwesomeIcon icon={faTaxi} className="nav-bar"/>
                  <h1
                    style={{
                      width: "90px",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    className="nav-bar"
                  >
                    Airport taxis
                  </h1>
                </NavLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Nav
