import React, { useEffect, useMemo, useRef, useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { json, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [fetchingData, setFetchingData] = useState();
  const [opendestination, setOpenDestination] = useState(false);
  const hotelInput = useRef();
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  function hotelInputFocus() {
    setHotelInputPopUp(true);
  }
  function hotelInputBlur() {
    setHotelInputPopUp(false);
  }
  const [data, setData] = useState();
  const [destination, setDestination] = useState("");
  const [openbtn, setOpenBtn] = useState(false);
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [bookingPersons, setBookingPersons] = useState(false);
  const [persons, setPersons] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setPersons((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? persons[name] + 1 : persons[name] - 1,
      };
    });
  };

  const hotelSearch = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`,
        {
          method: "GET",
          headers: { projectID: "uhks9mjjdr82" },
          "Content-Type": "application/json",
        }
      );
      const result = await responce.json();
      return result;
    } catch (error) {
      return error;
    }
  };

  function handleHotelSearch() {
    hotelSearch()
      .then((response) => {
        if (response) {
          setData(response.data);
          handleSearch(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //--------------------Hotel input cities data dynamically----------------------

  const fetchHotelState = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`,
        {
          method: "GET",
          headers: { projectID: "uhks9mjjdr82" },
          "Content-Type": "application/json",
        }
      );
      const result = await responce.json();
      setFetchingData(result.data.hotels);
      console.log("city", result.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSearchlocation() {
    fetchHotelState()
      .then((response) => {
        if (response) {
          setFetchingData(response.data);
          // handleSearch(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //   useEffect(()=>{
  //      fetchHotelState;
  // },[])

  const handleSearch = () => {
    navigate(`/hotel/destination=${destination}`, {
      state: {
        data: data,
        destination: destination,
        selectedDate: selectedDate,
        openbookingDate: openbookingDate,
        persons: persons,
        bookingPersons: bookingPersons,
        // selectedDate:selectedDate
      },
    });
  };

  return (
    <div>
      <div className="head1">
        {/* SEARCHBAR */}
        <div className="headerSearch">
        <div className="searching">
          <div
            className="headerSearchItem"
            id="idsearch"
            style={{ position: "relative"}}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faBed} className="headerIcon" id="h1" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="HeaderSearchInput"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                // handleSearchlocation();
              }}
              onClick={() => {
                handleSearchlocation();
                setOpenDestination(!opendestination);
                // setOpenDestination(true)
              }}
              ref={hotelInput}
              onBlur={hotelInputBlur}
              onFocus={hotelInputFocus}
            />

            <div
            >
              {opendestination && (
                <div
                  className="styledest"
                  style={{
                    position: "absolute",
                    top: "40px",
                    width: "100%",
                    height: "300px",
                    overflowY: "hidden",
                    right: "-35px",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    zIndex: "1000",
                    boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.4)",
                    padding: "10px",
                  }}
                >
                  {fetchingData &&
                    fetchingData
                      .filter((item) => {
                        const lower = item.location.toLowerCase();

                        return lower.startsWith(destination);
                      })
                      .map((item) => (
                        <div
                          className="locationData "
                          onClick={(e) => {
                            setDestination(item.location),
                              setOpenDestination(!opendestination);
                          }}
                        >
                          {item.location}
                        </div>
                      ))}
                </div>
              )}
            </div>

            {/* )} */}
          </div>

          <div
            style={{}}
            className="headerSearchItem"
            id="idDate"
            onClick={(e) => {
              setOpenBookingDate(true);
            }}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="headerIcon"
              id="hhhh"
            />
            <div>
              <span className="headerSearchText">{`${format(
                selectedDate[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(selectedDate[0].endDate, "dd/MM/yyyy")}`}</span>
              {openbookingDate && (
                <>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setSelectedDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={selectedDate}
                    minDate={new Date()}
                    className="selectedDate"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(), setOpenBookingDate(false);
                    }}
                    className="donebtnforDate"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            className="headerSearchItem12"
            id="idPeople"
            style={{ }}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="headerIcon"
              id="personp"
            />
            <span
              onClick={() => setBookingPersons(!bookingPersons)}
              className="headerSearchText"
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
                    <span className="optionnum">{persons.children}</span>
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
          </div>
          <button className="headerBtn" id="headbutton1
          " onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div>


        <div
 
          style={{
            marginTop: "70px",
            marginLeft: "190px",
          }}
        >
          <h1 style={{ fontSize: "26px" }}  className="trendingdest">Trending destinations</h1>
          <p  className="trendingdest">Most popular choices for traveller from India</p>
        </div>
        <div
        className="imagebox1"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <h1 className="namecity" style={{ fontSize: "26px" }}>
              Agra
            </h1>
            <img
              src="/agra.avif"
              alt=""
              style={{
                height: "250px",
                borderRadius: "3%",
                width: "365px",
                borderRadius: "3%",
                marginRight: "20px",
                backgroundImage: "cover",
              }}
              className="image12"
            />
          </div>
          <div style={{ position: "relative" }}  id="image13">
            <h1 className="namecity" style={{ fontSize: "26px" }}>
              Jaipur
            </h1>
            <img
              src="/jaipur.avif"
              alt=""
              style={{
                height: "250px",
                borderRadius: "3%",
                width: "365px",
                borderRadius: "3%",
                marginRight: "20px",
                backgroundImage: "cover",
              }}
              className="image12"
            />
          </div>

          <div style={{ position: "relative" }} className="imgbox3">
            <h1 className="namecity" style={{ fontSize: "26px" }}>
              Mumbai
            </h1>

            <img
              src="/mumbai.avif"
              alt=""
              style={{
                height: "250px",
                borderRadius: "3%",
                width: "365px",
                borderRadius: "3%",
              }}
              className="image12"
            />
          </div>
        </div>

        <div>
          <div
          className="imagebox2"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <h1 className="namecity" style={{ fontSize: "26px" }}>
                Agra
              </h1>
              <img
                src="/Hampi.avif"
                alt=""
                style={{
                  height: "230px",
                  borderRadius: "3%",
                  width: "270px",
                  borderRadius: "3%",
                  marginRight: "20px",
                  backgroundSize: "contain",
                }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <h1 className="namecity" style={{ fontSize: "26px" }}>
                Goa
              </h1>
              <img
                src="/goa.avif"
                alt=""
                style={{
                  height: "230px",
                  borderRadius: "3%",
                  width: "270px",
                  borderRadius: "3%",
                  marginRight: "20px",
                  backgroundSize: "cover",
                }}
              />
            </div>

            <div style={{ position: "relative" }} className="imgimage3">
              <h1 className="namecity" style={{ fontSize: "26px" }} >
                Chennai
              </h1>
              <img
                src="/chennai.avif"
                alt=""
                style={{
                  height: "230px",
                  borderRadius: "3%",
                  width: "270px",
                  borderRadius: "3%",
                  marginRight: "20px",
                  backgroundImage: "cover",
                }}
              />
            </div>

            <div style={{ position: "relative" }} id="image13">
              <h1 className="namecity" style={{ fontSize: "26px" }} >
                Pune
              </h1>
              <img
                src="/pune.avif"
                alt=""
                style={{
                  height: "230px",
                  borderRadius: "3%",
                  width: "270px",
                  borderRadius: "3%",
                  // marginRight: "50px",
                  backgroundImage: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
