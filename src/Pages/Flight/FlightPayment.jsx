import React, { useState } from "react";
import "./flightPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCreditCard,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import SignOut from "../../component/register/SignOut";
// import hi from "../Images/hi";

const FlightPayment = () => {
  const navigat = useNavigate();
  const location = useLocation();
 
  const [popUpPay, setPopUpPay] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [flightprice, setFlightprice] = useState(location.state.flightPrice);
  console.log("ol",flightprice);
  // const flightprice = location.state.flightprice;

  console.log("yes", flightprice);

  console.log(emailId);
  const [emailId, setEmailId] = useState(location.state.email);
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
    }
  };
  const [isvalid, setIsvalid] = useState(true);
  const [exDate, setExDate] = useState();
  const handleExDate = (e) => {
    const expirydate = e.target.value;

    const currentdate = new Date();
    const entereddate = new Date(exDate);
    let valid = true;
    if (entereddate >= currentdate) {
      setExDate(expirydate);
      valid = false;
    }
    setIsvalid(valid);
  };

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
    setAction("Payment successful!"), setStatus("Enjoy your journey");
    setTimeout(() => {
      navigat(`/`);
    }, 3000);
  };

  const[valid,setValid] = useState(true);
  const[error,setError] = useState({})
  const[registerData,setRegisterData] = useState({
    email:"",
    password:""
  })
  const handleSubmit = (e) =>{
    e.preventDefault();
    let isValid = true;
    let validationError = {};
    if(registerData.email === "" || registerData.email === null){
      isValid = false;
      validationError.email= "Email is required!"
    }
    else if(!/\S+@\S+\.\S+/.test(registerData.email)){
     isValid=false;
     validationError.email= "Invalid EmailId!"
    }
    setValid(isValid);
    setError(validationError);
  }

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
              <div
                className="profile"
                onClick={(e) => {
                  e.stopPropagation(), setOpenSing(!openSign);
                }}
              >
                {openSign && <SignOut />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bag-payment">
        <div className="boggage-details">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Baggage</h2>
          <h5
            style={{
              fontSize: "16px",
              fontWeight: "400",
              margin: "5px 0px 10px ",
              color: "gray",
            }}
          >
            Total number of bags included for all travellers
          </h5>
          <div className="bag-Cat">
            <FontAwesomeIcon icon={faBriefcase} style={{ marginTop: "5px" }} />
            <p>1 personal item Fits under the seat in front of you</p>
          </div>
          <div className="bag-Cat">
            <FontAwesomeIcon
              icon={faSuitcaseRolling}
              style={{ marginTop: "10px" }}
            />
            <p>1 cabin bag 25 x 35 x 55 cm · Max weight 8 kg</p>
          </div>
          <div className="bag-Cat">
            <FontAwesomeIcon
              icon={faSuitcaseRolling}
              style={{ marginTop: "10px" }}
            />
            <p style={{ width: "200px" }}>1 checked bag Max weight 20 kg</p>
          </div>
        </div>
        <div className="paymentdetailing">
          <div style={{ display: "flex" }}>
            <h2>Total</h2>
            <h3 style={{ margin: "4px 0px 0px 150px" }}>
              INR{flightprice.toFixed(2)}
            </h3>
          </div>
          <p style={{ color: "gray", marginBottom: "30px", marginTop: "5px" }}>
            Includes taxes and charges
          </p>
          <p style={{ marginTop: "30px" }}>No hidden fees</p>
        </div>
      </div>
      <div className="paymentMethod">
        <div className="flightPay">
          <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Your payment</h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              margin: "10x 0px 10px ",
              color: "gray",
            }}
          >
            Simple, safe and secure.
          </p>
          <h3 style={{ fontWeight: "500" }}>How would you like to pay?</h3>
          <div className="pay-img">
            <img
              src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg"
              className="payImg"
            />
            <img
              src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg"
              className="payImg"
            />
            <img
              src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg"
              className="payImg"
            />
            <img
              src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg"
              className="payImg"
            />
          </div>
          <div>
            <label className="labeldata">
              Cardholder's Name <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="text" name="name" className="inputdata" />
            <br />

            <label className="labeldata">
              Card Number <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <div className="carddetail">
              <FontAwesomeIcon icon={faCreditCard} />
              <form>
              <input
                type="text"
                name="name"
                style={{ border: "none", outline: "none" }}
                value={cardNumber}
                onChange={handleCardNumberChange}
              />

              {cardNumber.length === 16 ? (
                <span style={{ color: "green" }} className="cardData">
                  Valid 16-digit card number
                </span>
              ) : (
                <span style={{ color: "red" }}></span>
              )}
              </form>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>
              Expiry Date{" "}
              <span style={{ color: "red", marginRight: "160px" }}>*</span>
            </label>
            <label>
              CVC <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            {!isvalid ? <p>Please enter a valid expiry date</p> : <></>}
            <input
              type="text"
              placeholder="MM/YY"
              className="expinput"
              value={exDate}
              onChange={handleExDate}
            />

            <input
              type="text"
              className="expinput"
              // maxLength={4}
              value={cvc}
              onChange={handleInputChange}
            />

            {cvc.length === 4 ? (
              <span style={{ color: "green" }} className="cvcdata">
                Valid 4-digit numbar
              </span>
            ) : (
              <span style={{ color: "red" }}></span>
            )}
          </div>
        </div>
      </div>
      <button
        className="backBtn"
        onClick={() => {
          setPopUpPay(!popUpPay), handlepaybtn;
        }}
      >
        Pay Now
      </button>
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
            <p style={{ marginTop: "75px", fontSize: "18px" }}>{action}</p>
            <div>
              <button className="pay-Btn" onClick={handlepaybtn}>
                Done
              </button>
              <p style={{ marginTop: "10px", fontSize: "16px" }}>{status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPayment;
