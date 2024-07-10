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

<div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginTop:"100px "}}>
    <table className="tablefooterflight" style={{border:"none"}} >
      <thead style={{border:"none"}}>
        <tr style={{border:"none"}}>
          <th style={{border:"none"}}>Support</th>
          <th style={{border:"none"}}>Discover
          </th>
          <th style={{border:"none"}}>Terms and settings</th>
          <th style={{border:"none"}}>Partners</th>
          <th style={{border:"none"}}>About</th>
        </tr>
      </thead>
      
         <td className="none" style={{border:"none"}}>
            <tr style={{border:"none"}}>Coronavirus (COVID-19) FAQs


</tr>
            <tr style={{border:"none"}}>Manage your trips</tr>
            <tr style={{border:"none"}}>Customer Service help</tr>
            <tr style={{border:"none"}}>Safety resource centre</tr>
         
         </td>
         <td style={{border:"none"}}>
            <tr style={{border:"none"}}>Genius loyalty programme</tr>
            <tr style={{border:"none"}}>Seasonal and holiday deals</tr>
            <tr style={{border:"none"}}>Travel articles</tr>
            <tr style={{border:"none"}}>Booking.com for Business</tr>
            <tr style={{border:"none"}}>Traveller Review Awards</tr>
            <tr style={{border:"none"}}>Car hire</tr>
         </td>
         <td style={{border:"none"}}>
            <tr style={{border:"none"}}>Privacy & cookies</tr>
            <tr style={{border:"none"}}>Terms and conditions</tr>
            <tr style={{border:"none"}}>Modern Slavery Statement</tr>
            <tr style={{border:"none"}}>Human Rights Statement</tr>
         </td>
         <td style={{border:"none"}}>
            <tr style={{border:"none"}}>Extranet login</tr>
            <tr style={{border:"none"}}>Partner help</tr>
            <tr style={{border:"none"}}>List your property</tr>
            <tr style={{border:"none"}}>Become an affiliate</tr>
         </td>
         <td style={{border:"none"}}>
            <tr style={{border:"none"}}>About Booking.com</tr>
            <tr style={{border:"none"}}>How we work</tr>
            <tr style={{border:"none"}}>Sustainability</tr>
            <tr style={{border:"none"}}>Press centre</tr>
            <tr style={{border:"none"}}>Careers</tr>
            <tr style={{border:"none"}}>Investor relations</tr>
            <tr style={{border:"none"}}>Corporate contact</tr>
         </td>
     </table>


     </div>

     <div>
    <p style={{display:"flex",justifyContent:"center",marginBottom:"20px",color:"gray",marginTop:"100px"}}>Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.</p>
    <div className="footerimg">
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png" style={{marginRight:"50px"}}/>
    </div>
</div>
 </div>
)
}
export default Flight;