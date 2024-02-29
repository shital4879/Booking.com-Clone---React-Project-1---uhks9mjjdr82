import React, { useEffect, useState } from "react";
import "./searchHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import HotelInfo from "../Info/HotelInfo";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
// import { json, useNavigate } from "react-router-dom";
// import{
//   faCalendarDays,
//   faBed
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Search = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(900);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [properties, setProperties] = useState([]);
  const [sortOption, setSortOption] = useState("avgCostPerNight");
  const [searchdata, setSearchdata] = useState();
  const location = useLocation();
  console.log(location);
  // console.log(location.state);
  const data = location.state;
  console.log("looooooo", data);
  // const destination = location.state.destination;
  // console.log("kkkkkk", destination);
  // setSearchdata(data);
  // const selectedDate = location.state.selectedDate;
  // const openbookingDate = location.state.openbookingDate;
  const [destination, setDestination] = useState(location.state.destination);
  const [openbookingDate, setOpenBookingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [bookingPersons, setBookingPersons] = useState(false);
  // const persons = location.state.persons
  const [persons, setPersons] = useState(location.state.persons);
  // const [openbookingDate, setOpenBookingDate] = useState(false);
  console.log("koooooo", selectedDate);

  useEffect(() => {
    console.log("hi", data);
  }, [data]);

  // const sortOpt = async () => {
  //   try {
  //     const sortResponse = await fetch(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"sortOpt":"${destination}"&sort={"{"
  //       avgCostPerNight
  //       ":1}"}}`,
  // &sort={"{"avg":1}"}
  //       {
  //         method: "GET",
  //         headers: { projectID: "uhks9mjjdr82" },
  //         "Content-Type": "application/json",
  //       }
  //     );
  //     const result = await sortResponse.json();
  //     setSearchdata(result.data);

  //   } catch (error) {
  //     return error;
  //   }
  // };

  // useEffect(() => {
  //   sortOpt();
  // }, []);

  // const handleSortChange = (order) => {
  //   setSortOrder(order);
  // };

  // const sortProperties = (a, b) => {
  //   const priceA = a.price;
  //   const priceB = b.price;

  //   if (sortOrder === "lowToHigh") {
  //     return priceA - priceB;
  //   } else {
  //     return priceB - priceA;
  //   }
  // };

  // const sortedProperties =[...properties].sort(sortProperties);

  // const handleSortChange = (option) => {
  //   setSortOption(option);
  // };

  // const sorting = () => {
  //   sortOpt()
  //     .then((sortResponse) => {
  //       console.log("hiiiiii",sortResponse);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleOption = (name, operation) => {
    setPersons((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? persons[name] + 1 : persons[name] - 1,
      };
    });
  };

  const hotelinfo = () => {
    navigate(`/info`, { state: data, destination, selectedDate, persons });
  };

  return (
    <div>
      <div className="head1">
        <div className="headerSearch">
          <div className="headerSearchItem">
            {/* <FontAwesomeIcon icon={faBed} className="headerIcon" /> */}
            <input
              type="text"
              className="HeaderSearchInput"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value), e.preventDefault();
              }}
              style={{ color: "rgb(90, 88, 88)" }}
            />
            {/* onChange={(e)=>setDestination(e.target.value)} */}
          </div>
          <div
            className="headerSearchItem"
            id="searchitem"
            onClick={() => setOpenBookingDate(!openbookingDate)}
          >
            {/* <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> */}
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

          <div className="headerSearchItem">
            {/* <div className="headerSearchText">
           <span>adult
           </span>
           <input type="text" placeholder={persons.adult}/>
          </div> */}

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
          <div className="headerSearchItem" id="searchbtn">
            <button
              className="headerBtn"
              // onClick={handleHotelSearch}
            >
              Search
            </button>
          </div>

          {/* <div className="headerSearchItem">
          <FontAwesomeIcon icon={faUser} className="headerIcon" />
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
        </div> */}
          {/* <div className="headerSearchItem" id="searchbtn">
          <button className="headerBtn" onClick={handleHotelSearch}>
            Search
          </button> */}
          {/* onClick={findingHotel} */}
          {/* </div> */}
        </div>
      </div>

      <div className="mainSearch">
        <div className="mainfilter">
          <br />
          <h3 className="fliterby">Filter by:</h3>
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
              <div className="property">
                <div className="property-type">Property-type</div>
                <input
                  type="checkbox"
                  id="hotel-type"
                  name="hotel-type"
                  className="inputHotel"
                />
                <label for="hotel-type" className="hotelType">
                  Hotel
                </label>
                <br />
                <input
                  type="checkbox"
                  id="family-type"
                  name="family-type"
                  className="inputHotel"
                />
                <label for="family-type" className="hotelType">
                  Family friendly properties
                </label>
                <br />
                <input
                  type="checkbox"
                  id="apartment"
                  name="apartment"
                  className="inputHotel"
                />
                <label for="apartment" className="hotelType">
                  Apartments
                </label>
                <br />
                <input
                  type="checkbox"
                  id="hostels"
                  name="hostels"
                  className="inputHotel"
                />
                <label for="hostels" className="hotelType">
                  Hostels
                </label>
                <br />
                <input
                  type="checkbox"
                  id="guest-houses"
                  name="guest-houses"
                  className="inputHotel"
                />
                <label for="guest-houses" className="hotelType">
                  Guest houses
                </label>
                <br />
                <input
                  type="checkbox"
                  id="homestays"
                  name="homestays"
                  className="inputHotel"
                />
                <label for="homestays" className="hotelType">
                  Homestays
                </label>
                <br />
                <input
                  type="checkbox"
                  id="bed-breakfasts"
                  name="bed-breakfasts"
                  className="inputHotel"
                />
                <label for="bed-breakfasts" className="hotelType">
                  Bed and breakfasts
                </label>
                <br />
                <input
                  type="checkbox"
                  id="villas"
                  name="villas"
                  className="inputHotel"
                />
                <label for="villas" className="hotelType">
                  Villas
                </label>
                <br />
                <input
                  type="checkbox"
                  id="Resorts"
                  name="Resorts"
                  className="inputHotel"
                />
                <label for="Resorts" className="hotelType">
                  Resorts
                </label>
                <br />
                <input
                  type="checkbox"
                  id="lodges"
                  name="lodges"
                  className="inputHotel"
                />
                <label for="lodges" className="hotelType">
                  Lodges
                </label>
                <br />
                <input
                  type="checkbox"
                  id="farm-stays"
                  name="farm-stays"
                  className="inputHotel"
                />
                <label for="farm-stays" className="hotelType">
                  Farm stays
                </label>
              </div>
              <br />
              <hr style={{ border: "0.1px solid gray" }} />
              <br />
              <div className="searchbarbox-3">
                <div className="property-rate">
                  <div className="property-rating">Property rating</div>
                  <input
                    type="checkbox"
                    id="1-star"
                    name="1-star"
                    className="inputRating"
                  />
                  <label for="1-star" className="ratingType">
                    1 star
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="2-star"
                    name="2-star"
                    className="inputRating"
                  />
                  <label for="2-star" className="ratingType">
                    2 star
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="3-star"
                    name="3-star"
                    className="inputRating"
                  />
                  <label for="3-star" className="ratingType">
                    3 star
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="4-star"
                    name="4-star"
                    className="inputRating"
                  />
                  <label for="4-star" className="ratingType">
                    4 star
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="5-star"
                    name="5-star"
                    className="inputRating"
                  />
                  <label for="5-star" className="ratingType">
                    5 star
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="unrated"
                    name="unrated"
                    className="inputRating"
                  />
                  <label for="unrated" className="ratingType">
                    Unrated
                  </label>
                  <br />

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="searchbox2">
          <div className="sortoption">
            <div>
              <br />
              <FontAwesomeIcon icon={faArrowsUpDown} className="sortlogo" />
              <select className="sort">
                <option>Sort By</option>
                {/* <option value="default"></option> */}
                <option
                //  onChange={(e) => handleSortChange(e.target.value)}
                >
                  {" "}
                  Price (Low to High)
                </option>
                <option value="lowToHigh">Price (High to Low)</option>
                <option>Customer Ratings</option>
              </select>
              {/* <ul>
                {sortedProperties.map((property) => (
                  <li key={property.id}>
                    <p>{property.name}</p>
                    <p>{property.price}</p>
                    Other property details
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
          {data.data.hotels.map((item) => {
            return (
              <div className="searchOptions">
                <div className="searchCard">
                  <div className="card-1">
                    <img src={item.images[0]} className="hotelimg" onClick={hotelinfo}/>
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
                      ₹ {(item.avgCostPerNight / 9).toFixed(2)}taxes and charges
                    </div>
                    <button className="box-E" onClick={hotelinfo}>
                      See availability <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
