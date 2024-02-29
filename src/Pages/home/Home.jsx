import React from "react";
import "./home.css";
import Navbar from "../../component/navbar/Navbar";
import Header from "../../component/header/Header";
import Offer from "../../component/offer/OfferSearch";

const Home = ()=>{
    return(
       <div>
        <Navbar/>
        <Header/>
        <Offer/>
        </div>
    )
}

export default Home;