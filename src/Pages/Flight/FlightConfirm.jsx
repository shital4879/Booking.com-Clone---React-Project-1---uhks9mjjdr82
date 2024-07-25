import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./flightconfirm.css";
import FlightInfo from "./FlightInfo";
import SignOut from "../../component/register/SignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMugSaucer,
  faX
} from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../components/App";
import { format } from "date-fns";
import ClearIcon from '@mui/icons-material/Clear';

const FlightConfirm = () => {
  const params = useParams();
  console.log(params.fid, "kt");
  const location = useLocation();
  const [emailId, setEmailId] = useState();
  const {flightinformation,setFlightinformation,myname} = useContext(MyContext);
  console.log(flightinformation,"info");
  const flightPrice = location.state.flightPrice;
  console.log("mi", flightPrice);
  const navigation = useNavigate();
  const data = location.state;
  const fid = location.state;
  const [openSign, setOpenSing] = useState(false);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [information, setInformation] = useState(location.state.information);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [opendetails,setOpendetails] = useState(false);

  const handleSubmit = (e) => {
    let isValid = false;
    let validationError = {};
    e.preventDefault();
    if (email.length == 0) {
      isValid = true;
      validationError.email = "email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = true;
      validationError.email = "email is required";
    }
    if (number.length == 0) {
      isValid = true;
      validationError.number = "number is required";
    } else if (number.length < 10) {
      isValid = true;
      validationError.number = "10 digit number is required";
    } else if (number.length > 10) {
      isValid = true;
      validationError.number = "10 digit number is required";
    }
    if (name.length == 0) {
      isValid = true;
      validationError.name = "name is required";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      isValid = true;
      validationError.name = " valid name is required";
    }
    if (lastname.length == 0) {
      isValid = true;
      validationError.lastname = "Lastname is required";
    } else if (!/^[a-zA-Z ]+$/.test(lastname)) {
      isValid = true;
      validationError.lastname = " valid Lastname is required";
    }
    setvalid(isValid);
    setError(validationError);

    if (!isValid) {
      sessionStorage.setItem("fid",params.fid);
     setFlightinformation(location.state);
     navigate("/flightPayment")
     
    }
  };

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };
  const [high,setHigh] = useState(location.state)
  console.log("checkf", high);
  const handlebackbtn = () => {
    navigation(`/flightsearch`),
      {
        state: {
          data: location.state.data,
          destination: location.state.destination,
          flightPrice: location.state.flightPrice,
          source: location.state.source,
          selectedDate: location.state.selectedDate,
          people: location.state.people,
        },
      };
  };
  console.log(flightPrice, "lolo");
  const flightPayment = (fid) => {
    navigation(`/flightPayment/${fid}`, {
      state: {
        flightPrice: flightPrice,
      },
    });
  };
  const handlesubmitclick = (e) => {
    e.preventDefault();
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEE MMM dd yyyy");
  };

  const storeddata = JSON.parse(localStorage.getItem("UserInfoo"));

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span
            className="logo"
            id="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Booking.com
          </span>
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
                  style={{ marginLeft: "250px" }}
                  onClick={(e) => {
                    e.stopPropagation(), setOpenSing(!openSign);
                  }}
                >
                  {/* {storeddata.name.charAt(0).toUpperCase()} */}
                  {myname.charAt(0).toUpperCase()}

                  {openSign && <SignOut />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
      <div>
          <div
            className="paymentline"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FontAwesomeIcon icon={faCheck} className="circlefornum" />
            <p style={{ marginRight: "10px" }}>Ticket type</p>
            <div className="line"></div>
            <div className="circlefornum">2</div>
            <p style={{ marginRight: "10px" }}>Who's flying?</p>
            <div className="line"></div>
            <div className="circlefornum1">3</div>
            <p>Check and pay</p>
          </div>

          <div style={{ display: "flex" }} className="maincontent">
         

            <div>
              <div className="content2" style={{marginLeft:"-10px"}}>
                <form>
                  <h2 style={{ marginBottom: "10px" }}>Enter your details</h2>
                  <div>
                    <label className="labelforname">First name *</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      // id="cardhold"
                      value={name}
                      className="inputdataofname"
                      onChange={(e) => {
                        setName(e.target.value);
                        setError((prev) => {
                          return { ...prev, name: "" };
                        });
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[0-9]/g, "");
                      }}
                    />
                    {valid ? (
                      <div className="nameZone">{error.name}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label className="labelforname">Last name *</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      // id="cardhold"
                      value={lastname}
                      className="inputdataofname"
                      onChange={(e) => {
                        setLastname(e.target.value);
                        setError((prev) => {
                          return { ...prev, lastname: "" };
                        });
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[0-9]/g, "");
                      }}
                    />
                    {valid ? (
                      <div className="nameZone">{error.lastname}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label className="labelforname">Email address *</label>
                    <br />
                    <input
                      type="email"
                      className="inputdataofname"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError((prev) => {
                          return { ...prev, email: "" };
                        });
                      }}
                    />
                    {valid ? (
                      <div className="emailZone1">{error.email}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label className="labelforname">Phone number *</label>
                    <br />
                    <input
                      className="inputdataofname"
                      type="text"
                      maxLength="10"
                      // required
                      value={number}
                      placeholder="+91"
                      onChange={(e) => {
                        setNumber(e.target.value);
                        setError((prev) => {
                          return { ...prev, number: "" };
                        });
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                    {valid ? (
                      <div className="numberZone2">{error.number}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </div>
              <button className="step2" onClick={handleSubmit} style={{marginBottom:"60px"}}>
                Next: Final details
              </button>
            </div>

               <div style={{ width: "100%",marginLeft:"40px",marginRight:"-35px" }}>
              <div className="infobox1">
                <h2>{high.destination} to {high.source}</h2>
                <p>Round trip</p>
                {/* <p>{high.selectedDate.startDate}</p> */}
              </div>
              <div className="infobox3" style={{marginTop:"30px"}}>
                <h3 style={{marginBottom:"15px"}}>Your price summary</h3>
                <p>Total</p>
                <div style={{display:"flex"}} className="pricetotal">
                  <h2>Price</h2>
                  <h2>{params.fid}</h2>
                  
                </div>
                <h4 style={{marginTop:"30px"}}>Price information</h4>
                <button style={{marginTop:"5px",borderRadius:"10px" ,fontSize:"14px",border:"1px solid blue" ,padding:"10px 15px",color:"blue",}} onClick={()=>setOpendetails(true)}>View price details</button>

                {opendetails &&
                  <div className="detailingprice">

                    <div className="open">
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                       <h3>Price details</h3>
                       {/* <ClearIcon/> */}
                       <FontAwesomeIcon icon={faX} onClick={()=>setOpendetails(false)}  />
                       </div>
                       <p style={{fontSize:"14px"}}>No hidden fees – track your price at every step</p>
                       <div className="" style={{marginTop:"15px",border:"1px solid rgb(239, 235, 235)",borderRadius:"5px",paddingBottom:"15px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"rgb(239, 235, 235",padding:"12px 7px",borderTopLeftRadius:"5px",borderTopRightRadius:"5px"}}>
                        <h4>Tickets</h4>
                        <h4>INR &nbsp; {params.fid}</h4>
                        </div>
                        <div style={{marginTop:"7px",display:"flex",justifyContent:"space-between",padding:"12px 7px 0px 12px"}}>
                          <h5>Price per adult</h5>
                          <h5>INR &nbsp; {params.fid}</h5>
                        </div>
                        <div style={{marginTop:"5px",display:"flex",justifyContent:"space-between",padding:"1px 7px 0 12px"}}>
                          <h5>Air India Express taxes and charges</h5>
                          <h5>INR &nbsp; 1869.00</h5>
                        </div>
                       </div>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",marginTop:"20px"}}>
                          <p style={{fontSize:"14px",color:"rgb(109, 105, 105)"}}>Total (includes taxes, charges and fees)</p>
                          <h2>INR &nbsp; {params.fid}</h2>
                        </div>
                    </div>
                  </div>
                }

              </div>

            </div>


          </div>
        </div>


    </div>
  );
};

export default FlightConfirm;
