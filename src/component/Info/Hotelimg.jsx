import React from "react";
import { useActionData, useLocation } from "react-router-dom";

const Hotelimg = ()=>{
    const location = useLocation();
    const data = location.state;
    console.log(data);
   
    return(
        <div>
        
        </div>
    )
}
export default Hotelimg;