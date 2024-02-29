import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../styles/App.css";
// import { faBed, faPlane } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import Home from "../home/Home";
import Flight from "../Pages/Flight/Flight";
import Home from "../Pages/home/Home";
import HotelSearch from "../Pages/hotelSearchlist/HotelSearch";
import HotelInfo from "../component/Info/HotelInfo";
import Hotelimg from "../component/Info/Hotelimg";
import FlightSearch from "../Pages/Flight/FlightSearch";
import FlightConfirm from "../Pages/Flight/FlightConfirm";
import FlightPayment from "../Pages/Flight/FlightPayment";
// import HotelInfo from "../Pages/Info/HotelInfo"


function App() {
  return (
    
      <BrowserRouter>
      <Routes>
         <Route path="/flight" element={<Flight/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel/:results" element={<HotelSearch/>}/>
        <Route path="/Info" element={<HotelInfo/>}/>
        <Route path="/infoImg" element={<Hotelimg/>}/>
        <Route path="/flightsearch" element={<FlightSearch/>}/>
        <Route path="/flightconfirm" element={<FlightConfirm/>}/>
        <Route path="/flightPayment" element={<FlightPayment/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
