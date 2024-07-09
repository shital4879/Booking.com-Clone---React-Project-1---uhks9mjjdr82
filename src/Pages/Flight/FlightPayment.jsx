import React, { useContext, useState } from "react";
import "./flightPayment.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCreditCard,
  faL,
  faX
} from "@fortawesome/free-solid-svg-icons";
import SignOut from "../../component/register/SignOut";
import { MyContext } from "../../components/App";
import { faCheck, faMugSaucer } from "@fortawesome/free-solid-svg-icons";

const FlightPayment = () => {
  const navigat = useNavigate();
  const { setfendate, fstartdate, setfstartdate, fenddate } =
    useContext(MyContext);
  const { flightinformation, setFlightinformation } = useContext(MyContext);
  console.log(flightinformation);
  const params = useParams();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [popUpPay, setPopUpPay] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  // const [flightprice, setFlightprice] = useState(location.state.flightPrice);
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [toggle, setToggle] = useState();
  const [opendetails, setOpendetails] = useState(false);
  const [select, setSelect] = useState("");

  const bookingConfirmation = async (id, date, token) => {
    // console.log(id,date,enddate,token);
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
            bookingType: "flight",
            bookingDetails: {
              flightId: id,
              startDate: date,
              endDate: date,
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
    } else if (cardNumber.length > 16) {
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
    } else if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(exp)) {
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

  const today = new Date().toISOString().split("T")[0];
  const storeddata = JSON.parse(localStorage.getItem("UserInfo"));

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span
            className="logo"
            onClick={() => navigat("/")}
            style={{ backgroundColor: "#003580", cursor: "pointer" }}
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
              <div
                className="profile"
                onClick={(e) => {
                  e.stopPropagation(), setOpenSing(!openSign);
                }}
              >
                {" "}
                {storeddata.name.charAt(0).toUpperCase()}
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

      <div style={{ display: "flex", justifyContent: "space-between",margin:"10px 180px 50px 190px" }}>
        <div>
          <div className="">
            {/* <h2>{flightinformation.destination} to {flightinformation.source}</h2>
                <p>Round trip</p> */}
            {/* <p>{high.selectedDate.startDate}</p> */}
          </div>

          <div
            style={{width:"170%"}}
            className="lastpagecon2"
          >
            <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>Baggage</h2>
            <p>Total number of bags included for all travellers</p>
            <div>
              <div className="bag-Cat">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ marginTop: "5px" }}
                />
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
          </div>

          <div
            className="lastpagecon2"
            // style={{ margin: "50px 10px 50px 200px" }}
            style={{width:"170%",marginTop:"-60px"}}
          >
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
              <select
                name=""
                id=""
                className="dataname"
                value={select}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
              >
                <option value="">-- Select --</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Visa">Visa</option>
                <option value="Discover">Discover</option>
                <option value="JCB">JCB</option>
              </select>
              {valid ? <div className="errorname">{error.select}</div> : <></>}
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
              {valid ? <span className="errorname">{error.exp}</span> : <></>}
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
            <button onClick={handleSubmit} className="paynowbutton">
              Pay Now
            </button>
          </div>
        </div>

        <div>
          <div
            className=""
            style={{ marginTop: "10px",marginLeft:"",width:"90%",marginRight:"150px"}}
          >
            <h3 style={{ marginBottom: "15px" }}>Your price summary</h3>
            <p>Total</p>
            <div style={{ display: "flex",justifyContent:"space-between" }} className="">
              <p>Ticket</p>
              <p>INR{sessionStorage.getItem("fid")}</p>
            </div>
            <div style={{ display: "flex",justifyContent:"space-between" }} className="">
              <p>Taxes and charges</p>
              <p>INR1869.00</p>
            </div>
            <div style={{ display: "flex",marginTop:"10px" }} className="pricetotal">
              <h2>Total</h2>
              <h2>INR{sessionStorage.getItem("fid")}</h2>
            </div>
            <p style={{marginTop:"-10px",color:"gray"}}>Includes taxes and charges</p>
            <h4 style={{ marginTop: "30px" }}>Price information</h4>
            <button
              style={{
                marginTop: "5px",
                borderRadius: "10px",
                fontSize: "14px",
                border: "1px solid blue",
                padding: "10px 15px",
                color: "blue",
              }}
              onClick={() => setOpendetails(true)}
            >
              View price details
            </button>

            {opendetails && (
              <div className="detailingprice">
                <div className="open">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3>Price details</h3>
                    {/* <ClearIcon/> */}
                    <FontAwesomeIcon
                      icon={faX}
                      onClick={() => setOpendetails(false)}
                    />
                  </div>
                  <p style={{ fontSize: "14px" }}>
                    No hidden fees – track your price at every step
                  </p>
                  <div
                    className=""
                    style={{
                      marginTop: "15px",
                      border: "1px solid rgb(239, 235, 235)",
                      borderRadius: "5px",
                      paddingBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "rgb(239, 235, 235",
                        padding: "12px 7px",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                    >
                      <h4>Tickets</h4>
                      <h4>INR {sessionStorage.getItem("fid")}</h4>
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 7px 0px 12px",
                      }}
                    >
                      <h5>Price per adult</h5>
                      <h5>INR{sessionStorage.getItem("fid")}</h5>
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "1px 7px 0 12px",
                      }}
                    >
                      <h5>Air India Express taxes and charges</h5>
                      <h5>INR &nbsp; 1869.00</h5>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <p
                      style={{ fontSize: "14px", color: "rgb(109, 105, 105)" }}
                    >
                      Total (includes taxes, charges and fees)
                    </p>
                    <h2>INR {sessionStorage.getItem("fid")}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPayment;
