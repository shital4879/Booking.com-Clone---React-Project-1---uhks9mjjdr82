import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./flightconfirm.css";
import FlightInfo from "./FlightInfo";
import SignOut from "../../component/register/SignOut";


const FlightConfirm = () => {
  const params = useParams();
  console.log(params.fid,"kt");
  const location = useLocation();
  const[emailId,setEmailId] = useState();
  const flightPrice = location.state.flightPrice;
  console.log("mi",flightPrice)
  const navigation = useNavigate();
  const data = location.state
  const fid=location.state;
  const[openSign,setOpenSing] = useState(false);
  const navigate = useNavigate();

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };

  console.log("check",location.state);
 const handlebackbtn=()=>{
  navigation(`/flightsearch`),{ state:{
    data:location.state.data,
    destination:location.state.destination,
    flightPrice:location.state.flightPrice,
    source:location.state.source,
    selectedDate:location.state.selectedDate,
    people:location.state.people
  }}
 }
 console.log(flightPrice,"lolo");
  const flightPayment=(fid)=>{
    navigation(`/flightPayment/${fid}`,{state: 
      {
        flightPrice:flightPrice,
        }})
  }
  // const handlepopup = () =>{
  //   if(emailId === ""  || emailId === null){
  //     alert("pop")
  //   }
  // }
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
            {localStorage.getItem("token") &&
              <div className="profile" onClick={(e)=>{e.stopPropagation(),setOpenSing(!openSign)}} >
                {openSign && 
                <SignOut/>
                }
              </div>
            }

          </div>
        </div>
      </div>
      <form>
      <div className="confirmation-main">
        <div className="mainSet1">
          <div className="set1">
            <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
            Contact details
            </h2>
            <h5 style={{ fontWeight: "400", marginBottom: "10px" }}>
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
              name="email"
              // value={emailId}
              // onChange={(e) => {
              //   setEmailId(e.target.value), e.preventDefault();
              // }}
              style={{ height: "35px", width: "250px", marginBottom: "15px",width:"320px",fontSize:"16px"}}
              required
            />
        
            <br />
            <label>
              Phone number{" "}
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
            </label>
            <br />
            <input
              type="number"
              style={{ height: "35px", width: "250px", marginBottom: "30px",width:"320px",fontSize:"16px" }}
              required
              placeholder="+91"
              
            />
          </div>
          <div className="set2">
            <div className="setBox1">
              <div className="setTicket">
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "5px",
                  }}
                >
                  Ticket (1 adult)
                </h5>
                {/* <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  Flight fare
                </h5> */}
                {/* <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  Taxes and charges
                </h5> */}
                <h2 style={{ marginTop: "40px" }}>Total</h2>
                
              </div>
              <div className="setMoney">
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    display:"flex",justifyContent:"end"
                  }}
                >
                  INR{(params.fid)}
                </h5>
                {/* <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  INR
                </h5> */}
                {/* <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  INR
                </h5> */}
                <h2 style={{ marginTop: "40px",display:"flex",justifyContent:"end"}}> INR{(params.fid)}</h2>
              </div>
            </div>
            <div style={{marginLeft:"200px",marginTop:"30px"}}>
            <p style={{ marginBottom: "5px"}}>
                  Includes taxes and charges
                </p>
                <p>No hidden fees - track your price at every step</p>
                </div>
          </div>
        </div>
        <div className="mainSet2" >
          <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>
            


            Traveller 1 (adult)
          </h2>
          <h5 style={{ fontWeight: "400", marginBottom: "20px" }}>
            <span style={{ color: "red", marginRight: "5px" }}>*</span>Required
          </h5>
          <label style={{ fontSize: "15px", marginRight: "250px" }}>
            First names{" "}
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          </label>
          <label style={{ fontSize: "15px" }}>
            Last names{" "}
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          </label>
          <br />
          <input
            type="text"
            style={{
              height: "35px",
              width: "250px",
              marginRight: "90px",
            }}
            required
          />
          {/* <p style={{fontSize:"12px",width:"250px", marginRight:"10px"}}>Enter exactly what's written on this traveller's travel document</p> */}
          <input
            type="text"
            style={{ height: "35px", width: "250px" }}
           
            required
          />
          <p style={{ fontSize: "12px", width: "250px", marginTop:"5px",marginBottom:"10px"}}>
            Enter exactly what's written on this traveller's travel document
          </p>
          <br />
          <label>
            Gender specified on your travel document{" "}
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          </label>
          <br />
          <select
            id="gender"
            style={{
              height: "25px",
              width: "150px",
              marginTop: "10px",
              fontSize: "14px",
              height: "35px",
              width: "250px",
            }}
          >
            <option value="gender">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p style={{ fontSize: "12px", width: "300px", marginTop:"5px"}}>
            We're currently required by airlines and providers to ask for this
            information
          </p>
        </div>

        <div className="buttons">
            <button className="backBtnbtn" style={{marginLeft:"0px",marginBottom:"50px"}} onClick={()=>flightPayment(params.fid)}>Next</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default FlightConfirm;
