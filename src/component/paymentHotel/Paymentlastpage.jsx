import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Paymentlastpage() {
  const navigat = useNavigate();
  const[select,setSelect] = useState("");
  const [openSign, setOpenSing] = useState(false);
  const [popUpPay, setPopUpPay] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    let isValid = false;
    let validationError = {};
    e.preventDefault();
    if (name.length == 0) {
      isValid = true;
      validationError.name = "name is required";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      isValid = true;
      validationError.name = " valid name is required";
    }
    if (cardNumber.length == 0) {
        isValid = true;
        validationError.cardNumber = "number is required";
      } else if (cardNumber.length < 16) {
        isValid = true;
        validationError.cardNumber = "Valid 16-digit card number";
      }
      else if (cardNumber.length > 16) {
        isValid = true;
        validationError.cardNumber = "Valid 16-digit card number";
      }
      if (cvc.length == 0) {
        isValid = true;
        validationError.cvc = "CVC is required";
      } else if (!/^[0-9]{3}$/.test(cvc)) {
        isValid = true;
        validationError.cvc = "Valid 3 digit card number";
      }
      if (exp.length == "") {
        isValid = true;
        validationError.exp = "Expiry date is required";
      } 
      else if( /^(\d{2})\/(\d{2})\/(\d{4})$/.test(exp)) {
        isValid = true;
        validationError.exp = "Please enter a valid expiry date";
      }
      if (select == "") {
        isValid = true;
        validationError.select = "Select Payment Method";
      } 
    setvalid(isValid);
    setError(validationError);

    if (!isValid) {
    //   navigat(`/paymentlastpage`);
      setPopUpPay(!popUpPay);
      // setAction("Booking successful!"), setStatus("Enjoy your journey");
      setTimeout(() => {
        navigat(`/`);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo" style={{ backgroundColor: "#003580" }} onClick={()=>navigat("/")}>
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
        <div className="circlefornum">3</div>
        <p>Final step</p>
      </div>

      <div className="lastpagecon">
        <div style={{ width: "40%" }}>
          <h2>Your booking details</h2>
        </div>
        <div className="lastpagecon2">
          <h2>How do you want to pay?</h2>
          <div>
            <label>Cardholder's name *</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              className="dataname"
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
            {valid ? <div className="errorname">{error.name}</div> : <></>}
          </div>

          <div>
            <label>Card type *</label>
            <br />
            <select name="" id="" className="dataname" value={select} onChange={(e)=>{setSelect(e.target.value)}} >
                <option value="">-- Select --</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Visa">Visa</option>
              <option value="Discover">Discover</option>
              <option value="JCB">JCB</option>
            </select>
            {valid ? (
                      <div className="errorname">{error.select}</div>
                    ) : (
                      <></>
                    )}
          </div>

          <div>
            <label htmlFor="">Card number *</label>
            <br />
            <input
              type="text"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[a-z]/g, "");
              }}
              name="name"
              // style={{ border: "none", outline: "none" }}
              maxLength="16"
              className="dataname"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(e.target.value);
                setError((prev) => {
                  return { ...prev, cardNumber: "" };
                });
              }}
            />
               {valid ? (
                      <div className="errorname">{error.cardNumber}</div>
                    ) : (
                      <></>
                    )}
          </div>

          <div>
            <label htmlFor="">Expiry date *</label>
            <br />
            <input
              type="date"
              className="dataname"
              placeholder="MM/YY"
              min={today}
              value={exp}
              onChange={(e) => {
                setExp(e.target.value);

                setError((prev) => {
                  return { ...prev, exp: "" };
                });
              }}
            />
              <br />
                      {valid ? (
                        <span className="errorname">{error.exp}</span>
                      ) : (
                        <></>
                      )}
          </div>

          <div>
            <label htmlFor="">CVC *</label>
            <br />
            <input
              type="text"
              className="dataname"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[a-z]/g, "");
              }}
              maxLength="3"
              value={cvc}
              onChange={(e) => {
                setCvc(e.target.value);
                setError((prev) => {
                  return { ...prev, cvc: "" };
                });
              }}
            />
            <br />
            {valid ? <span className="errorname">{error.cvc}</span> : <></>}
          </div>
      <button onClick={handleSubmit} className="paynowbutton">Pay Now</button>
        </div>
      </div>
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
              <p style={{ fontSize: "60px" }}>👍</p>
              {/* <p style={{ marginTop: "10px", fontSize: "16px" }}>{status}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
