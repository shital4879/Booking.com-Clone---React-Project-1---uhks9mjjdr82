import { useState } from "react"
import React from 'react'
import "./paymentHotel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCreditCard,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentHotel = () => {
  const navigat
  = useNavigate();
    const location = useLocation();
    const hotelPrice = location.state.hotelPrice;
    // const[hotelPrice,setHotelPrice] = useState(location.state.hotelPrice)
    console.log("mm",hotelPrice);
   const[popUpPay,setPopUpPay] = useState(false);
   const[openPopUp,setOpenPopUp] = useState(false);
  
  
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
    const[emailId,setEmailId] = useState();
   

    const handlePaybtn = ()=>{
      alert("Payment successful!");
      navigat(`/`);
    }
    const[openSign,setOpenSing] = useState(false);
  const navigate = useNavigate();

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };
  return (
    <div>
      <div className="navbar"><div className="navContainer">
          <span className="logo" style={{backgroundColor:"#003580"} }>Booking.com</span>
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
            <div className="profile">
              <div style={{height:"20px",width:"20px"}} onClick={()=>setOpenSing(!openSign)} >
              </div>
              {openSign && (
              <SignOut/>
              )}
            </div>
            }

          </div>
        </div></div>
    <div style={{margin:"50px 190px 50px 190px"}}>
      <div className="paymentpage1">
      <div className="set1">
            <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>
              Contact details
            </h2>
            <h5 style={{ fontWeight: "400", marginBottom: "20px" }}>
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
              Required
            </h5>
            <label style={{ fontSize: "15px" }}>
              Contact Email{" "}
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
            </label>
            <br />
            <input
              type="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value), e.preventDefault();
              }}
              style={{ height: "35px", width: "250px", marginBottom: "30px" }}
              required
            />
            <br />
            <label>
              Phone number{" "}
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
            </label>
            <br />
            <span>+91</span>
            <input
              type="number"
              style={{ height: "30px", width: "250px", marginBottom: "30px" }}
              required
            />
          </div>
          <div>
            <h2>Total{hotelPrice}</h2>
          <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  Taxes and charges
                </h5>
                <h2 style={{ marginTop: "40px" }}>Total</h2>
                <p style={{ marginBottom: "15px" }}>
                  Includes taxes and charges
                </p>
                <p>No hidden fees - track your price at every step</p>
              </div>
      </div>
      <div className="paymentMethodHotel">
        <div className="flightPay">
          <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Your payment</h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              margin: "15px 0px 10px ",
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
            {/* {!isvalid ? <p>Please enter a valid expiry date</p>:<></>} */}
            <input
              type="text"
              placeholder="MM/YY"
              className="expinput"
              // value={exDate}
              // onChange={handleExDate}
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
      <button className="backBtn" onClick={()=>setPopUpPay(!popUpPay)}>Pay Now</button>
      {
        popUpPay &&
        (
          <div className="flightinfo">
          <div className="payPage">

         <img src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png" alt="" style={{zIndex:"1",height:"300px",width:"300px",marginTop:"50px"}}/>
         <br/>
         <h3>Scan and pay</h3>
         <div>
         <button className="pay-Btn" onClick={handlePaybtn}>Pay</button>
         </div>
          </div>
          </div>
        )
      }
    </div>
    </div>
  )
}

export default PaymentHotel
