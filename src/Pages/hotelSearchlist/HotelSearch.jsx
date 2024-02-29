import React from 'react'
import "./hotelsearch.css"
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import SearchHotel from '../../component/search/SearchHotel'


const HotelSearch = () => {
 
  return (
    <div>
      <Navbar type="list"/>
      {/* <Header/> */}
      <SearchHotel/>
    </div>
  )
}

export default HotelSearch;
