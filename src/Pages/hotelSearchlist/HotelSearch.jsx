import React,{useState} from 'react'
import "./hotelsearch.css"
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import SearchHotel from '../../component/search/SearchHotel'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignOut from '../../component/register/SignOut'
import Nav from '../../component/navbar/Nav'

const HotelSearch = () => {
  const [openSign, setOpenSing] = useState(false);
  const navigate = useNavigate();
 
  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };

  const [activeButton, setActiveButton] = useState(0);


  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  return (
    <div>
      <Nav/>
      <SearchHotel/>
    </div>
  )
}

export default HotelSearch;
