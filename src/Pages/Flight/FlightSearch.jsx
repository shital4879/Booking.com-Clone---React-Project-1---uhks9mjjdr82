import React, { useEffect, useMemo, useState } from "react";
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

const FlightSearch = () => {
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
  const [airlinevisibility, setairlinevisibility] = useState({
    Indigo: true,
    AirIndia: true,
    AkasaAir: true,
    Vistara: true,
    AirIndiaExpress: true,
    Spicejet: true,
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
        // `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${iataCodeGet(source)}","destination":"${iataCodeGet(destination)}"}&day=Mon${sort==""?"":`&sort={"${sort}":1}`}`,
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
      setData(result.data);
    } catch (error) {
      return error;
    }
  }, [toggle, sort]);

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

  const flightConfirmation = (fid) => {
    navigate(`/flightconfirm/${fid}`, {
      state: {
        destination: destination,
        flightPrice: flightPrice,
        source: location.state.source,
        selectedDate: location.state.selectedDate,
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
      <Navbar type="list" />
      <div className="flight-class">
        <select className="flightOption">
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>
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
      <div className="flightsearchbar">
        <div className="flightGoing">
          <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
          <input
            type="text"
            value={source}
            onChange={(e) => {
              setSource(e.target.value), e.preventDefault();
            }}
            // onClick={() => setGoingflight(!goingflight)}
            className="inputflighttext"
          />
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
        <div className="flightComing">
          <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value), e.preventDefault();
            }}
            // onClick={() => setComingflight(!comingflight)}
            className="inputflighttext"
          />
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

      <div className="filter-card">
        <div
          style={{ marginTop: "-20px", fontSize: "20px", fontWeight: "600" }}
        >
          Filters:
        </div>

        <div className="flight-filter">
          <div className="flightStops">
            <h3 className="filterName">Stops</h3>
            <div style={{ marginBottom: "4px" }}>
              <input
                type="radio"
                name="radio"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="radio" style={{ fontSize: "14px" }}>
                Any
              </label>
            </div>

            <div style={{ marginBottom: "4px" }}>
              <input
                type="radio"
                name="radio"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="radio" style={{ fontSize: "14px" }}>
                Direct only
              </label>
            </div>

            <div style={{ marginBottom: "4px" }}>
              <input
                type="radio"
                name="radio"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="radio" style={{ fontSize: "14px" }}>
                1 Stop max
              </label>
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
              />
              <label htmlFor="indigo" style={{ fontSize: "14px" }}>
                Indigo
              </label>
            </div>
            <div
              onClick={() => {
                airlinevisibilitysetter("airIndia");
              }}
              style={{ marginBottom: "4px" }}
            >
              <input
                type="checkbox"
                name="airIndia"
                id="airIndia"
                checked={airlinevisibility["airIndia"]}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="airIndia" style={{ fontSize: "14px" }}>
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
                checked={airlinevisibility["vistara"]}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="AkasaAir" style={{ fontSize: "14px" }}>
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
              />
              <label htmlFor="Vistara" style={{ fontSize: "14px" }}>
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
              />
              <label htmlFor="AirIndiaExp" style={{ fontSize: "14px" }}>
                Air India Express
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
                name="spicejet"
                id="spicejet"
                checked={airlinevisibility["airispicejet"]}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="spicejet" style={{ fontSize: "14px" }}>
                Spicejet
              </label>
            </div>
          </div>
        </div>
        <div className="flight-card">
          <div className="sortoption">
            <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
              <select
                className="sort"
                onChange={(e) => {
                  setsort(e.target.value);
                }}
              >
                <option value="">Sort By</option>
                <option style={{ border: "5px solid black" }} value="departure">
                  {" "}
                  Departure{" "}
                </option>
                <option value="duration">Duration </option>
                <option value="price">Cheapest Ticket </option>
              </select>
            </div>
          </div>
          <div className="flightcard-1">
            {data &&
              data.flights.map((item) => {
                return (
                  <>
                    <div className="FlightBox">
                      <div className="flightBox1">
                        <div className="flight-logo">
                          <img
                            src={
                              getAirlineInfo(item.flightID.slice(0, 2)).logoSrc
                            }
                            style={{
                              height: "36px",
                              width: "36px",
                              marginTop: "10px",
                              marginBottom: "7px",
                            }}
                          />
                          <h5>
                            {
                              getAirlineInfo(item.flightID.slice(0, 2))
                                .airlineName
                            }
                          </h5>
                        </div>
                        <div className="flightArrivalTime">
                          <span className="flight-Time">
                            {item.arrivalTime}
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
                              fontSize: "12px",
                            }}
                            className="duration"
                          >
                            {item.duration}hour
                          </span>
                          <hr style={{ width: "170px" }} />
                          <br />
                          <span className="direct" style={{ fontSize: "12px" }}>
                            direct
                          </span>
                        </div>
                        <div className="departureTime">
                          <span className="flight-Time">
                            {item.departureTime}
                          </span>
                          <br />
                          <span className="date-Time">
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
                          onClick={() => {
                            setInfoPopUp(true),
                              setFlightPrice(item.ticketPrice);
                          }}
                        >
                          View details
                        </button>

                        {infoPopUp && (
                          <FlightInfo
                            trigger={infoPopUp}
                            setTrigger={setInfoPopUp}
                          >
                            <div className="mainContent">
                              <div className="name-1">
                                Flight to {destination}
                              </div>
                              <div className="main-duration">
                                direct - {item.duration}hour
                              </div>
                              <div className="detailing">
                                <div className="fly-box1">
                                  <div className="flyfly">
                                    <FontAwesomeIcon
                                      icon={faCircle}
                                      style={{ marginTop: "10px" }}
                                    />
                                    <div className="flightGoingDetail">
                                      <span>
                                        {" "}
                                        {format(
                                          selectedDate[0].startDate,
                                          "dd/MM"
                                        )}{" "}
                                        - {item.arrivalTime}
                                      </span>
                                      <h5>{item.source}</h5>
                                    </div>
                                  </div>
                                  <br />
                                  <FontAwesomeIcon icon={faArrowDown} />

                                  <br />
                                  <div className="flyfly">
                                    <FontAwesomeIcon icon={faCircle} />
                                    <div className="flightGoingDetail">
                                      <span>
                                        {" "}
                                        {format(
                                          selectedDate[0].startDate,
                                          "dd/MM"
                                        )}{" "}
                                        - {item.arrivalTime}
                                      </span>
                                      <h5>{item.destination}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="fly-box2">
                                  <img
                                    src={
                                      getAirlineInfo(item.flightID.slice(0, 2))
                                        .logoSrc
                                    }
                                    className="airline-logo"
                                    style={{ height: "40px", width: "40px" }}
                                  />
                                  <div>
                                    <h5
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {
                                        getAirlineInfo(
                                          item.flightID.slice(0, 2)
                                        ).airlineName
                                      }
                                    </h5>
                                    {/* <br/> */}
                                    <h5
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Flight time {item.duration}
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
                                <h2 style={{ fontSize: "16px" }}>
                                  Included baggage
                                </h2>
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
                                <h2>INR{item.ticketPrice}</h2>
                                <span>Total price for all travellers</span>
                              </div>
                              <button
                                className="flightSelectbtn"
                                onClick={() => {
                                  flightConfirmation(item._id);
                                }}
                              >
                                SELECT
                              </button>
                            </div>
                          </FlightInfo>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
