import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../styles/App.css";
// import { faBed, faPlane } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import Home from "../home/Home";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Flight from "../Pages";
import Hotel from "../Pages/hotel/Hotel"
import Home from "../Pages/home/Home";

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/flight" element={<Flight/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      <Navbar />
      <Header />
      </BrowserRouter>
  );
}

export default App;
