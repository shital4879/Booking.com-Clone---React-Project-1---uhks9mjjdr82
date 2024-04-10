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
import FlightSearch from "../Pages/Flight/FlightSearch";
import FlightConfirm from "../Pages/Flight/FlightConfirm";
import FlightPayment from "../Pages/Flight/FlightPayment";
import Register from "../component/register/Register";
import SignIn from "../component/register/SignIn";
import PaymentHotel from "../component/paymentHotel/PaymentHotel";
import FlightDetail from "../Pages/Flight/FlightDetail";
import { Authprovider } from "./Context";
import CarRentel from "../component/navbar/CarRentel";
import AirportTaxi from "../component/navbar/AirportTaxi";
// import HotelInfo from "../Pages/Info/HotelInfo"


function App() {
  return (
    <>
   <Authprovider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel/:results" element={<HotelSearch/>}/>
        <Route path="/info/:id" element={<HotelInfo/>}/>
         <Route path="/flight" element={<Flight/>}/>
        <Route path="/paymentHotel/:cost" element={<PaymentHotel/>}/>
    
        <Route path="/flightsearch" element={<FlightSearch/>}/>
        <Route path="/flightconfirm/:fid" element={<FlightConfirm/>}/>
        <Route path="/flightPayment/:fid" element={<FlightPayment/>}/>
        <Route path="/flightDetail/:id" element={<FlightDetail/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/CarRentel" element={<CarRentel/>}/>
        <Route path="/AirportTaxi" element={<AirportTaxi/>}/>
      </Routes>
      </BrowserRouter>
    </Authprovider>
      </>
  );
}

export default App;
