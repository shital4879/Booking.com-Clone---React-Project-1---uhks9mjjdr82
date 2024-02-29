import React from "react";
import "./flight.css";
import Navbar from "../../component/navbar/Navbar";
import FlightHeader from "./FlightHeader";
import FlightOffer from "./FlightOffer";
import FlightSearch from "./FlightSearch";

const Flight=()=>{
return(
 <div>
    <Navbar type="list"/>
    <FlightHeader/>
    <FlightOffer/>
    {/* <FlightSearch/> */}
 </div>
)
}
export default Flight;