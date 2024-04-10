import React from 'react'
import Navbar from './Navbar'

const AirportTaxi = () => {
  return (
    <div>
      <Navbar type="list"/>

      <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>
        <img src="/coming.png" alt="" />
      </div>
    </div>
  )
}

export default AirportTaxi
