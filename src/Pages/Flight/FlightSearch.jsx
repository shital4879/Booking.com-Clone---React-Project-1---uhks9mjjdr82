import React, { useContext, useEffect, useMemo, useState } from "react";
import "./flightSearch.css";
import Navbar from "../../component/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCalendarDays,
  faPlaneDeparture,
  faPlaneArrival,
  faSuitcaseRolling,
  faBriefcase,
  faCircle,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import FlightInfo from "./FlightInfo";
import { AIRPORT, iataCodeGet } from "../../utils";
import FlightConfirm from "./FlightConfirm";
import FlightDetail from "./FlightDetail";
import FlightNav from "./FlightNav";
import SignOut from "../../component/register/SignOut";
import Nav from "../../component/navbar/Nav"
import { MyContext } from "../../components/App";

const FlightSearch = () => {
  const{setfendate,fstartdate,setfstartdate,fenddate} = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [flightPrice, setFlightPrice] = useState();

  const [source, setSource] = useState(
    location.state.source ? location.state.source : ""
  );
  const [destination, setDestination] = useState(
    location.state.destination ? location.state.destination : ""
  );
  const [bookingPeople, setBookingPeople] = useState(false);
  const [people, setPeople] = useState(
    location.state.people ? location.state.people : ""
  );
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    location.state.selectedDate ? location.state.selectedDate : ""
  );
  const [goingflight, setGoingflight] = useState();
  const [comingflight, setComingflight] = useState();
  const [infoPopUp, setInfoPopUp] = useState(false);
  const [searchinput, setSearchInput] = useState(source);
  const [destinationinput, setDestinationInput] = useState(destination);
  const [toggle, settoggle] = useState(false);
  const [sort, setsort] = useState("");
  const [sorting, setSorting] = useState("");
  const [filter, setFilter] = useState("");
  const [airlinevisibility, setairlinevisibility] = useState({
    indigo: true,
    airindia: true,
    akasaair: true,
    vistara: true,
    airindiaexpress: true,
    spicejet: false,
  });
  function airlinevisibilitysetter(key) {
    setairlinevisibility((prev) => ({
      ...prev,
      [key]: !airlinevisibility[key],
    }));
  }

  const handleOption = (name, operation) => {
    setPeople((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? people[name] + 1 : people[name] - 1,
      };
    });
  };

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
      console.log(flightresults);
      if (filter != "") {
        flightresults.flights = flightresults.flights.filter((item) => {
          if (filter === "nonstop") {
            return item.stops === 0;
          } else if (filter == "stops") {
            return item.stops == 1;
          } else if (filter == "anystops") {
            return item.stops >= 0;
          }
          return true;
        });
      }
      setData(flightresults);
      console.log("ko", result);
    } catch (error) {
      console.log(error);
    }
  }, [toggle, sort, filter, flightPrice]);

  useEffect(() => {
    flightSearch;
  });

  const SelfNavigate = () => {
    if (searchinput != "" && destinationinput != "") {
      navigate(`flightsearch=${searchinput}`, {
        state: {
          destination: destinationinput,
          source: searchinput,
          selectedDate: location.state.selectedDate,
          openbookingDate: location.state.openbookingDate,
          people: location.state.people,
        },
      });
    }
  };

 

  const flightDetail = (id) => {
    navigate(`/flightDetail/${id}`, {
      state: {
        selectedDate: selectedDate,
        destination: location.state.destination,
        flightPrice: location.state.flightPrice,
        source: location.state.source,

        people: location.state.people,
      },
    });
  };

  function swapinputs() {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  }

  const getAirlineInfo = (flightIDs) => {
    let logoSrc, airlineName;
    switch (flightIDs.slice(0, 2)) {
      case "6E":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg";
        airlineName = "Indigo";
        break;
      case "AI":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg";
        airlineName = "Air India";
        break;
      case "QP":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg";
        airlineName = "Akasa Air";
        break;
      case "UK":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg";
        airlineName = "Vistara";
        break;
      case "SG":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg";
        airlineName = "Spicejet";
        break;
      case "IX":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/IX.svg";
        airlineName = "Air India Express";
        break;
      case "G8":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/G8.svg";
        airlineName = "GoAir";
        break;
      case "I5":
        logoSrc =
          "https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg";
        airlineName = "AirAsia India";
        break;
      default:
        logoSrc = "";
        airlineName = "";
    }
    return { logoSrc, airlineName };
  };

 
 

  return (
    <div>
     <Nav/>
      <div className="flight-class" style={{marginTop:"10px"}}>
        <select className="flightOption">
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>
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
                    // onClick={() => handleclick()}
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
      <div className="flightsearchbar" id="flyflight">
    <div>
        <div className="flightGoing" id="flightGoing">
          <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" id="icon1"/>
          <input
            type="text"
            value={source}
            id="textttext"
            onChange={(e) => {
              setSource(e.target.value), e.preventDefault();
            }}
            // onClick={() => setGoingflight(!goingflight)}
            className="inputflighttext1"
            style={{ paddingRight: "50px", marginRight: "50px" }}
          />
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
        <div className="flightComing" id="flightComing">
          <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" id="icon2" />
          <input
            type="text"
            value={destination}
            id="texttext2"
            style={{ marginRight: "50px" }}
            onChange={(e) => {
              setDestination(e.target.value), e.preventDefault();
            }}
            className="inputflighttext"
          />
        </div>
        <div
          className="headerSearchItem1"
          id="searchitem14"
          onClick={() => setOpenBookingDate(true)}
          style={{ marginLeft: "30px" }}
        >
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" id="headerIcona" />
          <span className="headerSearchText1" id="texttext1">{`${format(
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
        <div className="headerSearchItem13"id="searc">
          <button
            className="headerBtn"
            id="searchsearch"
            onClick={() => {
              SelfNavigate,
                (searchinput && destinationinput) != ""
                  ? settoggle(!toggle)
                  : "";
            }}
          >
            Search
          </button>
        </div>
      </div>
      </div>

      <div className="filter-card" >
        <div className="filterhead"
          style={{ marginTop: "-20px", fontSize: "20px", fontWeight: "600",marginBottom:"20px" }}
        >
          Filters:
        </div>

        <div className="flight-filter">
          <div className="flightflight">
            <div className="flightStops">
              <h3 className="filterName" style={{marginTop:"-10px",marginBottom:"15px"}}>Stops</h3>

              <div>
                <div
                  style={{ marginBottom: "4px"}}
                  onChange={(e) => {
                    setFilter(e.target.value), console.log(e.target.value);
                  }}
                >
                  <input
                    type="radio"
                    name="radio"
                    style={{ marginRight: "10px" }}
                    className="radioBtn"
                    value="nonstop"
                  />
                  <label style={{ fontSize: "16px" }}>Direct only</label>
                </div>

                <div
                  style={{ marginBottom: "4px" }}
                  onChange={(e) => {
                    setFilter(e.target.value), console.log(e.target.value);
                  }}
                >
                  <input
                    type="radio"
                    name="radio"
                    style={{ marginRight: "10px" }}
                    value="stops"
                    className="radioBtn"
                  />
                  <label style={{ fontSize: "16px" }}>1 Stop max</label>
                </div>
                <div
                  style={{ marginBottom: "4px", marginTop: "px" }}
                  onChange={(e) => {
                    setFilter(e.target.value), console.log(e.target.value);
                  }}
                >
                  <input
                    type="radio"
                    name="radio"
                    style={{ marginRight: "10px" }}
                    value="any"
                    defaultChecked={true}
                    className="radioBtn"
                  />
                  <label style={{ fontSize: "16px" }}>Any</label>
                </div>
              </div>
            </div>
            <div className="flightAir">
              <h3 className="filterName" style={{ marginTop: "40px" }}>
                Airlines
              </h3>
              <div
                onClick={() => {
                  airlinevisibilitysetter("indigo");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="indigo"
                  id="indigo"
                  checked={airlinevisibility["indigo"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="indigo" style={{ fontSize: "16px" }}>
                  Indigo
                </label>
              </div>
              <div
                onClick={() => {
                  airlinevisibilitysetter("airindia");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="airIndia"
                  id="airIndia"
                  checked={airlinevisibility["airindia"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="airindia" style={{ fontSize: "16px" }}>
                  Air India
                </label>
              </div>
              <div
                onClick={() => {
                  airlinevisibilitysetter("akasaair");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="AkasaAir"
                  id="AkasaAir"
                  checked={airlinevisibility["akasaair"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="akasaair" style={{ fontSize: "16px" }}>
                  Akasa Air
                </label>
              </div>
              <div
                onClick={() => {
                  airlinevisibilitysetter("vistara");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="Vistara"
                  id="Vistara"
                  checked={airlinevisibility["vistara"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="vistara" style={{ fontSize: "16px" }}>
                  Vistara
                </label>
              </div>
              <div
                onClick={() => {
                  airlinevisibilitysetter("airindiaexpress");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="AirIndiaExp"
                  id="AirIndiaExp"
                  checked={airlinevisibility["airindiaexpress"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="airindiaexp" style={{ fontSize: "16px" }}>
                  Air India Express
                </label>
              </div>
              <div
                onClick={() => {
                  airlinevisibilitysetter("spicejet");
                }}
                style={{ marginBottom: "4px" }}
              >
                <input
                  type="checkbox"
                  name="spicejet"
                  id="spicejet"
                  checked={airlinevisibility["spicejet"]}
                  style={{ marginRight: "10px" }}
                  className="radioBtn"
                />
                <label htmlFor="spicejet" style={{ fontSize: "16px" }}>
                  Spicejet
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flight-card">
          <div className="sortoption">
            <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
              <select
               style={{width:"150px"}}
                className="sort"
                id="sort"
                onChange={(e) => {
                  setsort(e.target.value);
                }}
              >
                <option value="">Sort By</option>
                <option
                  style={{ border: "5px solid black" }}
                  value="departureTime"
                >
                  {" "}
                  Departure{" "}
                </option>
                <option value="duration">Duration </option>
                <option
                  value="ticketPrice
"
                >
                  Cheapest Ticket{" "}
                </option>
              </select>
            </div>
          </div>
          <div className="flightcard-1" style={{marginBottom:"100px"}}>
            {data &&
              data.flights.map(
                (item) =>
                  (item.flightID.slice(0, 2) == "6E"
                    ? airlinevisibility["indigo"]
                    : true &&
                      (item.flightID.slice(0, 2) == "AI"
                        ? airlinevisibility["airindia"]
                        : true) &&
                      (item.flightID.slice(0, 2) == "QP"
                        ? airlinevisibility["airindia"]
                        : true) &&
                      (item.flightID.slice(0, 2) == "UK"
                        ? airlinevisibility["vistara"]
                        : true) &&
                      (item.flightID.slice(0, 2) == "IX"
                        ? airlinevisibility["airindiaexpress"]
                        : true) &&
                      (item.flightID.slice(0, 2) == "SG"
                        ? airlinevisibility["spicejet"]
                        : true)) && (
                    <>
                      <flightDetail data={item._id} />
                      {/* <h1>{item._id}</h1> */}
                      <div className="FlightBox" >
                        <div className="flightBox1">
                          <div className="flight-logo">
                            <img
                              src={
                                getAirlineInfo(item.flightID.slice(0, 2))
                                  .logoSrc
                              }
                              style={{
                                height: "36px",
                                width: "36px",
                                marginTop: "10px",
                                marginBottom: "7px",
                                
                              }}
                            />
                            <h5 style={{fontSize:"16px"}}>
                              {
                                getAirlineInfo(item.flightID.slice(0, 2))
                                  .airlineName
                              }
                            </h5>
                          </div>
                          <div className="flightArrivalTime">
                            <span className="flight-Time">
                              {item.departureTime}
                            </span>
                            <br />
                            <span className="date-Time">
                              {item.source} -
                              {format(selectedDate[0].startDate, "dd/MM")}
                            </span>
                          </div>
                          <div className="flightDuration">
                            <span
                              style={{
                                width: "170px",
                                textAlign: "center",
                                fontSize: "14px",
                              }}
                              className="duration"
                            >
                              {item.duration}hour
                            </span>
                            <hr style={{ width: "170px" }} className="hrtag" />
                            <br />
                            <span
                              className="direct"
                              style={{ fontSize: "14px" }}
                            >
                              {data.stops == 1
                                ? "1 stop"
                                : item.stops == 0
                                ? "direct"
                                : item.stops >= 2
                                ? "2 stop"
                                : "1 stop"}
                            </span>
                          </div>
                          <div className="departureTime">
                            <span className="flight-Time" id="flight-Time">
                              {item.arrivalTime}
                            </span>
                            <br />
                            <span className="date-Time" id="date-Time">
                              {item.destination} -
                              {format(selectedDate[0].startDate, "dd/MM")}
                            </span>
                          </div>
                        </div>
                        <div className="flightBox2">
                          <div className="luggage-logo">
                            <FontAwesomeIcon icon={faSuitcaseRolling} />
                            <FontAwesomeIcon icon={faBriefcase} />
                          </div>
                          <div className="flightcard1">
                            Included: cabin bag, checked bag
                          </div>
                          <div className="flight-price">
                            INR-{item.ticketPrice.toFixed(2)}
                          </div>
                          <div className="flightpara">
                            Total price for all travellers
                          </div>
                          <button
                            className="flightView"
                            // onClick={() => {
                            //   setInfoPopUp(true),
                            //     setFlightPrice(item.ticketPrice);
                            // }}
                            onClick={() => flightDetail(item._id)}
                          >
                            View details
                          </button>
                          {/* 
                        {infoPopUp && (
                          <FlightInfo
                            trigger={infoPopUp}
                            setTrigger={setInfoPopUp}
                          >
                           <FlightDetail/>
                          </FlightInfo>
                        )} */}
                        </div>
                      </div>
                    </>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
