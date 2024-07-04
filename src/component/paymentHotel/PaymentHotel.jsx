import { useContext, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SignOut from "../register/SignOut";
import { MyContext } from "../../components/App";

const PaymentHotel = () => {
  const { todate, setTodate, setFormdate, formdate } = useContext(MyContext);
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
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  console.log(selectedDate[0].endDate, "date");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const[lastname,setLastname] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState({});
  const [valid, setvalid] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [isValid, setIsValid] = useState(true);

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
      if (localStorage.getItem("hotelid")) {
        bookingConfirmation(
          localStorage.getItem("hotelid"),
          formdate,
          todate,
          localStorage.getItem("token")
        );
      }
      navigat(`/paymentlastpage`);
      // setPopUpPay(!popUpPay);
      // // setAction("Booking successful!"), setStatus("Enjoy your journey");
      // setTimeout(() => {
      //   navigat(`/`);
      // }, 3000);
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
            <div style={{ width: "40%" }}>
              <h3>Your booking details</h3>
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
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
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
                <div style={{ display: "flex", width: "100%" ,marginTop:"-10px" }}>
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

              <button className="step2" onClick={handleSubmit}>
                Next: Final details
              </button>
            </div>
          </div>

          <form >
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
                  <label style={{ fontSize: "15px", marginBottom: "2px" }}>
                    Contact Email{" "}
                    <span style={{ color: "red", marginRight: "5px" }}>*</span>
                  </label>
                  <br />

                  <input
                    type="email"
                    className="emailclass"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError((prev) => {
                        return { ...prev, email: "" };
                      });
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
                    className="numclass"
                    type="text"
                    maxLength="10"
                    // required
                    value={number}
                    style={{
                      height: "35px",
                      width: "300px",
                      marginBottom: "30px",
                      fontSize: "16px",
                      paddingLeft: "10px",
                    }}
                    placeholder="+91"
                    onChange={(e) => {
                      setNumber(e.target.value);
                      setError((prev) => {
                        return { ...prev, number: "" };
                      });
                    }}
                  />
                  {valid ? (
                    <div className="numberZone2">{error.number}</div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="hotelset2">
                  <div style={{ display: "flex" }}>
                    <h2 style={{ marginRight: "160px" }}>Total{hotelPrice}</h2>
                    <h2 style={{ marginLeft: "-5px" }}>
                      INR {inputval * params.cost}
                    </h2>
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
                  <p
                    style={{
                      marginBottom: "15px",
                      marginRight: "180px",
                      margin: "15px 10px 10px 0px",
                    }}
                  >
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
                      id="cardhold"
                      value={name}
                      className="inputdata"
                      onChange={(e) => {
                        setName(e.target.value);
                        setError((prev) => {
                          return { ...prev, name: "" };
                        });
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[0-9]/g, "");
                      }}
                      style={{
                        marginBottom: "30px",
                        marginTop: "10px",
                        paddingLeft: "5px",
                      }}
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
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[a-z]/g, "");
                        }}
                        name="name"
                        style={{ border: "none", outline: "none" }}
                        maxLength="16"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                          setError((prev) => {
                            return { ...prev, cardNumber: "" };
                          });
                        }}
                      />
                    </div>
                    <br />
                    {valid ? (
                      <div className="cardZone">{error.cardNumber}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <div>
                      <label className="labelexp">
                        Expiry Date{" "}
                        <span style={{ color: "red", marginRight: "160px" }}>
                          *
                        </span>
                      </label>
                      <br />
                      <input
                        type="date"
                        placeholder="MM/YY"
                        className="expinput"
                        id="expdata1"
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
                        <span className="expZone">{error.exp}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <label>
                        CVC <span style={{ color: "red" }}>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        className="expinput"
                        // maxLength={4}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[a-z]/g, "");
                        }}
                        maxLength="3"
                        value={cvc}
                        id="cvcdata"
                        onChange={(e) => {
                          setCvc(e.target.value);
                          setError((prev) => {
                            return { ...prev, cvc: "" };
                          });
                        }}
                      />
                      <br />
                      {valid ? (
                        <span className="cvcZone">{error.cvc}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="backBtn"
                id="btnpay"
                style={{ marginLeft: "550px" }}
                // onClick={handlepaybtn}
              >
                Pay Now
              </button>
            </div>
          </form>
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
};

export default PaymentHotel;
