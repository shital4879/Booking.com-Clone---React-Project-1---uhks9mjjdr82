import { useState, useEffect, useMemo, useRef } from "react";
import React from "react";
import "./flightHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCalendarDays,
  faPlaneDeparture,
  faPlaneArrival,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { AIRPORT } from "../../utils";
import { AIRPORTID } from "../../utill";

const FlightHeader = () => {
  // console.log(AIRPORT.city);
  const [id, setId] = useState(AIRPORTID);
  const navigate = useNavigate();
  const hotelInput = useRef();
  const [data, setData] = useState();
  const [source, setSource] = useState("");
  const [opensource, setOpensource] = useState(false);
  const [destination, setDestination] = useState("");
  const [bookingchildage, setBookingchildage] = useState(false);
  const [searchdestination, setSearchdestination] = useState();
  const [goingflight, setGoingflight] = useState();
  const [comingflight, setComingflight] = useState();
  const [childage, setChildage] = useState();
  const [bookingPeople, setBookingPeople] = useState(false);
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  const [opendestination, setOpendestination] = useState();
  function hotelInputFocus() {
    setHotelInputPopUp(true);
  }
  function hotelInputBlur() {
    setHotelInputPopUp(false);
  }
  const [people, setPeople] = useState({
    adult: 1,
    children: 0,
  });
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  function swapinputs() {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  }
  const handleOption = (name, operation) => {
    setPeople((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? people[name] + 1 : people[name] - 1,
      };
    });
  };

  const handleclick = () => {
    handleOption("children", "i");
    setChildage(!childage);
  };
  //  console.log("date",dayjs(selectedDate).format("ddd"));

  const flightSearch = useMemo(async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${iataCodeGet(
          source
        )}","destination":"${iataCodeGet(destination)}"}&day=Mon${
          sort == "" ? "" : `&sort={"${sort}":1}`
        }`,
        {
          method: "GET",
          headers: { projectID: "uhks9mjjdr82" },
          "Content-Type": "application/json",
        }
      );
      const result = await responce.json();
      let flightresults = result.data;
      setData(flightresults);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    flightSearch;
  });

  const [dataAir, setDataAir] = useState();
  const fetchHotelData = useMemo(async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${iataCodeGet(
          source
        )}`,
        {
          method: "GET",
          headers: {
            projectID: "uhks9mjjdr82",
          },
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      setDataAir(result.data);
      console.log("rho", result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHotelData;
  }, []);

  const handleFlight = () => {
    navigate(`/flightsearch`, {
      state: {
        source: source,
        destination: destination,
        selectedDate: selectedDate,
        people: people,
      },
    });
  };

  //  const flightse=()=>{
  //   flightSearch().then((responce)=>{
  //     console.log("success",responce.data);
  //     // handleFlight(responce)
  //   }).catch((error)=>{
  //     console.log("error",error);
  //   })
  // }
  //  console.log("dest",destination);
  return (
    <div>
      <div className="headingflight">
        <h1 className="mainHead">Compare and book flights with ease</h1>
        <h3 className="mainPara">Discover your next dream destination</h3>
      </div>
      <div className="flight-class">
        <select
          className="flightOption"
          // onClick={() => {
          //   bookingPeople ? setBookingPeople(!bookingPeople) : "";
          // }}
        >
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>

        {/* <span>adult</span> */}
        <div className="headerSearchItema">
          <span
            onClick={() => setBookingPeople(!bookingPeople)}
            className="headerSearchText"
            id="searchText"
          >{`${people.adult}adult. ${people.children}children`}</span>
          {bookingPeople && (
            <div className="options">
              <div className="optionItem">
                <span className="openText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={people.adult <= 1}
                    className="optionbtn"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionnum">{people.adult}</span>
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
                    disabled={people.children <= 0}
                    className="optionbtn"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionnum">{people.children}</span>
                  <button
                    className="optionbtn"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setBookingPeople(!bookingPeople)}
                className="donebtn"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>


<div style={{display:"flex",justifyContent:"center",}}>
      <div className="flightsearchbar">
      <div>
          <div
            className="flightGoing"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" id="gologo"/>
            <input
              type="text"
              placeholder="Where from?"
              value={source}
              id="texttext"
              onChange={(e) => {
                setSource(e.target.value);
              }}
              onClick={() => {
                setOpensource(!opensource);
              
              }}
              style={{ paddingRight: "50px", marginRight: "50px" }}
              className="inputflighttext1"
              ref={hotelInput}
              onBlur={hotelInputBlur}
              onFocus={hotelInputFocus}
              
            />
            <div
            >
              {opensource && (
                <div
                className="sourcetext"
                  style={{
                    position: "absolute",
                    left: "40px",
                    top: "40px",
                    width: "200px",
                    height: "160px",
                    overflowY: "hidden",
                    right: "-35px",
                    zIndex: "1000",
                    borderRadius: "10px",
                    padding: "10px",
                    cursor:"pointer"
                  }}
                >
                  {id &&
                    id
                      .filter((item) => {
                        const lower = item.city.toLowerCase();

                        return lower.startsWith(source);
                      })

                      .map((item) => (
                        <div
                          style={{
                            backgroundColor: "white",
                            paddingLeft: "5px",
                            zIndex: "1000",
                            overflowY: "hidden",
                            height: "35px",
                            marginBottom: "-5px",
                            boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                            display: "flex",
                            zIndex: "10000000",
                            marginLeft: "5px",
                          }}
                          onClick={(e) => {
                            setSource(item.city), setOpensource(!opensource);
                          }}
                        >
                          {item.city}
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          className="headerIcon"
          id="reverseicon"
          style={{ fontSize: "22px" }}
          onClick={() => {
            swapinputs();
          }}
        />
        <div>
          <div
            className="flightComing"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" id="comelogo"/>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value), e.preventDefault();
              }}
              onClick={() => setOpendestination(!opendestination)}
              className="inputflighttext"
              style={{ marginRight: "50px" }}
              id="texttext"
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {opendestination && (
                <div
             
                  style={{
                    position: "absolute",
                    left: "420px",
                    top: "40px",
                    width: "200px",
                    height: "160px",
                    overflowY: "hidden",
                    right: "-35px",
                    paddingBottom:"2px",
                    borderRadius: "10px",
                    zIndex:"1000",
                    padding: "10px",
                    cursor:"pointer"
                  }}
                  className="desti1"
                >
                  {AIRPORTID &&
                    AIRPORTID.filter((item) => {
                      const lower = item.city.toLowerCase();

                      return lower.startsWith(destination);
                    }).map((item) => (
                      <div
                        style={{
                          backgroundColor: "white",
                          paddingLeft: "5px",
                          zIndex: "1000",
                          overflowY: "hidden",
                          height: "35px",
                          marginBottom: "-5px",
                          boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                          display: "flex",
                          marginLeft: "5px",
                          cursor:"pointer"
                        }}
                        onClick={(e) => {
                          setDestination(item.city),
                            setOpendestination(!opendestination);
                        }}
                      >
                        {item.city}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div
          className="headerSearchItem1"
          id="searchitem1"
          onClick={() => setOpenBookingDate(true)}
          style={{ marginLeft:"" }}
        >
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="headerIcon"
            id="headerIcon1"
          />
          <span className="headerSearchText1" id="texttext">{`${format(
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
                className="selectedDate1"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation(), setOpenBookingDate(false);
                }}
                className="donebtnforDate1"
                id="donebtn"
              >
                Done
              </button>
            </>
          )}
        </div>
        <div className="flightsearchbuttonHero" id="searching">
          <button className="headBtn" onClick={handleFlight} id="searchsearch">
            Search
          </button>
          {/* onClick={findingHotel} */}
        </div>
      </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <div>
          <div
            style={{
              marginTop: "70px",
              marginLeft: "190px",
              marginBottom: "15px",
            }}
          >
            <h2 className="flightdest">Popular flights near you</h2>
            <p className="flightdest">
              Find deals on domestic and international flights
            </p>
          </div>
          <div>
            <div></div>
          </div>

          <div>
            <div
              className="imagebox2"
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                marginLeft: "15px",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src="/delhi.avif"
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
                <h1 className="flightcity">Mumbai to Delhi</h1>
              </div>

              <div style={{ position: "relative" }}>
                <img
                  src="/mum.avif"
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
                <h1 className="flightcity">Delhi to Mumbai</h1>
              </div>

              <div style={{ position: "relative" }}>
                <img
                  src="/ahmedabad.avif"
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
                <h1 className="flightcity">Bangalore to Ahmedabad</h1>
              </div>

              <div style={{ position: "relative" }}>
                <img
                  src="/hydrabad.avif"
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
                <h1 className="flightcity">Bangalore to Hyderabad</h1>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              marginTop: "70px",
              marginLeft: "190px",
              marginBottom: "15px",
            }}
          >
            <h2 className="flightdest">Trending cities</h2>
            <p className="flightdest">
              Book flights to a destination popular with travellers from India
            </p>
          </div>
          <div>
            <div></div>
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
                <h1 className="namecity" style={{ fontSize: "26px" }}>
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
                <h1 className="namecity" style={{ fontSize: "26px" }}>
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
    </div>
  );
};

export default FlightHeader;
