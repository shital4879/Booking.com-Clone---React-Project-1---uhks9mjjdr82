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

<div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
    <table className="tablefooterflight" >
      <thead>
        <tr>
          <th>Support</th>
          <th>Discover
          </th>
          <th>Terms and settings</th>
          <th>Partners</th>
          <th>About</th>
        </tr>
      </thead>
      
         <td>
            <tr>Coronavirus (COVID-19) FAQs


</tr>
            <tr>Manage your trips</tr>
            <tr>Customer Service help</tr>
            <tr>Safety resource centre</tr>
         
         </td>
         <td>
            <tr>Genius loyalty programme</tr>
            <tr>Seasonal and holiday deals</tr>
            <tr>Travel articles</tr>
            <tr>Booking.com for Business</tr>
            <tr>Traveller Review Awards</tr>
            <tr>Car hire</tr>
         </td>
         <td>
            <tr>Privacy & cookies</tr>
            <tr>Terms and conditions</tr>
            <tr>Modern Slavery Statement</tr>
            <tr>Human Rights Statement</tr>
         </td>
         <td>
            <tr>Extranet login</tr>
            <tr>Partner help</tr>
            <tr>List your property</tr>
            <tr>Become an affiliate</tr>
         </td>
         <td>
            <tr>About Booking.com</tr>
            <tr>How we work</tr>
            <tr>Sustainability</tr>
            <tr>Press centre</tr>
            <tr>Careers</tr>
            <tr>Investor relations</tr>
            <tr>Corporate contact</tr>
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