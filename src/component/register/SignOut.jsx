import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
    const navigate = useNavigate();
    const logOut = () =>{
        window.localStorage.removeItem("token")
        navigate(`/SignIn`)
    }
  return (
    <div onClick={(e)=>{e.stopPropagation()}} style={{position:"absolute",top:"30px",right:"0",zIndex:"10"}}>
      <button onClick={()=>{logOut()}} style={{height:"30px",width:"80px",marginTop:"px",zIndex:"1000"}}>Sign Out</button>
    </div>
  )
}

export default SignOut
