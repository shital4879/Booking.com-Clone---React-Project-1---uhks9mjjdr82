import React from "react";
import "./home.css";
import Navbar from "../../component/navbar/Navbar";
import Header from "../../component/header/Header";
import Offer from "../../component/offer/OfferSearch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {


  const toasts = ()=>{
    // toast("Feature is coming soon.");
    toast.info('Feature is coming soon', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // fontSize:"25px"
      // transition: Bounce,
      });
  }

  return (
    <div>
      <Navbar />
      <Header />
      <Offer />

      <div className="" style={{marginTop:"100px"}}>
        <div className="properydiv">
          <button className="propertybtn" onClick={toasts}>List your property</button>
        </div>
      </div>
      <div className="below">
        <button className="ad" onClick={toasts} >Mobile Version</button>
        <button className="ad" onClick={toasts}>Your Account</button>
        <button className="ad" onClick={toasts}>Make changes to booking online</button>
        <button className="ad" onClick={toasts}>Customer service help</button>
        <button className="ad" onClick={toasts}>Booking.com for business</button>
      </div>

      <div className="footer1">
        <div>
          <h4 className="os">Countries</h4>
          <h4 className="os">Regions</h4>
          <h4 className="os">Cities</h4>
          <h4 className="os">Districts</h4>
          <h4 className="os">Airports</h4>
          <h4 className="os">Hotels</h4>
          <h4 className="os">Places of interest</h4>
        </div>
        <div>
          <h4 className="os">Homes</h4>
          <h4 className="os">Apartments</h4>
          <h4 className="os">Resorts</h4>
          <h4 className="os">Villas</h4>
          <h4 className="os">Hostels</h4>
          <h4 className="os">Guest Houses</h4>
        </div>
        <div>
          <h4 className="os">Unique places to stay</h4>
          <h4 className="os">All destinations</h4>
          <h4 className="os">All flight destinations</h4>
          <h4 className="os">All car hire locations</h4>
          <h4 className="os">All holiday destinations</h4>
          <h4 className="os">Reviews</h4>
          <h4 className="os">Discover monthly stays</h4>
        </div>
        <div>
          <h4 className="os">Car hire</h4>
          <h4 className="os">Flight finder</h4>
          <h4 className="os">Restaurant reservations</h4>
          <h4 className="os">Booking.com for Travel Agents</h4>
        </div>
        <div>
          <h4 className="os">Coronavirus (COVID-19) FAQs</h4>
          <h4 className="os">About Booking.com</h4>
          <h4 className="os">Customer Service help</h4>
          <h4 className="os">Partner help</h4>
          <h4 className="os">Careers</h4>
          <h4 className="os"> How we work</h4>
          <h4 className="os">Privacy & Cookie Statement</h4>
          <h4 className="os">Modern Slavery Statement</h4>
          <h4 className="os">Human Rights Statement</h4>
        </div>
      </div>

<div>
    <p style={{display:"flex",justifyContent:"center",marginBottom:"20px",color:"gray",}}>Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.</p>
    <div className="footerimg">
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png" style={{marginRight:"50px"}}/>
        <img src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png" style={{marginRight:"50px"}}/>
    </div>
</div>


<ToastContainer 
       position="bottom-left"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      //  transition: "Bounce"
        />

    </div>
  );
};

export default Home;
