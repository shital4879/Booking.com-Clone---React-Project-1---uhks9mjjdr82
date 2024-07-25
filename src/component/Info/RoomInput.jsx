import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleRoof,
  faBanSmoking,
  faWifi,
  faPeopleGroup,
  faChair,
  faFan,
  faMugSaucer,
  faSink,
  faCheck,
  faBed,
  faUsersViewfinder,
  faOutdent,
  faKitchenSet,
  faPersonBooth,
  faCouch,
  faTv,
  faSquareParking,
  faLock,
  faClock,
  faComments,
  faMagnifyingGlass,
  faCalendarDays,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function RoomInput({item,information,hotelPaymentPage,setinputval,inputval}) {
//   const [inputval, setinputval] = useState("");

  return (
       <tr className="tableline">
                      <td>
                        {" "}
                        <div className="typeRoom">{item.roomType} Room</div>
                        <div
                          className="bedType"
                          style={{
                            fontSize: "14px",
                            fontFamily: "lighter",
                            color: "rgb(90, 88, 88)",
                            gap: "10px",
                          }}
                        >
                          {information.rooms[0].bedDetail}
                          <FontAwesomeIcon
                            icon={faBed}
                            className="bed"
                            style={{ marginLeft: "7px" }}
                          />
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          ₹ {item.costPerNight}
                        </div>
                        <div>
                          + ₹{information.rooms[0].costDetails.taxesAndFees}{" "}
                          taxes and charges
                        </div>
                        <button className="offpay">40% off</button>
                        <br />
                        <button className="limitedDeal">
                          Limited time deal
                        </button>
                      </td>

                      <td>
                        <div
                          className="choices"
                          // style={{ fontFamily: "lighter" }}
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          Non refundable
                        </div>
                        <div
                          className="cancellationPolicy"
                          style={{ fontFamily: "lighter", color: "green" }}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="divisioncol-logo"
                            style={{
                              marginRight: "5px",
                              fontFamily: "lighter",
                            }}
                          />
                          {information.rooms[0].cancellationPolicy}
                        </div>
                      </td>
                      <td>
                        {/* <RoomInput inputval={inputval} setinputval={setinputval} /> */}
                        <input
                          type="number"
                          placeholder="0"
                          value={inputval}
                          style={{
                            width: "60px",
                            height: "25px",
                            marginLeft: "50px",
                            textAlign: "center",
                          }}
                          onChange={(e) => {
                            setinputval(e.target.value);
                          }}
                          required
                        />
                        {/* {showerror && <p className="error-message" style={{position:"absolute",top:"40px",backgroundColor:"red",color:"white",padding:"2px 6px 2px 4px",borderRadius:"5px"}}>Please add a location to search.</p>} */}
                      </td>
                      <td>
                        {" "}
                        <button
                          id="reserveBtn"
                          className="reserveBtn"
                          style={{
                            marginLeft: "40px",
                          }}
                          onClick={() => {
                            hotelPaymentPage(item.costPerNight);
                          }}
                        >
                          Reserve
                        </button>
                      </td>
                    </tr>
  );
}
