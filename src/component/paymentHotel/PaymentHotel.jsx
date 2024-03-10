import { useState } from "react";
import React from "react";
import "./paymentHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCreditCard,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SignOut from "../register/SignOut";

const PaymentHotel = () => {
  const navigat = useNavigate();
  const location = useLocation();
  const params = useParams();
 
  console.log(params.cost);
  console.log(params.inputval);
  const inputval = location.state.inputval;
  const data = location.state.data;
  const hotelPrice = location.state.hotelPrice;
  const totalguest = location.state.totalguest;
  console.log("mm", hotelPrice);
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
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const handleSubmit = (e) => {
    let isValid = false;
    let validationError = {};
    e.preventDefault();
    if (email.length == 0) {
      isValid = true;
      validationError.email = "email is required";
    }
    if (number.length == 0) {
      isValid = true;
      validationError.number = "number is required";
    }
    else if(number.length < 10 && number.length >10){
      isValid = true;
      validationError.number = "10 digit number is required";
    }
    if (name.length == 0) {
      isValid = true;
      validationError.name="name is required";
    }
if(cardNumber.length == 0) {
      isValid = true;
      validationError.cardNumber = "number is required";
    } else if (cardNumber.length < 16 && cardNumber > 16) {
      isValid = true;
      validationError.cardNumber = "Valid 16-digit card number";
    }
    if (cvc.length == 0) {
      isValid = true;
      validationError.cvc = "CVC is required";
    } else if (cvc.length == 4 && cvc.length == 3) {
      isValid = true;
      validationError.cvc = "Valid 3-4 digit card number";
    }
    if (exp.length == 0) {
      isValid = true;
      validationError.exp = "Expiry date is required";
    } 
    // else if (exp.length == 4 || exp.length == 3) {
    //   isValid = true;
    //   validationError.exp = "Valid 3-4 digit card number";
    // }
    setvalid(isValid);
    setError(validationError);

    if (!isValid) {
      setPopUpPay(!popUpPay);
    }
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



  const [expiryDate, setExpiryDate] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleExpiryDateChange = (event) => {
    const inputDate = event.target.value;

    const isValidDate = validateExpiryDate(inputDate);
    setIsValid(isValidDate);
    setExpiryDate(inputDate);
  };

  const validateExpiryDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
  };

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo" style={{ backgroundColor: "#003580" }}>
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
              <div className="profile">
                <div
                  style={{ height: "20px", width: "20px" }}
                  onClick={() => setOpenSing(!openSign)}
                ></div>
                {openSign && <SignOut />}
              </div>
            )}
          </div>
        </div>
      </div>
      {!toggle && (
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "30px 190px 50px 190px" }}>
            <div className="paymentpage1">
              <div className="hotelset1">
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
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
                  onChange={(e) => {setEmail(e.target.value)
                    setError(prev =>{
                      return{...prev,email:""}
                    })
                  }}
                  style={{
                    height: "35px",
                    width: "300px",
                    marginBottom: "30px",
                    marginTop: "8px",
                    fontSize: "18px",
                  }}
                />
                {valid ? (
                  <div className="emailZone1">{error.email}</div>
                ) : (
                  <></>
                )}

                <br />
                <label>
                  Phone number{" "}
                  <span style={{ color: "red", marginRight: "5px" }}>*</span>
                </label>
                <br />
                <input
                  type="number"
                  minLength="10"
                  style={{
                    height: "35px",
                    width: "300px",
                    marginBottom: "30px",
                    fontSize: "16px",
                    paddingLeft: "10px",
                  }}
                  placeholder="+91"
                  onChange={(e) => {setNumber(e.target.value)
                    setError(prev =>{
                      return{...prev,number:""}
                    })
                  
                  }}
                />
                {valid ? (
                  <div className="numberZone2">{error.number}</div>
                ) : (
                  <></>
                )}
              </div>
              <div className="hotelset2" >
                <div style={{ display: "flex"}}>
                  <h2 style={{marginRight:"160px"}}>Total{hotelPrice}</h2>
                  <h2 style={{marginLeft:"-5px"}}>INR {inputval*params.cost}</h2>
                </div>
                {/* <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  Taxes and charges
                </h5>
                <h2 style={{ marginTop: "40px", }}>Total</h2>
                <span>INR{params.cost}</span> */}
                <p style={{ marginBottom: "15px",marginRight:"180px", margin:"15px 10px 10px 0px"}}>
                  Includes taxes and charges
                </p>
                <p>No hidden fees - track your price at every step</p>
              </div>
            </div>
            <div className="paymentMethodHotel">
              <div className="flightPay">
                <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
                  Your payment
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    margin: "10px 0px 20px ",
                    color: "gray",
                  }}
                >
                  Simple, safe and secure.
                </p>
                <h3 style={{ fontWeight: "500", marginBottom: "5px" }}>
                  How would you like to pay?
                </h3>
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
                  <input
                    type="text"
                    name="name"
                    className="inputdata"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(prev =>{
                        return{...prev,name:""}
                      })
                    }}
                    style={{ marginBottom: "30px" }}
                  />
                  {valid ? (
                    <div className="nameZone">{error.name}</div>
                  ) : (
                    <></>
                  )}
                  <br />

                  <label className="labeldata">
                    Card Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <div className="carddetail">
                    <FontAwesomeIcon icon={faCreditCard} />
                    <input
                      type="number"
                      name="name"
                      style={{ border: "none", outline: "none" }}
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value)
                        setError(prev =>{
                          return{...prev,cardNumber:""}
                        })
                      }}
                    /></div>
                    <br />
                    {valid ? (
                      <div className="cardZone">{error.cardNumber}</div>
                    ) : (
                      <></>
                    )}
                  
                </div>
                <div style={{ marginTop: "-8px" }}>
                  <label>
                    Expiry Date{" "}
                    <span style={{ color: "red", marginRight: "160px" }}>
                      *
                    </span>
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
                    onChange={(e) => {
                      setExp(e.target.value)
                    
                    setError(prev =>{
                      return{...prev,exp:""}
                    })
                    }}
                    // onChange={handleExpiryDateChange}
                  />
                

                  <input
                    type="text"
                    className="expinput"
                    // maxLength={4}
                    value={cvc}
                    onChange={(e) => {
                      setCvc(e.target.value)
                      setError(prev =>{
                        return{...prev,cvc:""}
                      })
                    
                    }}
                  />
                  <br />

                  {/* <br/> */}
                  {!isValid && <p style={{ color: 'red' }}>Invalid expiry date</p>}

                  {valid ? <span className="expZone">{error.exp}</span> : <></>}
                  {valid ? <span className="cvcZone">{error.cvc}</span> : <></>}
                </div>
              </div>
            </div>
            <button
              className="backBtn"
              style={{marginLeft:"550px"}}
              // onClick={() => setPopUpPay(!popUpPay)}
            >
              Pay Now
            </button>
          </div>
        </form>
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
            <p style={{ marginTop: "75px", fontSize: "18px" }}>{action}</p>
            <div>
              <button
                className="pay-Btn"
                onClick={handlepaybtn}
              >
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

export default PaymentHotel;
