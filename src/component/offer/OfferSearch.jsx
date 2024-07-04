import React,{useEffect, useState, Component}from 'react'
import "./offerSearch.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Offer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false

  };


    const [offers, setOffers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const[offerData,setOfferData] = useState([]);
   
      const offerSearch = async()=>{
        try{
           const responce = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"HOTELS"}`,{
           method: "GET",
           headers: {projectID: "uhks9mjjdr82"},
           "Content-Type": "application/json"
      }
      );
      const res = await responce.json();
      setOfferData(res.data.offers)
      // console.log(res.data.offers);
      }
      catch (error) {
        return error;
      }
      };
      useEffect(()=>{
       offerSearch();
      },[])


      

  return (
    <div>
      <div className='offer'>
    <div className="offers-section">
      <div className='offers-tag'>Offer</div>
      <p className="offer-text">Promotions, deals and special offers for you</p>
      </div>


       <Slider {...settings}>
        
      {
       offerData.map((currele) => {
        return(
          <div className='offerCon'>
        <div className="container">
         <div className="offerheadingcon">
           <h1 className='offerHeading'>{currele.pTl}</h1>
           <p className='offerpara'>{currele.pTx}</p>
        </div>
        <img src={currele.heroUrl} alt={currele.type} className='h-44 w-44 hi'/>
       </div>
       </div>
        )
        })
       }
     </Slider>
     </div>
    </div>
  )
}

export default Offer
