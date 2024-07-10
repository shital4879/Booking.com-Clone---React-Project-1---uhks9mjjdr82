import React, { useContext, useEffect, useMemo, useState } from "react";
import "./hotelInfo.css";
import Navbar from "../navbar/Navbar";
import HotelSearch from "../../Pages/hotelSearchlist/HotelSearch";
import {
  Link,
  NavLink,
  Navigate,
  redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import styled from "styled-components";
import SignOut from "../register/SignOut";
import {
  faPeopleRoof,
  faBanSmoking,
  faWifi,
  faPeopleGroup,
  faChair,
  faFan,
  faMugSaucer,
  faSink,
  faCheck,
  faBed,
  faUsersViewfinder,
  faOutdent,
  faKitchenSet,
  faPersonBooth,
  faCouch,
  faTv,
  faSquareParking,
  faLock,
  faClock,
  faComments,
  faMagnifyingGlass,
  faCalendarDays,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../navbar/Nav";
import { MyContext } from "../../components/App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HotelInfo = () => {
  const { todate, setTodate, setFormdate, formdate } = useContext(MyContext);
  const [showerror, setShowerror] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [totalguest, setTotalguest] = useState();
  const [hotelPrice, setHotelPrice] = useState();
  const [inputval, setinputval] = useState("");
  const [persons, setPersons] = useState(location.state.persons);
  const [bookingPersons, setBookingPersons] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [selectedId, setselectedId] = useState(location.state.selectedId);
  const [fetchData, setFetchData] = useState();
  const params = useParams();
  console.log(params.id);
  const [information, setInformation] = useState();

  console.log("ae", location.state.selectedId);

  const grid = {
    gridColumnStart: "2",
    gridColumnEnd: "5",
    height: "400px",
    width: "550px",
    objectFit: "cover",
  };

  const fetchHotelData = useMemo(async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${params.id}`,
        {
          method: "GET",
          headers: {
            projectID: "uhks9mjjdr82",
          },
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      setInformation(result.data);
      console.log("reho", result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHotelData;
  }, []);

  const handleOption = (name, operation) => {
    setPersons((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? persons[name] + 1 : persons[name] - 1,
      };
    });
  };

  const toasts = ()=>{
    // toast("Feature is coming soon.");
    toast.error('Select Room', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const hotelPaymentPage = (cost) => {
    if (!localStorage.getItem("token")) {
        navigate(`/Register?redirect=${encodeURI(`/paymentHotel/${cost}`)}`, {
          state: {
            selectedDate: selectedDate,
            information: information,
          },
        });
      }
      else if(inputval === 0 || inputval === "") {
        setShowerror(true);
        toasts();
      }
    else {
      navigate(`/paymentHotel/${cost}`, {
        state: {
          selectedDate: selectedDate,
          information: information,
        },
      });
    }
  };

  useEffect(() => {
    setFormdate(selectedDate[0].startDate);
    setTodate(selectedDate[0].endDate);
    localStorage.setItem("hotelid", params.id);
  }, []);

 

  const alert=()=>{
    window.alert("jjjjjjjjjjjjjj");
  }

  return (
    <div>
          {/* {showerror && <div>{toasts()}</div> } */}
          {/* {showerror && <p>{alert()}</p>} */}
      <div>
        <Nav />
        <div className="maindiv">
          <div className="listContainer">
            <div className="listSearch">
              <h1 className="listTitle">Search</h1>
              <div className="listItem">
                <label className="infoLabel">Destination/property name:</label>
                <br />
                <div className="destinationlist">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="searchicon1"
                    style={{ color: "rgb(90, 88, 88)" }}
                  />
                  <input
                    type="text"
                    value={destination}
                    className="searchinput1"
                    style={{ color: "rgb(90, 88, 88)" }}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="listItem">
                <label className="infoLabel">
                  Check-in date & Check-out date:
                </label>
                <br />
                <div className="destinationlist">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="searchicon1"
                    style={{ color: "rgb(90, 88, 88)" }}
                  />
                  <div
                    className="searchinput1"
                    id="searchitem"
                    onClick={() => setOpenBookingDate(!openbookingDate)}
                    style={{ position: "relative" }}
                  >
                    <span className="headerSearchText">{`${format(
                      selectedDate[0].startDate,
                      "dd/MM/yyyy"
                    )} to ${format(
                      selectedDate[0].endDate,
                      "dd/MM/yyyy"
                    )}`}</span>
                    {openbookingDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setSelectedDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={selectedDate}
                        minDate={new Date()}
                        className="selectedDate"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="listItem">
                <label className="infoLabel" style={{ marginBottom: "5px" }}>
                  2-night stay:
                </label>
                <span className="destinationn">
                  <div className="headerSearc">
                    <FontAwesomeIcon icon={faUser} className="headerIcon" />
                    <span
                      onClick={() => setBookingPersons(!bookingPersons)}
                      className="headerSearchText"
                      style={{color:"#737171",fontSize:"17px"}}
                    >{`${persons.adult}adult. ${persons.children}children. ${persons.room}room`}</span>
                    {bookingPersons && (
                      <div className="options">
                        <div className="optionItem">
                          <span className="openText">Adult</span>
                          <div className="optionCounter">
                            <button
                              disabled={persons.adult <= 1}
                              className="optionbtn"
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <span className="optionnum">{persons.adult}</span>
                            <button
                              className="optionbtn"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="openText">Children</span>
                          <div className="optionCounter">
                            <button
                              disabled={persons.children <= 0}
                              className="optionbtn"
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <span className="optionnum">
                              {persons.children}
                            </span>
                            <button
                              className="optionbtn"
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="openText">room</span>
                          <div className="optionCounter">
                            <button
                              disabled={persons.room <= 1}
                              className="optionbtn"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span className="optionnum">{persons.room}</span>
                            <button
                              className="optionbtn"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => setBookingPersons(!bookingPersons)}
                          className="donebtn"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div className="detail-overview" id="detail-overview">
            {information && (
              <div style={{ marginLeft: "8px" }}>
                <h1>{information.name}</h1>
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{
                      fontSize: "20px",
                      marginRight: "4px",
                      color: "#0071c2",
                    }}
                  />
                  {information.location}
                </p>
              </div>
            )}
            <div className="detailImg" id="detailImg">
              {information &&
                information.images.map((item, key) => (
                  <div className="img-img" style={{ height: "auto" }}>
                    <img
                      src={item}
                      alt=""
                      className="dimg"
                      style={{ height: "325px", width: "380px" }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="tabletable">
          <table>
          <thead className="tablehead1">
              <tr className="tableline"  >
                <th>Room type</th>
                <th>Price for 1 night</th>
                <th>Your choices</th>
                <th>Select room</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {information &&
                information.rooms.slice(0, 6).map((item, key) => {
                  return (
                    <tr  className="tableline" >
                      <td>
                        {" "}
                        <div className="typeRoom">{item.roomType} Room</div>
                        <div
                          className="bedType"
                          style={{
                            fontSize: "14px",
                            fontFamily: "lighter",
                            color: "rgb(90, 88, 88)",
                            gap: "10px",
                          }}
                        >
                          {information.rooms[0].bedDetail}
                          <FontAwesomeIcon
                            icon={faBed}
                            className="bed"
                            style={{ marginLeft: "7px" }}
                          />
                        </div>
                      </td>

                      <td>
                        <div style={{fontSize:"16px",fontWeight:"500"}}>

                        ₹ {item.costPerNight}
                        </div>
                        <div>
                          + ₹{information.rooms[0].costDetails.taxesAndFees}{" "}
                          taxes and charges
                        </div>
                        <button className="offpay">40% off</button>
                        <br />
                        <button className="limitedDeal">
                          Limited time deal
                        </button>
                      </td>

                      <td>
                        <div
                          className="choices"
                          // style={{ fontFamily: "lighter" }}
                          style={{fontSize:"16px",fontWeight:"500"}}
                        >
                          Non refundable
                        </div>
                        <div
                          className="cancellationPolicy"
                          style={{ fontFamily: "lighter", color: "green" }}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="divisioncol-logo"
                            style={{
                              marginRight: "5px",
                              fontFamily: "lighter",
                            }}
                          />
                          {information.rooms[0].cancellationPolicy}
                        </div>
                      </td>
                      <td>
                        {" "}
                        <input
                          type="number"
                          placeholder="0"
                          value={inputval}
                          style={{ width: "60px",height:"25px",marginLeft:"50px" , textAlign: "center" }}
                          onChange={(e) => {
                            setinputval(e.target.value);
                          }}
                          required
                        />
                          {/* {showerror && <p className="error-message" style={{position:"absolute",top:"40px",backgroundColor:"red",color:"white",padding:"2px 6px 2px 4px",borderRadius:"5px"}}>Please add a location to search.</p>} */}
                         
                        
                      </td>
                      <td> <button
                      id="reserveBtn"
                      className="reserveBtn"
                      style={{
                       marginLeft:"40px"
                      }}
                      onClick={() => {
                        hotelPaymentPage(item.costPerNight);
                      }}
                    >
                      Reserve
                    </button></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="hotel-amenities" style={{marginTop:"100px"}}>
          <div className="amenities-head">
            <div className="popular-facility">Most popular facility</div>
            <div className="popular-service">
              <div className="popular srvice1">
                <FontAwesomeIcon icon={faPeopleRoof} className="serive-logo" />
                <div className="service-name">Room service</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faBanSmoking} className="serive-logo" />
                <div className="service-name"> non smoking rooms</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faWifi} className="serive-logo" />
                <div className="service-name">Free wifi</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faPeopleGroup} className="serive-logo" />
                <div className="service-name">Family rooms</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faMugSaucer} className="serive-logo" />
                <div className="service-name">24 Hours front desk</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faChair} className="serive-logo" />
                <div className="service-name">Terrace</div>
              </div>

              <div className="popular srvice1">
                <FontAwesomeIcon icon={faFan} className="serive-logo" />
                <div className="service-name">Air conditioning</div>
              </div>
            </div>

            <div className="mainfacility">
              <div className="facilitycol-1">
                <div className="col1">
                  <div className="maincol">
                    <FontAwesomeIcon icon={faSink} className="maincol-logo" />
                    <div className="maincol-head">Bathroom</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Toilet paper</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Towels</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Private bathroom</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Toilet</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Free toiletries</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Shower</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon icon={faBed} className="maincol-logo" />
                    <div className="maincol-head">Bedroom</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Linen</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faUsersViewfinder}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">View</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">City view</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">view</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faOutdent}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Outdoors</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Terrace</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faKitchenSet}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Kitchen</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Dining table</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">
                      Dining Electric kettle
                    </div>
                  </div>
                </div>

                <div className="col2">
                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faPersonBooth}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Room amenities</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Clothes rack</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon icon={faCouch} className="maincol-logo" />
                    <div className="maincol-head">Living area</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Dining area</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Desk</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon icon={faTv} className="maincol-logo" />
                    <div className="maincol-head">Media & Technology</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Flat-screen TV</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">TV</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon icon={faWifi} className="maincol-logo" />
                    <div className="maincol-head">Internet</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">
                      Wifi is available in all areas and is free of charge
                    </div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faSquareParking}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Parking</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">No parking available</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faMugSaucer}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Services</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Wake up service</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">24 hours front desk</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Room service</div>
                  </div>
                </div>

                <div className="col3">
                  <div className="maincol">
                    <FontAwesomeIcon icon={faLock} className="maincol-logo" />
                    <div className="maincol-head">Safety & security</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Fire extinguishers</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">CCTV in common areas</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Smoke alarms</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Security alarm</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">24 hour security</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Safety deposit box</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon icon={faClock} className="maincol-logo" />
                    <div className="maincol-head">General</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Air conditioning</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">
                      Non smoking throughout
                    </div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Laptop safe</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Fan</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Family room</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Non smoking rooms</div>
                  </div>

                  <div className="maincol">
                    <FontAwesomeIcon
                      icon={faComments}
                      className="maincol-logo"
                    />
                    <div className="maincol-head">Languages spoken</div>
                  </div>

                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">English</div>
                  </div>
                  <div className="divisioncol">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="divisioncol-logo"
                    />
                    <div className="divisioncol-head">Hindi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="amenities-options"></div>
        </div>
      </div>
      {/* )
    : navigate(`/Register`)} */}
    </div>
  );
};

export default HotelInfo;
