import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../components/App";
import { format } from "date-fns";

export default function Paymentlastpage() {
  const navigat = useNavigate();
  const location = useLocation();
  const{todate, setTodate, setFormdate, formdate,hotelinformation} = useContext(MyContext);
  console.log(hotelinformation);
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
  console.log(sessionStorage.getItem("cost"));

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
      setPopUpPay(!popUpPay);
      // setAction("Booking successful!"), setStatus("Enjoy your journey");
      setTimeout(() => {
        navigat(`/`);
      }, 3000);
    }
  };
  const storeddata = JSON.parse(localStorage.getItem("UserInfo"));

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEE MMM dd yyyy");
  };


  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo" style={{ backgroundColor: "#003580" , cursor: "pointer"}} onClick={()=>navigat("/")}>
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
      
        <div style={{ width: "50%" }}>
              {hotelinformation && (
                <div className="infobox1">
                  <div>
                    Hotel &nbsp; &nbsp;{" "}
                    <span className="ratingbox">{hotelinformation.rating}</span>
                  </div>
                  <h2 className="infoname">{hotelinformation.name}</h2>
                  <div className="infolocation">{hotelinformation.location}</div>
                  <div className="infoam">
                    {/* {hotelinformation.amenities[0]},{hotelinformation.amenities[1]} */}
                  </div>
                </div>
              )}

              <div className="infobox2" style={{marginTop:'30px'}}>
                <h3>Your booking details</h3>
                <div className="boxes2">
                  <div className="" style={{borderRight:"2px solid rgb(166, 157, 157)",paddingRight:"30px"}}>
                    <p style={{fontSize:"15px",color:"rgb(61, 59, 59)",fontWeight:"500"}}>Check-in</p>
                    <div style={{fontWeight:"500",fontSize:"17px",marginTop:"6px",marginBottom:"2px"}}>{formatDate(formdate)}</div>
                    <p style={{fontSize:"14px",color:"rgb(88, 86, 86)"}}>From 15:00</p>
                  </div>
                  <div>
                    <p style={{fontSize:"15px",color:"rgb(61, 59, 59)",fontWeight:"500"}}>Check-out</p>
                    <div style={{fontWeight:"500",fontSize:"17px",marginTop:"6px",marginBottom:"2px"}} >{formatDate(todate)}</div>
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
                  <h2>{sessionStorage.getItem("cost")}</h2>
                  
                </div>
                <h4>Price information</h4>
                <p style={{fontSize:"15px"}}>Excludes ₹ 4,761 in taxes and charges</p>

              </div>

            
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
