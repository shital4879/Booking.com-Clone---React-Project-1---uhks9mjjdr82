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
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AIRPORT } from "../../utils";
import { AIRPORTID } from "../../utill";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightHeader = () => {
  // console.log(AIRPORT.city);
  const [id, setId] = useState(AIRPORTID);
  const navigate = useNavigate();
  const hotelInput = useRef();
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
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
  const [citynames,setCityNames] = useState([]);
  const [error,seterror] = useState(false);
  const [toerror,settoerror] = useState(false);
  const [showerror,setshowerror] = useState(false);
  const [fromcitylist,setfromcitylist] = useState([]);
  const [tocitylist,settocitylist] = useState([]);
  const [flightDate, setFlightDate] = useState(dayjs());
  const [dayFromDate, setDayFromDate] = useState(flightDate.format("ddd"))
  const ref = useRef();
  const destinationref = useRef();
  const destref = useRef();
  const contentref = useRef();

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
  // const [selectedDate, setSelectedDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

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
      settocitylist(result.data.airports);
      setfromcitylist(result.data.airports);
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
    fetchCityNames();

    function handleclickoutside(e){
      if(ref.current && !ref.current.contains(e.target) && contentref.current && !contentref.current.contains(e.target)){
        setOpensource(false);
      }
    }
    function handleclickdestination(e){
      if(destinationref.current && !destinationref.current.contains(e.target) && destref.current && !destref.current.contains(e.target)){
        setOpendestination(false);
      }
    }
    document.body.addEventListener("click",handleclickdestination)
    document.body.addEventListener("click",handleclickoutside)
    return()=>{
        document.body.removeEventListener("click",handleclickdestination)
        document.body.removeEventListener("click",handleclickoutside)
      }
  }, []);

  const handleFlight = () => {
    if(source === "" && destination === "" ){
      seterror(true);
      // setshowerror(true);
      settoerror(true);
    }
    else if(source === ""){
      seterror(true);
    }
    else if(destination === ""){
      settoerror(true);
    }
    else{

      navigate(`/flightsearch`, {
        state: {
          source: source,
          destination: destination,
          selectedDate: selectedDate,
          people: people,
        },
      });
    }
  };

  function fromhandleonchange(e){
      setSource(e.target.value);
  }
  function tohandleonchange(e){
    setDestination(e.target.value)
  }

  const handleDate = (value) => {
    setFlightDate(value);
    setDayFromDate(value.format("ddd"));
  };


  return (
    <div>
      <div className="headingflight">
        <h1 className="mainHead">Compare and book flights with ease</h1>
        <h3 className="mainPara">Discover your next dream destination</h3>
      </div>
      <div className="flight-class">
        <select
          className="flightOption"
          style={{cursor:"pointer"}}
        >
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
            style={{cursor:"pointer"}}
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
              onChange={(e) => fromhandleonchange(e)}
              onClick={() => {
                setOpensource(!opensource),seterror(false),setOpendestination(false)
               
              }}
              style={{ paddingRight: "50px", marginRight: "50px",cursor:"pointer" }}
              className="inputflighttext1"
              ref={ref}
              onBlur={hotelInputBlur}
              onFocus={hotelInputFocus}
            />
            {error && <p className="error-message" style={{position:"absolute",top:"40px",backgroundColor:"red",color:"white",padding:"2px 6px 2px 4px",borderRadius:"5px"}}>Please add a location or City.</p>}
            <div
            >
              {opensource && (
                <div
                className="sourcetext"
                  style={{
                    position: "absolute",
                    left: "40px",
                    top: "46px",
                    overflowY: "scroll",
                    right: "-35px",
                    zIndex: "1000",
                    borderRadius: "10px",
                    width: "270px",
                    height: "280px",
                    boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                    cursor:"pointer"
                  }}
                  ref={contentref}
                  >
               
                  {fromcitylist &&
                    fromcitylist
                      .filter((item) => {
                        const lower = item.city.toLowerCase();

                        return lower.startsWith(source) && item.city !== destination;
                      })

                      .map((item) => (
                        <div
                          style={{
                            backgroundColor: "white",
                            paddingLeft: "5px",
                            // zIndex: "1000",
                            padding:"10px 0 10px 10px",
                            height: "35px",
                            marginBottom: "-5px",
                            display: "flex",
                            zIndex: "10000000",
                            marginLeft: "5px",
                            cursor:"pointer"
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
          style={{ fontSize: "22px",cursor:"pointer" }}
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
              onChange={(e) => 
               tohandleonchange(e)
              }
              onClick={() => {setOpendestination(!opendestination),settoerror(false),setOpensource(false)}}
              className="inputflighttext"
              style={{ marginRight: "50px",cursor:"pointer" }}
              id="texttext"
              ref={destinationref}
            />
               {toerror && <p className="error-message" style={{position:"absolute",top:"40px",backgroundColor:"red",color:"white",padding:"2px 6px 2px 4px",borderRadius:"5px"}}>Please add a location or City.</p>}
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
                    top: "46px",
                    width: "270px",
                    height: "280px",
                    boxShadow: "4px 4px 4px 1px rgba(0,0,0,0.4)",
                    overflowY: "scroll",
                    right: "-35px",
                    paddingBottom:"2px",
                    borderRadius: "10px",
                    zIndex:"1000",
                    // padding: "10px",
                    cursor:"pointer"
                  }}
                  className="desti1"
                  ref={destref}
                >
                  {tocitylist &&
                    tocitylist.filter((item) => {
                      const lower = item.city.toLowerCase();

                      return lower.startsWith(destination)  && item.city !== source;
                    }).map((item) => (
                      <div
                        style={{
                          backgroundColor: "white",
                          paddingLeft: "5px",
                          // zIndex: "1000",
                          // overflowY: "scro",
                          height: "35px",
                          marginBottom: "-5px",
                          padding:"10px 0 10px 10px",
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
          style={{ marginLeft:"",cursor:"pointer" }}
        >
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="headerIcon"
            id="headerIcon1"
          />
          {/* <span className="headerSearchText1" id="texttext">{`${format(
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
          )} */}

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ backgroundColor: "rgb(244, 245, 245)", height: 60 }}
                label="Departure"
                value={selectedDate}
                onChange={(value) => handleDate(value)}
                textField={(props) => <TextField {...props} />}
                minDate={dayjs()}
              />
            </LocalizationProvider> */}

          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a date"
             className="custom-datepicker"
             minDate={new Date()}
        />


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


      <div className="static">
        <div className="" style={{position:"relative"}}>

        <h2 className="findhomes" onClick={()=>notifyError()}>
          Find Homes
          {/* <div style={{color:"white"}}>Homes</div>  */}
          {/* <br /> */}
          <br />
          for your next Trip
        </h2>
        <h1 style={{height:"80px",width:"80px",backgroundColor:"#0d49a2",position:"absolute",top:"140px",left:"200px",borderRadius:"50%"}}></h1>
        </div>
        <img
          className="staticimg"
          src="https://cf.bstatic.com/psb/capla/static/js/../../static/media/bh_aw_cpg_main_image.b4347622.png"
        />

      </div>

      <div className="mab">
        <div className="abc">
          <img
            className="classimg"
            src="https://t-cf.bstatic.com/design-assets/assets/v3.117.0/illustrations-traveller/MagnifyingGlassUsp.png"
          />
          <div className="acd">
            <h3>Search a huge selection</h3>
            <p>Easily compare flights, airlines and prices - all in one place</p>
          </div>
        </div>
        <div className="bcd">
          <img
            className="classimg"
            src="https://t-cf.bstatic.com/design-assets/assets/v3.117.0/illustrations-traveller/MoneyUsp.png"
          />
          <div className="">
            <h3>Pay no hidden fees</h3>
            <p>Get a clear price breakdown, every step of the way</p>
          </div>
        </div>
        <div className="def">
          <img
            className="classimg"
            src="https://t-cf.bstatic.com/design-assets/assets/v3.117.0/illustrations-traveller/TicketsUsp.png"
          />
          <div className="">
            <h3>Get more flexibility</h3>
            <p>Change your travel dates with the Flexible ticket option*</p>
          </div>
        </div>
      </div>

  

    </div>
  );
};

export default FlightHeader;
