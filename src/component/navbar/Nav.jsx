import React, { useContext, useState } from 'react'
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
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../components/App';


const Nav = () => {
  const navigate = useNavigate();
  const {myname} = useContext(MyContext)
  const [openSign, setOpenSing] = useState(false);
    const RegisterPage = () => {
        navigate(`/Register`);
      };
      const SignInPage = () => {
        navigate(`/SignIn`);
      };
      
      const toasts = ()=>{
        // toast("Feature is coming soon.");
        toast.info('Feature is coming soon', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }

  return (
    <div>
        <div style={{ width: "100%" }}>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo"  onClick={() => navigate("/")} style={{cursor:"pointer"}}>Booking.com</span>

          <div style={{ display: "flex",marginTop:"-4px",marginLeft:"-30px" }} className="navp1">
            <button style={{}} className="circle" onClick={toasts}>
              INR
            </button>
            <button className="circle" style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
              <img
                src="https://faraz-khan-booking-com-clone-react-project-1-jza6qqtrfilv.vercel.app/images/IndiaFlag.png"
                alt=""
                style={{
                  height: "25px",
                  width: "30px",
                  borderRadius: "10%",
                  marginTop: "-4px",
                  // marginLeft:"20px",
                  
                }}
                onClick={toasts}
              />
            </button>
            <button className="circle">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "25px", width: "30px", marginTop: "-4px" }}
                onClick={toasts}
              />
            </button>
            <button className="circle1"onClick={toasts} >List Your Property</button>
          </div>

          <div className="navItems"style={{display:"flex",marginLeft:"-35px"}}>
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
                <div style={{ width: "180px", display: "flex" ,marginLeft:"10px" }}></div>
                <div
                  className="profile"
                  style={{ marginLeft: "50px" }}
                  onClick={(e) => {
                    e.stopPropagation(), setOpenSing(!openSign);
                  }}
                >
                  {myname.charAt(0).toUpperCase()}
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

    <ToastContainer 
       position="bottom-left"
       autoClose={3000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      //  transition: "Bounce"
        />
    </div>
  )
}

export default Nav
