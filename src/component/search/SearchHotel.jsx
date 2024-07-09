import React, { useEffect, useMemo, useState } from "react";
import "./searchHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import HotelInfo from "../Info/HotelInfo";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SignOut from "../register/SignOut";

const Search = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(900);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [properties, setProperties] = useState([]);
  const [sortOption, setSortOption] = useState("avgCostPerNight");
  const [searchdata, setSearchdata] = useState();
  const location = useLocation();
  const data = location.state;
  console.log(location.state,"data");
  const [fetchingData, setFetchingData] = useState(location.state);
  const [opendestination, setOpenDestination] = useState(false);
  const [fetchData, setFetchData] = useState();
  const [destination, setDestination] = useState(location.state.destination);
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [bookingPersons, setBookingPersons] = useState(false);
  const [persons, setPersons] = useState(location.state.persons);
  const [sort, setsort] = useState("");
  const [toggle, settoggle] = useState(false);
  const [searchinput, setsearchinput] = useState(destination);
  const [rating, setrating] = useState({
    one: true,
    two: true,
    three: true,
    four: true,
    five: false,
  });
  function ratingchecker(key) {
    setrating((prev) => ({ ...prev, [key]: !rating[key] }));
  }
  // &filter={"price":{"$lte":${maxPrice},"$gte":${minPrice}}}
  const fetchresult = useMemo(async () => {
    try {
      const sortResponse = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchinput}"}       
        ${
          sort != ""
            ? `&sort={"${sort == "rating" ? "rating" : "avgCostPerNight"}":"${
                sort == "highToLow" ? -1 : 1
              }"}`
            : ""
        }`,
        {
          method: "GET",
          headers: { projectID: "uhks9mjjdr82" },
          "Content-Type": "application/json",
        }
      );
      const result = await sortResponse.json();
      setFetchData(result.data.hotels);
      console.log(result.data.hotels);
     
    } catch (error) {
      console.log(error);
    }
  }, [sort, maxPrice, minPrice, toggle]);

  useEffect(() => {
    fetchresult;
  }, []);

  const SelfNavigate = () => {
    if (searchinput != "") {
      navigate(`/hotel/destination=${searchinput}`, {
        state: {
          data: location.state.data,
          destination: searchinput,
          selectedDate: location.state.selectedDate,
          openbookingDate: location.state.openbookingDate,
          persons: location.state.persons,
          bookingPersons: location.state.bookingPersons,
        },
      });
    }
  };

  const handleOption = (name, operation) => {
    setPersons((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? persons[name] + 1 : persons[name] - 1,
      };
    });
  };

  const hotelinfo = (val) => {
    navigate(`/info/${val}`, {
      state: {
        data: location.state.data,
        selectedId: val,
        destination: location.state.destination,
        selectedDate: location.state.selectedDate,
        openbookingDate: location.state.openbookingDate,
        persons: location.state.persons,
        bookingPersons: location.state.bookingPersons,
        // selectedDate:selectedDate
      },
    });
  };

  return (
    <div>
      <div className="head1">
        <div className="headerSearch" id="headerSearch">
        <div className="searching">
          <div className="headerSearchItemA" style={{position: "relative"}} id="idsearch">
            {/* <FontAwesomeIcon icon={faBed} className="headerIcon" /> */}
            <input
              type="text"
              className="HeaderSearchInput"
              id="id12"
              value={searchinput}
              onChange={(e) => {
                setsearchinput(e.target.value), e.preventDefault()
              }}
              onClick={()=>{
                
                setOpenDestination(!opendestination);
              }}
              style={{  marginLeft: "10px" }}
            />
{/*             
            <div>
                {opendestination && (
                  <div
                    className="styledest"
                    style={{
                      position: "absolute",
                      top: "40px",
                      width: "100%",
                      height: "300px",
                      // overflowY: "hidden",
                      overflow:"scroll",
                      right: "-35px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      zIndex: "1000",
                      boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.4)",
                      padding: "10px",
                      cursor:"pointer",
                    }}
                    // ref={contentref}
                  >
                    {data &&
                      data
                        .filter((item) => {
                          const lower = item.location.toLowerCase();

                          return lower.startsWith(destination);
                        })
                        .map((item) => (
                          <div
                            className="locationData "
                            onClick={(e) => {
                              setDestination(item.location),
                                setOpenDestination(!opendestination)
                                
                            }}
                          >
                            {item.location}
                          </div>
                        ))}
                  </div>
                )}
              </div> */}
          </div>
          <div
            className="headerSearchItemA"
            id="idDate1"
            onClick={() => setOpenBookingDate(!openbookingDate)}
          >
            {/* <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> */}
            <span className="headerSearchText1" id="textdate">{`${format(
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

          <div className="headerSearchItem12">
            <span
              onClick={() => setBookingPersons(!bookingPersons)}
              id="idPeople1"
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
          <button
              className="headerBtn"
              id="self"
              onClick={() => {
                SelfNavigate(), searchinput != "" ? settoggle(!toggle) : "";
              }}
            >
              Search
            </button>
         
        </div>
      </div>

      <div className="mainSearch">
        <div className="mainfilter">
          <br />
          <h3 className="fliterby" style={{ marginLeft: "-15px" }}>
            Filter by:
          </h3>
          <br />
          <div className="searchbox1">
            <div className="searchbarbox-1">
              <div className="budget">Your budget (per night)</div>
              <div className="filter-1">
                <div className="field">
                  <span>₹</span>
                  <input type="number" className="input-min" value={minPrice} />
                </div>
                <div className="between" style={{ fontSize: "20px" }}>
                  -
                </div>

                <div className="field">
                  <span>₹</span>
                  <input type="number" className="input-max" value={maxPrice} />
                </div>
              </div>
              <div className="slider">
                <div className="progress"></div>
              </div>
              <div className="input-range">
                <input
                  type="range"
                  className="range-min"
                  min={900}
                  max={6000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="range"
                  className="range-max"
                  min={900}
                  max={6000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="searchbarbox-2">
              <div className="searchbarbox-3">
                <div className="property-rate">
                  <div className="property-rating">Property rating</div>
                  <div
                    onClick={() => {
                      ratingchecker("one");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="1-star"
                      name="1-star"
                      className="inputRating"
                      checked={rating["one"]}
                    />
                    <label for="1-star" className="ratingType">
                      1 star
                    </label>
                  </div>

                  <div
                    onClick={() => {
                      ratingchecker("two");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="2-star"
                      name="2-star"
                      className="inputRating"
                      checked={rating["two"]}
                    />
                    <label for="2-star" className="ratingType">
                      2 star
                    </label>
                  </div>

                  <div
                    onClick={() => {
                      ratingchecker("three");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="3-star"
                      name="3-star"
                      className="inputRating"
                      checked={rating["three"]}
                    />
                    <label for="3-star" className="ratingType">
                      3 star
                    </label>
                  </div>

                  <div
                    onClick={() => {
                      ratingchecker("four");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="4-star"
                      name="4-star"
                      className="inputRating"
                      checked={rating["four"]}
                    />
                    <label for="4-star" className="ratingType">
                      4 star
                    </label>
                  </div>

                  <div
                    onClick={() => {
                      ratingchecker("five");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="5-star"
                      name="5-star"
                      className="inputRating"
                      checked={rating["five"]}
                      onChange={() => {
                        console.log(rating["five"]);
                      }}
                    />
                    <label for="5-star" className="ratingType">
                      5 star
                    </label>
                  </div>

                  <br />

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="searchbox2" style={{ marginTop: "-10px" }}>
          <div className="sortoption" style={{ marginLeft: "20px" }}>
            <div>
              <br />
              <FontAwesomeIcon icon={faArrowsUpDown} className="sortlogo" />
              <select
                className="sort"
                onChange={(e) => {
                  setsort(e.target.value), console.log(e.target.value);
                }}
              >
                <option style={{ fontWeight: "400" }}>Sort By</option>
                <option style={{ border: "5px solid black" }} value="lowToHigh">
                  Price (Low to High)
                </option>
                <option value="highToLow">Price (High to Low)</option>
                <option value="rating">Customer Ratings</option>
              </select>
            </div>
          </div>
          {fetchData &&
            fetchData.filter(item =>{
              return +item.avgCostPerNight >= minPrice && +item.avgCostPerNight <= maxPrice
            }).map(
              (item) =>
                (item.rating == 1 || item.rating == 1.5
                  ? rating["one"]
                  : true && (item.rating == 2 || item.rating == 2.5)
                  ? rating["two"]
                  : true && (item.rating == 3 || item.rating == 3.5)
                  ? rating["three"]
                  : true && (item.rating == 4 || item.rating == 4.5)
                  ? rating["four"]
                  : true && (item.rating == 5 || item.rating == 5.5)
                  ? rating["five"]
                  : true) && (
                  <div className="searchOptions" style={{ marginTop: "10px" }}>
                    <div className="searchCard">
                      <div className="card-1">
                        <img
                          src={item.images[0]}
                          className="hotelimg"
                          onClick={hotelinfo}
                        />
                      </div>
                      <div className="card-2">
                        <div className="hotelName">{item.name}</div>
                        <div className="locationName">{item.location}</div>
                        <div className="box1">
                          <span className="card-box1">
                            {item.rooms[0].roomType}
                          </span>
                          <br />
                          <span className="card-box2">
                            {item.rooms[0].bedDetail}
                          </span>
                          <br />
                          <span className="card-box3">
                            {item.rooms[0].cancellationPolicy}
                          </span>
                        </div>
                      </div>
                      <div className="card-3">
                        <div className="box-A">
                          Rating
                          <p className="rating">{item.rating}</p>
                        </div>
                        <div className="box-B">2 nights, 2 adults</div>
                        <div className="box-C">
                          ₹ {item.avgCostPerNight.toFixed(0)}
                        </div>
                        <div className="box-D">
                          ₹ {(item.avgCostPerNight / 9).toFixed(2)}taxes and
                          charges
                        </div>
                        <button
                          className="box-E"
                          onClick={() => {
                            hotelinfo(item._id);
                          }}
                        >
                          See availability{" "}
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Search;
