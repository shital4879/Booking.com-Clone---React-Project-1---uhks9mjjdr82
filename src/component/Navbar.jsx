import React, {useState} from 'react'
import "./navbar.css";
import {
  faBed,
  faPlane,
  faCalendarDays,
  faUser
}from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { json, useNavigate } from 'react-router-dom';


const Navbar = () => {
// const[openDate,setOpenDate] = useState(false)
// const [date, setDate] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection'
//     }
//   ]);

// const[openOption,setOpenOption] = useState(false)
// const[Option,setOption] = useState({
//   adult: 1,
//   children: 0,
//   room: 1
// })

// const handleOption = (name,operation)=>{
//   setOption((prev)=>{
//   return{
//      ...prev,
//      [name]:operation === "i" ? Option[name] +1 : Option[name] -1,
//   };
//   });
// }

//   const navigate = useNavigate()
//   const fetchapi = async ()=>{
//     try{
//       const responce = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"delhi"}`,{
//         method: "GET",
//         headers: {projectID: "uhks9mjjdr82"},
//         "Content-Type": "application/json"
//       })
//       const result = await responce.json()
//       console.log(result.data.hotels);
//       // console.log(responce);
//     }catch(error){
//       console.log("error");
//     }
//     }
//       fetchapi()

//   const [input,setInput] = useState([]);
//   const[filterdata,setFilterData] = useState([])
//   const handlefilter = (value)=>{
//     const res = filterdata.filter(f => f.name.toLowerCase().includes(value))
//     setInput(res);
//   }

  // const fetchdata = (value)=>{
  //   fetch("https://academics.newtonschool.co/api/v1/bookingportals/offers",{
  //           method: "GET",
  //           headers: {projectID: "uhks9mjjdr82"},
  //           "Content-Type": "application/json"
  //   }).then((response)=>response.json()).then(json =>{
  //     console.log(json);
  //   })
  // }
  // const handlechange = (value)=>{
  //   setinput(value)
  //   fetchdata(value)
  // }

  return (
    <div>
    <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>Booking.com</span>
            <div className='navItems'>
                <button className='navButton'>Register</button>
                <button className='navButton'>Sign in</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar
