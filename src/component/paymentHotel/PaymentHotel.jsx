import { useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import "./paymentHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCreditCard,
  faL,
  faCheck,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'; 
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import SignOut from "../register/SignOut";
import { MyContext } from "../../components/App";

const PaymentHotel = () => {
  const { todate, setTodate, setFormdate, formdate,hotelinformation,setHotelinformation,myname } = useContext(MyContext);
  const navigat = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [popUpPay, setPopUpPay] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [toggle, setToggle] = useState();

  const [cvc, setCvc] = useState("");

  const handleInputChange = (e) => {
    const newCvc = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(newCvc);
  };

  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, "");
    if (inputNumber.length <= 16) {
      setCardNumber(inputNumber);
    } else if (inputNumber === "") {
      setCardNumber(inputNumber);
    }
  };
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [inputval,setinputval] = useState(location.state.inputval);
  console.log(inputval);
  const [information, setInformation] = useState(location.state.information);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [isValid, setIsValid] = useState(true);

  const fetchHotelState = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${params.id}`,
        {
          method: "GET",
          headers: { projectID: "uhks9mjjdr82" },
          "Content-Type": "application/json",
        }
      );
      const result = await responce.json();
      setFetchingData(result.data.hotels);
      console.log("city", result.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHotelState();
  }, []);

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
      validationError.email = "Invalid email";
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
      if (localStorage.getItem("hotelid")) {
        bookingConfirmation(
          localStorage.getItem("hotelid"),
          formdate,
          todate,
          localStorage.getItem("token")
        );
      }
      setHotelinformation(information)
      sessionStorage.setItem("cost",multiplicationResult);
      navigatelastpage();
      // navigat(`/paymentlastpage`);
      // setPopUpPay(!popUpPay);
      // // setAction("Booking successful!"), setStatus("Enjoy your journey");
      // setTimeout(() => {
      //   navigat(`/`);
      // }, 3000);
    }
  };
  const navigatelastpage=()=>{
navigat(`/paymentlastpage`,{
  state:{
    selectedDate: selectedDate,
    information : information,
  }
})
  }

  const [openSign, setOpenSing] = useState(false);
  const navigate = useNavigate();

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };
  const [action, setAction] = useState();
  const [status, setStatus] = useState();
  const handlepaybtn = () => {
    setAction("Booking successful!"), setStatus("Enjoy your journey");
    setTimeout(() => {
      navigat(`/`);
    }, 3000);
  };

  const today = new Date().toISOString().split("T")[0];

  const bookingConfirmation = async (id, date, enddate, token) => {
    console.log(id, date, enddate, token);
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectID: "uhks9mjjdr82",
          },
          body: JSON.stringify({
            bookingType: "hotel",
            bookingDetails: {
              hotelId: id,
              startDate: date,
              endDate: enddate,
            },
          }),
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      console.log("booking confirmation result: ", result);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  // const storeddata = JSON.parse(localStorage.getItem("UserInfoo"));

  useEffect(() => {
    setFormdate(selectedDate[0].startDate);
    setTodate(selectedDate[0].endDate);
    localStorage.setItem("hotelid", params.id);
  }, []);
  console.log(formdate, "form");
  console.log(todate, "too");
  console.log(selectedDate);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // return format(date, "EEE MMM dd yyyy");
    console.log(format(date, "EEE MMM dd yyyy"));
  };

  const cost = parseFloat(params.cost);
  const inputValue = parseFloat(inputval);
  const multiplicationResult = cost * inputValue;

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span
            className="logo"
            style={{ backgroundColor: "#003580", cursor: "pointer" }}
            onClick={() => navigat("/")}
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
                <div style={{ width: "180px", display: "flex",marginLeft:"200px"}}></div>
                <div
                  className="profile"
                  style={{ marginLeft: "290px" }}
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
      {!toggle && (
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
            <p style={{ marginRight: "10px" }}>Your selection</p>
            <div className="line"></div>
            <div className="circlefornum">2</div>
            <p style={{ marginRight: "10px" }}>Your details</p>
            <div className="line"></div>
            <div className="circlefornum1">3</div>
            <p>Final step</p>
          </div>

          <div style={{ display: "flex" }} className="maincontent">
            <div style={{ width: "100%" }}>
              {information && (
                <div className="infobox1">
                  <div>
                    Hotel &nbsp; &nbsp;{" "}
                    <span className="ratingbox">{information.rating}</span>
                  </div>
                  <h2 className="infoname">{information.name}</h2>
                  <div className="infolocation">{information.location}</div>
                  <div className="infoam">
                    {information.amenities[0]},{information.amenities[1]}
                  </div>
                </div>
              )}

              <div className="infobox2" style={{marginTop:'30px'}}>
                <h3>Your booking details</h3>
                <div className="boxes2">
                  <div className="" style={{borderRight:"2px solid rgb(166, 157, 157)",paddingRight:"30px"}}>
                    <p style={{fontSize:"15px",color:"rgb(61, 59, 59)",fontWeight:"500"}}>Check-in</p>
                    <div style={{fontWeight:"500",fontSize:"17px",marginTop:"6px",marginBottom:"2px",marginRight:"30px"}}>{moment(formdate).format("ddd DD MMM")}</div>
                    <p style={{fontSize:"14px",color:"rgb(88, 86, 86)"}}>From 15:00</p>
                  </div>
                  <div>
                    <p style={{fontSize:"15px",color:"rgb(61, 59, 59)",fontWeight:"500"}}>Check-out</p>
                    <div style={{fontWeight:"500",fontSize:"17px",marginTop:"6px",marginBottom:"2px"}} >{moment(todate).format("ddd DD MMM")}</div>
                    <p style={{fontSize:"14px",color:"rgb(88, 86, 86)"}}>Until 12:00</p>
                    
                  </div>
                </div>
              <p style={{marginBottom:"2px",marginTop:"20px"}} >Total length of stay:</p>
              <p style={{fontWeight:"500"}}>1 night</p>
              </div>

              <div className="infobox3" style={{marginTop:"30px"}}>
                <h3 style={{marginBottom:"15px"}}>Your price summary</h3>
                <div style={{display:"flex"}} className="pricetotal">
                  <h2>Price</h2>
                  <h2>{multiplicationResult}</h2>
                  
                </div>
                <h4>Price information</h4>
                <p style={{fontSize:"15px"}}>Excludes ₹ 4,761 in taxes and charges</p>

              </div>

            </div>

            <div>
              <div className="content2">
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

              <div className="content3">
                <h2 className="" style={{ marginBottom: "5px" }}>
                  Your arrival time
                </h2>
                <div className="" style={{ display: "flex", width: "100%" }}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ margin: "8px 10px 20px 0" }}
                  />
                  <p>Your room will be ready for check-in at 15:00</p>
                </div>
                <div
                  style={{ display: "flex", width: "100%", marginTop: "-10px" }}
                >
                  <FontAwesomeIcon
                    icon={faMugSaucer}
                    style={{ margin: "8 10px 20px 0" }}
                  />
                  <p>24-hour front desk – Help whenever you need it!</p>
                </div>
              </div>

              <div className="content3">
                <h2 className="" style={{ marginBottom: "5px" }}>
                  Cots and extra beds
                </h2>
                <ul>
                  <li>Requests are subject to availability</li>
                  <li>Requests must be confirmed by the property</li>
                  <li>Requests not labelled 'Free' may incur extra charges</li>
                </ul>
              </div>

              <div className="content4">
                <h3>Special requests</h3>
                <p>Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can always make a special request after your booking is complete!</p>
              </div>

              <button className="step2" onClick={handleSubmit}>
                Next: Final details
              </button>
            </div>
          </div>
        </div>
      )}
      {popUpPay && (
        <div className="flightinfo">
          <div
            className="payPage"
            style={{
              height: "300px",
              width: "300px",
              marginTop: "50px",
              border: "2px solid gray",
              borderRadius: "15px",
            }}
          >
            {/* <p style={{ marginTop: "75px", fontSize: "18px" }}>{action}</p> */}
            <div>

            <p style={{ fontSize: "60px",color:"green" }}><FontAwesomeIcon icon="faThumbsUp" /></p>
              <p
                style={{
                  marginTop: "75px",
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Booking successful!
              </p>

              <p style={{ marginTop: "20px", fontSize: "20px" }}>
                {"Enjoy your journey"}
              </p>
              
              {/* <p style={{ marginTop: "10px", fontSize: "16px" }}>{status}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHotel;
