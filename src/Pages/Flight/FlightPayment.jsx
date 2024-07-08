import React, { useContext, useState } from "react";
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
    const [day, month, year] = exp.split("/");
    const expiryDateObj = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();

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

    if (expiryDateObj < currentDate) {
      return "Expiry date must be in the future";
    }

    if (exp.length == "") {
      isValid = true;
      validationError.exp = "Expiry date is required";
    } else if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(exp)) {
      isValid = true;
      validationError.exp = "Please enter a valid expiry date";
    }
    setvalid(isValid);
    setError(validationError);

    if (!isValid) {
      if (localStorage.getItem("flightid")) {
        bookingConfirmation(
          localStorage.getItem("flightid"),
          fstartdate,
          localStorage.getItem("token")
        );
      }
      setPopUpPay(!popUpPay);
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

      <div>
        <div className="infobox1">
                {/* <h2>{flightinformation.destination} to {flightinformation.source}</h2>
                <p>Round trip</p> */}
        {/* <p>{high.selectedDate.startDate}</p> */}
        </div>

       <div style={{margin:"50px 180px 50px 200px"}} className="paymentend" >
        <h2 style={{marginTop:"10px",marginBottom:"10px"}}>Baggage</h2>
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
