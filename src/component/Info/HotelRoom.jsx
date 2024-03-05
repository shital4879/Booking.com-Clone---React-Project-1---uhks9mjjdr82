import React, { useState } from 'react'

const HotelRoom = ({inf}) => {
    const [roomval, setRoomVal] = useState();
    const [HotelRoom,setHotelRoom] = useState();
    function setTotalvaluefun (){

    }
  return (
    <div>
     
              
                    {/* <input
                      type="number"
                      className="numroom"
                      
                      style={{ marginBottom: "110px", width: "50px" }}
                      value={roomval}
                      onChange={(e) => {
                        setRoomVal(e.target.value),setTotalvaluefun()
                      }}
                    /> */}
                    <button>add room</button>
                
              
          
    </div>
  )
}

export default HotelRoom
