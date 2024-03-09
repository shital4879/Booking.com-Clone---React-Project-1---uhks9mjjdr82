import React, { useState } from "react";
import "./flightPayment.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const params = useParams();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [popUpPay, setPopUpPay] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [flightprice, setFlightprice] = useState(location.state.flightPrice);
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [toggle, setToggle] = useState();
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
    if (name.length == 0) {
      isValid = true;
      validationError.name = "name is required";
    }
    if (cardNumber.length == 0) {
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
      console.log("jjjjjjjjjj");
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
            <h3 style={{ margin: "4px 0px 0px 180px",display:"flex",justifyContent:"end" }}>
              INR{params.fid}
            </h3>
          </div>
          <p style={{ color: "gray", marginBottom: "30px", marginTop: "5px" }}>
            Includes taxes and charges
          </p>
          <p style={{ marginTop: "30px" }}>No hidden fees</p>
        </div>
      </div>
      {!toggle && (
      <form onSubmit={handleSubmit}>
        <div className="paymentMethod">
          <div className="flightPay">
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
              Your payment
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                margin: "10x 0px 20px ",
                color: "gray",
              }}
            >
              Simple, safe and secure.
            </p>
            <h3 style={{ fontWeight: "500", marginBottom: "5px" }}>How would you like to pay?</h3>
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
                  setError((prev) => {
                    return { ...prev, name: "" };
                  });
                }}
                style={{ marginBottom: "30px" }}
              />
              {valid ? <div className="nameZone">{error.name}</div> : <></>}
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
                    style={{ border: "none", outline: "none",height:"30px",marginLeft:"10px" }}
                    // value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                      setError((prev) => {
                        return { ...prev, cardNumber: "" };
                      });
                    }}
                  />
                  </div>
                  {valid ? (
                    <div className="cardZone1">{error.cardNumber}</div>
                  ) : (
                    <></>
                  )}
              
              
            </div>
            <div style={{ marginTop: "35px" }}>
              <label>
                Expiry Date{" "}
                <span style={{ color: "red", marginRight: "160px" }}>*</span>
              </label>
              <label>
                CVC <span style={{ color: "red" }}>*</span>
              </label>
              <br />

              <input
                type="text"
                placeholder="MM/YY"
                className="expinput"
                onChange={(e) => {
                  setExp(e.target.value);
                  setError((prev) => {
                    return { ...prev, exp: "" };
                  });
                }}
              />

              <input
                type="text"
                className="expinput"
                // maxLength={4}
                value={cvc}
                onChange={(e) => {
                  setCvc(e.target.value);
                  setError((prev) => {
                    return { ...prev, cvc: "" };
                  });
                }}
              />
              <br />
              {/* {!isValid && <p style={{ color: 'red' }}>Invalid expiry date</p>} */}

              {valid ? <span className="expZone1">{error.exp}</span> : <></>}
              {valid ? <span className="cvcZone1">{error.cvc}</span> : <></>}
            </div>
          </div>
        </div>
        <button
          className="backBtn"
          // onClick={() => {
          //   handlepaybtn;
          // }}
        >
          Pay Now
        </button>
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
