import React, {useState} from 'react'
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane,faCalendarDays,
    faUser } from "@fortawesome/free-solid-svg-icons";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import {format} from 'date-fns'
import { DateRange } from 'react-date-range';
import { json, useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()

    const [input,setInput] = useState([]);
    const[filterdata,setFilterData] = useState([])
    const[openDate,setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    
    const[openOption,setOpenOption] = useState(false)
    const[Option,setOption] = useState({
      adult: 1,
      children: 0,
      room: 1
    })
    
    const handleOption = (name,operation)=>{
      setOption((prev)=>{
      return{
         ...prev,
         [name]:operation === "i" ? Option[name] +1 : Option[name] -1,
      };
      });
    }
    
      const fetchapi = async ()=>{
        try{
          const responce = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"delhi"}`,{
            method: "GET",
            headers: {projectID: "uhks9mjjdr82"},
            "Content-Type": "application/json"
          })
          const result = await responce.json()
          console.log(result.data.hotels);
          // console.log(responce);
        }catch(error){
          console.log("error");
        }
        }
          
      const handlefilter = (value)=>{
        const res = filterdata.filter(f => f.name.toLowerCase().includes(value))
        setInput(res);
      }
    

  return (
    <div>
      <div className='header'>
        <div className='headerContainer'>
        <div className='headerList'>
            <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} className="stays-i"/>
            <span>Stays</span>
            </div>
            <div className='headerListItem'onClick={()=>navigate('/flight')}>
            <FontAwesomeIcon icon={faPlane} className="flights-i"/>
            <span>Flights</span>
            </div>
        </div>
       </div>
       </div>
       <div className="headerTitle">
          <h1 className="heading">Find your next stay</h1>
          <p className="para">Search low prices hotels,homes and much more...</p>
     </div>

     {/* SEARCHBAR */}
     <div className='headerSearch'>
      <div className='headerSearchItem'>
           <FontAwesomeIcon icon={faBed} className="headerIcon"/>
           <input type='text' placeholder='Where are you going?' className='HeaderSearchInput' onChange={(e)=> handlefilter(e.target.value)}/>

          {/* <div className="search-res">
            {input.map((d,i)=>(
              <div key={i}>{date.name}</div>
            ))}
          </div> */}

      </div>
      <div className='headerSearchItem' id='searchitem' onClick={()=> setOpenDate(!openDate)}>
           <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
           <span className='headerSearchText'>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
           {openDate && <DateRange
           editableDateInputs={true}
           onChange={item => setDate([item.selection])}
           moveRangeOnFirstSelection={false}
           ranges={date}
           className='date'
           />}
      </div>
      <div className='headerSearchItem'>
           <FontAwesomeIcon icon={faUser} className='headerIcon'/>
           <span onClick={()=>setOpenOption(!openOption)} className='headerSearchText'>{`${Option.adult}adult. ${Option.children}children. ${Option.room}room`}</span>
           {openOption && <div className="options">
            <div className="optionItem">
              <span className="openText">Adult</span>
              <div className="optionCounter">
                  <button 
                  disabled={Option.adult <= 1}
                  className='optionbtn' 
                  onClick={()=>handleOption("adult","d")}>-</button>
                  <span className='optionnum'>{Option.adult}</span>
                  <button 
                  className='optionbtn' 
                  onClick={()=>handleOption("adult","i")}>+
                  </button>
              </div>
            </div>
            
            <div className="optionItem">
              <span className="openText">Children</span>
              <div className="optionCounter">
                  <button 
                  disabled={Option.children <= 0}
                  className='optionbtn' 
                  onClick={()=>handleOption("children","d")}>-</button>
                  <span className='optionnum'>{Option.children}</span>
                  <button
                  className='optionbtn' 
                  onClick={()=>handleOption("children","i")}>+
                  </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="openText">room</span>
              <div className="optionCounter">
                  <button 
                   disabled={Option.room <= 1}
                  className='optionbtn' onClick={()=>handleOption("room","d")}>-</button>
                  <span className='optionnum'>{Option.room}</span>
                  <button 
                  className='optionbtn' 
                  onClick={()=>handleOption("room","i")}>+
                  </button>
              </div>
            </div>
            <button onClick={()=>setOpenOption(!openOption)} className='donebtn'>Done</button>
           </div>
           }
      </div>
      <div className='headerSearchItem' id='searchbtn'>
           <button className='headerBtn' onClick={()=>fetchapi()}>Search</button>
      </div>
     </div> 

    </div>
  )
}

export default Header
