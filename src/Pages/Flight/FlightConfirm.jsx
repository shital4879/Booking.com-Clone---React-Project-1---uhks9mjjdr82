import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./flightconfirm.css";
import FlightInfo from "./FlightInfo";

const FlightConfirm = () => {
  const location = useLocation();
  const[emailId,setEmailId] = useState();
  // const[flightPrice,setFlightPrice] = useState(location.state.flightPrice);
  const flightPrice = location.state.flightPrice
  console.log("mi",flightPrice)
  const navigation = useNavigate();
  // const[destination,setDestination] = useState(location.state.destination)
  // const destination = location.state
  // console.log(destination);
  const data = location.state
  const fid=location.state



  //   const airportSearch = async () => {
  //   try {
  //     const responce = await fetch(
  //       ``,
  //       {
  //         method: "GET",
  //         headers: { projectID: "uhks9mjjdr82" },
  //         "Content-Type": "application/json",
  //       }
  //     );
  //     const result = await responce.json();
  //     console.log(result);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const flightPayment=()=>{
    navigation(`/flightPayment`,{state: 
      {
        emailId:emailId}})
  }
  return (
    <div>
      <form>
      <div className="confirmation-main">
        <div className="mainSet1">
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
            <form >
            <input
              type="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value), e.preventDefault();
              }}
              style={{ height: "35px", width: "250px", marginBottom: "30px" }}
              required
            />
            </form>
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
          <div className="set2">
            <div className="setBox1">
              <div className="setTicket">
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  Ticket (1 adult)
                </h5>
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  Flight fare
                </h5>
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
              <div className="setMoney">
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  INR{flightPrice}
                </h5>
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  INR
                </h5>
                <h5
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "8px",
                  }}
                >
                  INR
                </h5>
                <h2 style={{ marginTop: "40px" }}>INR</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="mainSet2">
          <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>
            Contact details
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
            type="email"
            style={{
              height: "35px",
              width: "250px",
              marginRight: "90px",
            }}
            required
          />
          {/* <p style={{fontSize:"12px",width:"250px", marginRight:"10px"}}>Enter exactly what's written on this traveller's travel document</p> */}
          <input
            type="email"
            style={{ height: "35px", width: "250px" }}
           
            required
          />
          <p style={{ fontSize: "12px", width: "250px" }}>
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
              marginTop: "8px",
              fontSize: "14px",
              height: "35px",
              width: "250px",
            }}
          >
            <option value="gender">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p style={{ fontSize: "12px", width: "300px" }}>
            We're currently required by airlines and providers to ask for this
            information
          </p>
        </div>

        <div className="buttons">
            <button className="backBtn" onClick={<FlightInfo
            />} >Back</button>
            <button className="backBtn" onClick={flightPayment}>Next</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default FlightConfirm;
