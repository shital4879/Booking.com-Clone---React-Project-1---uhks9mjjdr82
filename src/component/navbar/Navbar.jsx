import React, { useEffect, useState } from "react";
import "./navbar.css";
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
import { AIRPORTID } from "../../utill";

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
  const [activeButton, setActiveButton] = useState(0);

  // Function to handle button click
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [check, setCheck] = useState({
    stays: true,
    flight: true,
    car: true,
    taxi: true,
  });

  const checker=(key)=>{
    setCheck((prev) => ({ ...prev, [key]: !check[key] }));
  }

  const fetchapi = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/booking/`,
        {
          method: "GET",
          headers: {
            projectID: "uhks9mjjdr82",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchapi();
  });

  const storeddata = JSON.parse(localStorage.getItem("UserInfo"));
  console.log(storeddata);

  return (
    <div style={{ width: "100%" }}>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo" onClick={() => navigate("/")}  style={{cursor:"pointer"}}>
            Booking.com
          </span>

          <div
            style={{ display: "flex", marginTop: "-4px" }}
            className="navp1"
          >
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
                   {storeddata.name.charAt(0).toUpperCase()}
                 
                  {openSign && <SignOut />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {type !== "list1" && (
        <div className="head">
          <div className="header">
            <div className="headerContainer">
              <div className="headerList">
                <nav className="navlink" style={{ display: "flex" }}>
                  {check == "stays" ? true : check == "flight"}
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
                    {/* <input type="checkbox" checked={check["stays"]} onClick={()=>checker("stays")} /> */}
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
                    {/* <input type="checkbox" checked={check["flight"]} onClick={()=>checker("stays")}  /> */}
                    Flights
                  </NavLink>

                  <div
                    className="navitem2"
                    style={{
                      display: "flex ",
                      marginLeft: "35px",
                      width: "225px",
                    }}
                  >
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
                      <FontAwesomeIcon icon={faCar} className="nav-bar" />
                      <h1
                        style={{
                          width: "80px",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                        className="nav-bar"
                      >
                        {/* <input type="checkbox" checked={check["car"]} onClick={()=>checker("stays")}  /> */}
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
                      <FontAwesomeIcon icon={faTaxi} className="nav-bar" />
                      <h1
                        style={{
                          width: "90px",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                        className="nav-bar"
                      >
                        {/* <input type="checkbox" value={check["taxi"]} onClick={()=>checker("stays")}  /> */}
                        Airport taxis
                      </h1>
                    </NavLink>
                    <NavLink
                      to="/history"
                      className="nav-bar"
                      id="activebutton"
                      style={{
                        display: "flex ",
                        width: "225px",
                        marginLeft: "35px",
                      }}
                    >
                      Mytrip
                    </NavLink>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

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
