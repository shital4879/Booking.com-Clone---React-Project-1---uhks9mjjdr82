import React, { useState } from 'react'
import "./flightInfo.css"

const FlightInfo = (props) => {
    // console.log(data);
    const[infoPopUp,setInfoPopUp] = useState(false)
    // console.log(props)
  return (props.trigger)?(
    <div>
      <div className="flightinfo">
        <div className="info-page">
        <button className='close-btn'onClick={()=>props.setTrigger(false)}>X</button>
        {/* <h1>mojjjjj</h1> */}
        {props.children}
        </div>
      </div>
    </div>
  ):""
}

export default FlightInfo
