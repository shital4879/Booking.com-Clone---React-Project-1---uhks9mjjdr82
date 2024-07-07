import React, { useContext, useEffect, useMemo, useState } from "react";
import FlightSearch from "./FlightSearch";
import { AIRPORT } from "../../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./flightdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faBriefcase,
  faCircle,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { MyContext } from "../../components/App";

const FlightDetail = () => {
  const { setfendate, fstartdate, setfstartdate, fenddate } =
    useContext(MyContext);
  const location = useLocation();
  const navigation = useNavigate();
  const selectedDate = location.state.selectedDate;
  console.log(selectedDate);
  const params = useParams();
  console.log(params.id);
  const [data, setData] = useState();
  const fetchHotelData = useMemo(async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${params.id}`,
        {
          method: "GET",
          headers: {
            projectID: "uhks9mjjdr82",
          },
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      setData(result.data);
      console.log("reho", result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHotelData;
  }, []);

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
      navigation(`/flightconfirm/${fid}`, {
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
    setfstartdate(selectedDate[0].startDate);
    setfendate(selectedDate[0].endDate);
    localStorage.setItem("flightid", params.id);
  }, []);
  console.log(fstartdate, "start");

  return (
    <div className="detail-A">
      <div className="contex">
        <div className="mainContent">
          {data && (
            <>
              <div
                style={{
                  display: "flex",
                  marginRight: "50px",
                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ fontSize: "19px", marginBottom: "20px" }}>
                  Your flight to {data.destination}
                </h2>
                <button onClick={() => navigation(-1)} className="nobtn">
                  X
                </button>
              </div>
              <div className="mainContent">
                <div className="name-1">Flight to {data.destination}</div>
                <div className="main-duration">
                  {data.stops == 1
                    ? "1 stop"
                    : data.stops == 0
                      ? "direct"
                      : data.stops >= 2
                        ? "any"
                        : "1 stop"}
                  -{data.duration}hour
                </div>

                <div className="detailing">
                  <div className="fly-box1">
                    <div className="flyfly" style={{ marginBottom: "-20px" }}>
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{ marginTop: "10px" }}
                      />
                      <div className="flightGoingDetail">
                        <span>
                          {" "}
                          {format(selectedDate[0].startDate, "dd/MM")} -{" "}
                          {data.departureTime}
                        </span>
                        <h5>{data.source}</h5>
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
                          {" "}
                          {format(selectedDate[0].startDate, "dd/MM")} -{" "}
                          {data.arrivalTime}
                        </span>
                        <h5>{data.destination}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="fly-box2">
                    <img
                      src={getAirlineInfo(data.flightID.slice(0, 2)).logoSrc}
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
                        {getAirlineInfo(data.flightID.slice(0, 2)).airlineName}
                      </h5>
                      {/* <br/> */}
                      <h5
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        Flight time {data.duration} hour
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="baggage-detail" style={{ paddingTop: "15px" }}>
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
                  <h2>INR{data.ticketPrice}</h2>
                  <span>Total price for all travellers</span>
                </div>
                <button
                  className="flightSelectbtn"
                  onClick={() => {
                    flightConfirmation(data.ticketPrice);
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
  );
};

export default FlightDetail;
//
