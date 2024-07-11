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
import Nav from "../../component/navbar/Nav";
import { MyContext } from "../../components/App";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightSearch = () => {
  const { setfendate, fstartdate, setfstartdate, fenddate,flightinformation,setFlightinformation } =
    useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [cardresult, setCardresult] = useState([]);
  const [flightPrice, setFlightPrice] = useState();
  const [opensource, setOpensource] = useState(false);
  const [citynames, setCityNames] = useState([]);
  const [opendestination, setOpendestination] = useState();
  const [modalopen, setModalopen] = useState(false);
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

  const fetchCityNames = async () => {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/airport?limit=30",
        {
          headers: {
            projectID: "ob53n4v1jdes",
          },
        }
      );
      const result = await res.json();
      setCityNames(result.data.airports);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
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

  const fetchHotelData = async (id) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${id}`,
        {
          method: "GET",
          headers: {
            projectID: "uhks9mjjdr82",
          },
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      setCardresult(result.data);
      setModalopen(true);
      // console.log("reho", result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotelData;
  }, []);

  const flightDetail = (id) => {
    fetchHotelData(id);
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

  const flightConfirmation = (fid) => {
    if (!localStorage.getItem("token")) {
      setFlightPrice(cardresult);
      navigate(`/Register?redirect=${encodeURI(`/flightconfirm`)}`, {
        state: {
          destination: location.state.destination,
          flightPrice: location.state.flightPrice,
          source: location.state.source,
          selectedDate: location.state.selectedDate,
          people: location.state.people,
        },
      });
    } else {
      // const flightConfirmation = (fid) => {
      navigate(`/flightconfirm/${fid}`, {
        state: {
          destination: location.state.destination,
          flightPrice: location.state.flightPrice,
          source: location.state.source,
          selectedDate: location.state.selectedDate,
          people: location.state.people,
        },
      });
    }
  };

  useEffect(() => {
    fetchCityNames();
  }, []);

  console.log(selectedDate);

  return (
    <div>
      <Nav />
      {modalopen && (
        <div className="detail-A">
          <div className="contex">
            <div className="mainContent">
              {cardresult && (
                <>
                  <div
                    style={{
                      display: "flex",
                      marginRight: "50px",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ fontSize: "19px", marginBottom: "20px" }}>
                      Your flight to {cardresult.destination}
                    </h2>
                    <button
                      onClick={() => setModalopen(false)}
                      className="nobtn"
                    >
                      X
                    </button>
                  </div>
                  <div className="mainContent">
                    <div className="name-1">
                      Flight to {cardresult.destination}
                    </div>
                    <div className="main-duration">
                      {cardresult.stops == 1
                        ? "1 stop"
                        : cardresult.stops == 0
                          ? "direct"
                          : cardresult.stops >= 2
                            ? "any"
                            : "1 stop"}
                      -{cardresult.duration}hour
                    </div>

                    <div className="detailing">
                      <div className="fly-box1">
                        <div
                          className="flyfly"
                          style={{ marginBottom: "-20px" }}
                        >
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{ marginTop: "10px" }}
                          />
                          <div className="flightGoingDetail">
                            <span>
                              {format(selectedDate,"dd/MM")}
                            </span>
                            <h5>{cardresult.source}</h5>
                          </div>
                        </div>
                        <br />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ marginTop: "10px" }}
                        />

                        <br />
                        <div className="flyfly" style={{ marginTop: "18px" }}>
                          <FontAwesomeIcon icon={faCircle} />
                          <div className="flightGoingDetail">
                               <span>
                              {format(selectedDate,"dd/MM")}
                            </span>
                            <h5>{cardresult.destination}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="fly-box2">
                        <img
                          src={
                            getAirlineInfo(cardresult.flightID.slice(0, 2))
                              .logoSrc
                          }
                          className="airline-logo"
                          style={{
                            height: "40px",
                            width: "40px",
                            marginRight: "20px",
                          }}
                        />
                        <div>
                          <h5
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              marginBottom: "6px",
                            }}
                          >
                            {
                              getAirlineInfo(cardresult.flightID.slice(0, 2))
                                .airlineName
                            }
                          </h5>
                          {/* <br/> */}
                          <h5
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            Flight time {cardresult.duration} hour
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="baggage-detail"
                    style={{ paddingTop: "15px" }}
                  >
                    <div className="baggage-1">
                      <h2 style={{ fontSize: "16px" }}>Included baggage</h2>
                      <span style={{ fontSize: "14px" }}>
                        The total baggage included in the price
                      </span>
                    </div>
                    <div
                      className="baggage-2"
                      onClick={() => {
                        setInfoPopUp(true);
                      }}
                    >
                      <div className="first-Item">
                        <FontAwesomeIcon icon={faSuitcaseRolling} />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            marginLeft: "15px",
                          }}
                        >
                          1 personal item
                          <br />
                          Fits under the seat in front of you
                        </span>
                      </div>
                      <div className="second-Item">
                        <FontAwesomeIcon icon={faBriefcase} />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            marginLeft: "15px",
                          }}
                        >
                          1 cabin bag
                          <br />
                          25 x 35 x 55 cm · Max weight 7 kg
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="total-price">
                    <div className="price-Detail">
                      <h2>INR{cardresult.ticketPrice}</h2>
                      <span>Total price for all travellers</span>
                    </div>
                    <button
                      className="flightSelectbtn"
                      onClick={() => {
                        flightConfirmation(cardresult.ticketPrice);
                      }}
                    >
                      SELECT
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={`flight-class ${modalopen ? "addblur" : ""}`}
        // style={{
        //   filter: `${modalopen} ? "blur(5px)" : "none"`,
        // }}
        style={{marginTop:"10px"}}
      >
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="flightsearchbar" id="flyflight">
          <div>
            <div className="flightGoing" id="flightGoing">
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                className="headerIcon"
                id="icon1"
              />
              <input
                type="text"
                value={source}
                id="textttext"
                onChange={(e) => {
                  setSource(e.target.value), e.preventDefault();
                }}
                onClick={() => {
                  setOpensource(!opensource);
                }}
                // onClick={() => setGoingflight(!goingflight)}
                className="inputflighttext1"
                style={{
                  paddingRight: "50px",
                  marginRight: "50px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div>
              {opensource && (
                <div
                  className="sourcetext"
                  style={{
                    position: "absolute",
                    left: "40px",
                    top: "46px",
                    width: "270px",
                    height: "280px",
                    boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                    overflowY: "scroll",
                    right: "-35px",
                    zIndex: "1000",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  {citynames &&
                    citynames
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
                            // overflowY: "scroll",
                            padding: "10px 0 10px 10px",
                            height: "35px",
                            marginBottom: "-5px",
                            display: "flex",
                            zIndex: "10000000",
                            marginLeft: "5px",
                            cursor: "pointer",
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
            <FontAwesomeIcon
              icon={faPlaneArrival}
              className="headerIcon"
              id="icon2"
            />
            <input
              type="text"
              value={destination}
              id="texttext2"
              style={{ marginRight: "50px", cursor: "pointer" }}
              onChange={(e) => {
                setDestination(e.target.value), e.preventDefault();
              }}
              onClick={() => setOpendestination(!opendestination)}
              className="inputflighttext"
            />
          </div>
          {opendestination && (
            <div
              style={{
                position: "absolute",
                left: "420px",
                top: "46px",
                width: "200px",
                height: "160px",
                overflowY: "scroll",
                right: "-35px",
                paddingBottom: "2px",
                borderRadius: "10px",
                zIndex: "1000",
                // padding: "10px",
                width: "270px",
                height: "280px",
                boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                cursor: "pointer",
              }}
              className="desti1"
            >
              {citynames &&
                citynames
                  .filter((item) => {
                    const lower = item.city.toLowerCase();

                    return lower.startsWith(destination);
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
                        display: "flex",
                        marginLeft: "5px",
                        cursor: "pointer",
                        padding: "10px 0 10px 10px",
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
          <div
            className="headerSearchItem1"
            id="searchitem14"
            onClick={() => setOpenBookingDate(true)}
            style={{ marginLeft: "30px" }}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="headerIcon"
              id="headerIcona"
            />
            {/* <span className="headerSearchText1" id="texttext1">{`${format(
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
                >
                  Done
                </button>
              </>
            )} */}



<DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a date"
             className="custom-datepicker"
             minDate={new Date()}
        />

          </div>
          <div className="headerSearchItem13" id="searc">
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

      <div className="filter-card">
        <div
          className="filterhead"
          style={{
            marginTop: "-20px",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Filters:
        </div>

        <div className="flight-filter">
          <div className="flightflight">
            <div className="flightStops">
              <h3
                className="filterName"
                style={{ marginTop: "-10px", marginBottom: "15px" }}
              >
                Stops
              </h3>

              <div>
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
                style={{ width: "150px" }}
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
          <div className="flightcard-1" style={{ marginBottom: "100px" }}>
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
                      <div className="FlightBox">
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
                            <h5 style={{ fontSize: "16px" }}>
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
                              {/* {format(selectedDate[0].startDate, "dd/MM")} */}
                              <span>
                              {format(selectedDate,"dd/MM")}
                            </span>
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
                              {/* {format(selectedDate, "dd/MM")} */}
                              <span>
                              {format(selectedDate,"dd/MM")}
                            </span>
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
