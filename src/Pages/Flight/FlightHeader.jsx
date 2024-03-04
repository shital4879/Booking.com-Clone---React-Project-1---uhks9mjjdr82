import { useState,useEffect } from "react";
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

const FlightHeader = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const[source,setSource] = useState();
  const[destination,setDestination] = useState();
  const [bookingchildage, setBookingchildage] = useState(false);
  const[searchdestination,setSearchdestination] = useState();
  const [goingflight, setGoingflight] = useState();
  const [comingflight, setComingflight] = useState();
  const [childage, setChildage] = useState();
  const [bookingPeople, setBookingPeople] = useState(false);
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


  const flightSearch = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${AIRPORT[0].iata_code}","destination":"${destination}"}&day=Mon`,
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



//   useEffect (()=>{
//   airportSearch();
//  },[source])


  const handleFlightSearch=()=>{
    flightSearch()
    .then((responce)=>{
      if(responce){
        console.log("juu",responce.data)
        setData(responce.data);
        handleFlight(responce.data)
      }
    }
    )
    .catch((error) => {
      console.log(error);
    });
  }

  const handleFlight=(data)=>{
    navigate(`/flightsearch`
    ,{state:{
      data:data,
      source:source,
      destination:destination,
      selectedDate:selectedDate,
      people:people
    }}
    )
  }
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
        <select className="flightOption">
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
                  <button className="optionbtn" 
                  onClick={() => handleOption("children","i")}
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
        <div className="flightGoing">
          <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
          <input
            type="text"
            placeholder="Where from?"
            value={source}
            onChange={(e) => {
              setSource(e.target.value), e.preventDefault();
            }}
            // onClick={() => setGoingflight(!goingflight)}
            className="inputflighttext"
          />
          {goingflight && (
            <div  className="airportsearch">
            <input
              type="text"
              placeholder="Airport or city"
              className="airportinput"
            />
             <br/>
            <span className="airportsearchtext">
            Select multiple airports at once and compare flights
            </span>
            </div>
          )}
        </div>
        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          className="headerIcon"
          id="reverseicon"
          style={{ fontSize: "22px" }}
        />
        <div className="flightComing">
          <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e)=>
              {setDestination(e.target.value),(e.preventDefault())}}
            onClick={() => setComingflight(!comingflight)}
            className="inputflighttext"
          />
          {comingflight && (
            <div  className="airportsearch">
            <input
              type="text"
              placeholder="Airport or city"
              className="airportinput"
            />
            <br/>
             <span className="airportsearchtext">
            Select multiple airports at once and compare flights
            </span>
            </div>
          )}
        </div>
        <div
          className="headerSearchItem"
          id="searchitem"
          onClick={() => setOpenBookingDate(!openbookingDate)}
        >
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span className="headerSearchText">{`${format(
            selectedDate[0].startDate,
            "dd/MM/yyyy"
          )} to ${format(selectedDate[0].endDate, "dd/MM/yyyy")}`}</span>
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
        <div className="headerSearchItem" id="searchbtn">
          <button
            className="headerBtn"
            onClick={handleFlightSearch}
          >
            Search
          </button>
          {/* onClick={findingHotel} */}
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
