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
  const[id,setId] = useState(AIRPORTID)
  const navigate = useNavigate();
  const hotelInput = useRef();
  const [data, setData] = useState();
  const [source, setSource] = useState();
  const [opensource, setOpensource] = useState(false);
  const [destination, setDestination] = useState();
  const [bookingchildage, setBookingchildage] = useState(false);
  const [searchdestination, setSearchdestination] = useState();
  const [goingflight, setGoingflight] = useState();
  const [comingflight, setComingflight] = useState();
  const [childage, setChildage] = useState();
  const [bookingPeople, setBookingPeople] = useState(false);
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  const [opendestination,setOpendestination] = useState();
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
          onClick={() => {
            bookingPeople ? setBookingPeople(false) : "";
          }}
        >
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>

        {/* <span>adult</span> */}
        <div className="headerSearchItem">
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

      <div className="flightsearchbar">
        <div>
          <div className="flightGoing"   onClick={(e) => {
            e.stopPropagation();
          }}>
            <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
            <input
              type="text"
              placeholder="Where from?"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
              }}
              onClick={() => {
                setOpensource(true);
                id
              }}
              style={{ paddingRight: "50px", marginRight: "50px" }}
              className="inputflighttext"
              ref={hotelInput}
              onBlur={hotelInputBlur}
              onFocus={hotelInputFocus}
            />
            <div
              // onClick={(e) => {
              //   e.stopPropagation();
              // }}
            >
              {opensource && (
                <div
                  style={{
                    position: "absolute",
                    left: "40px",
                    top: "40px",
                    width: "200px",
                    height: "150px",
                    overflowY: "hidden",
                    right: "-35px",
                 
                    borderRadius: "10px",
                  
                  //  height:"200px",
                    padding: "10px",
                  }}
                >
                  {id &&
                    id.filter((item) => {
                      const lower = item.city.toLowerCase();

                      return lower.startsWith(source);
                    })
                   
                    .map((item) => (
                
                        <div
                        style={{
                          backgroundColor: "white", 
                          paddingLeft:"5px",
                          zIndex: "1000",
                          overflowY: "hidden",
                          height:"35px",
                          marginBottom:"-5px",
                          boxShadow:  "4px 4px 4px 1px rgba(0,0,0,0.4)",
                          display:"flex",
                          marginLeft:"5px"
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
        <div className="flightComing" onClick={(e) => {
            e.stopPropagation();
          }}>
          <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
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
            // ref={hotelInput}
            // onBlur={hotelInputBlur}
            // onFocus={hotelInputFocus}
          />
          <div  onClick={(e) => {
                e.stopPropagation();
              }}>
            {
              opendestination &&(
                <div   style={{
                  position: "absolute",
                  left: "420px",
                  top: "40px",
                  width: "200px",
                  height: "150px",
                  overflowY: "hidden",
                  right: "-35px",
                  // backgroundColor: "white", 
                  borderRadius: "10px",
                  // marginTop:"7px",
                //  height:"200px",
                  padding: "10px",
                }}
                >
                     {AIRPORTID &&
                    AIRPORTID.filter((item) => {
                      const lower = item.city.toLowerCase();

                      return lower.startsWith(destination);
                    })
                   
                    .map((item) => (
                
                        <div
                        style={{
                          backgroundColor: "white", 
                          paddingLeft:"5px",
                          zIndex: "1000",
                          overflowY: "hidden",
                          height:"35px",
                          marginBottom:"-5px",
                          boxShadow:  "4px 4px 4px 1px rgba(0,0,0,0.4)",
                          display:"flex",
                          marginLeft:"5px"
                        }}
                          onClick={(e) => {
                            setDestination(item.city), setOpendestination(!opendestination);
                          }}
                        >
                          {item.city}
                        </div>
                    
                    ))}
                </div>
              )
            }
          </div>
        </div>
        </div>
        <div
          className="headerSearchItem1"
          id="searchitem"
          // style={{marginLeft:"50px",marginRight:"-100px"}}
          onClick={() => setOpenBookingDate(true)}
          style={{ marginLeft: "30px" }}
        >
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span className="headerSearchText1">{`${format(
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
                  onClick={(e) => { e.stopPropagation(), setOpenBookingDate(false) }}
                  className="donebtnforDate1"
                >
                  Done
                </button>
            </>
          )}
        </div>
        <div className="flightsearchbuttonHero">
          <button className="headerBtn" onClick={handleFlight}>
            Search
          </button>
          {/* onClick={findingHotel} */}
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
