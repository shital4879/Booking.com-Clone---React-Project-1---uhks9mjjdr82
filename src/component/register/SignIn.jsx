import { useState } from "react";
import React from "react";
import "./SignIn.css"
import { Link, useNavigate } from "react-router-dom";
import {
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignIn = () => {

  const navigate = useNavigate();
  const[valid,setValid] = useState(true);
  const[error,setError] = useState({})
  const[registerData,setRegisterData] = useState({
    email:"",
    password:""
  })
  const [toggle, setToggle] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const SignIndata = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/login`,
        {
          method: "POST",
          headers: { projectID: "uhks9mjjdr82" ,
          "Content-Type": "application/json"},
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
            appType: "bookingportals",
          }),
        }
      );
      const result = await responce.json();

      if(result.status==="success"){
        localStorage.setItem("token",result.token)
        navigateToHome();
        localStorage.setItem("UserInfo",JSON.stringify({
          id:result.data._id,
          name:result.data.name,
          email:result.data.email
        }))
      }
    if(result.status === "fail"){
      setValid(false);
      setError(prev =>{
        return {...prev,correction: result.message}
      })
    }
      console.log(result);
    } catch (error) {
      console.log(error);
      setValid(false);
      setError(prev =>{
        return {...prev,correction: "some error occured please try again later!"}
      })
    }
  };

  const RegisterPage = () => {
    navigate(`/Register`);
  };
  const SignInPage = () => {
    navigate(`/SignIn`);
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    let isValid = true;
    let validationError = {};
    if(registerData.email === "" || registerData.email === null){
      isValid = false;
      validationError.email= "Email is required!"
    }
    else if(!/\S+@\S+\.\S+/.test(registerData.email)){
     isValid=false;
     validationError.email= "Invalid EmailId!"
    }

    if(registerData.password === "" || registerData.password === null){
      isValid = false
      validationError.password = "password is required!"
    }
    else if(registerData.password.length < 4){
      isValid=false;
      validationError.password= "password should be atleast 4 character!"
    }
    setValid(isValid);
    setError(validationError);
    if(isValid){
      SignIndata()
    }
  }

  const navigateToHome = () =>{
    navigate(`/`)
  }

  
 
  return (
    <div>
  
  <div className="navbar">
        <div className="navContainer">
          <span className="logo" onClick={()=>navigate("/")}>Booking.com</span>

          <div style={{ display: "flex", marginLeft: "-350px",marginTop:"-4px" }} className="navp1">
            <button style={{}} className="circle" disabled>
              INR
            </button>
            <button className="circle">
              <img
                src="https://faraz-khan-booking-com-clone-react-project-1-jza6qqtrfilv.vercel.app/images/IndiaFlag.png"
                alt=""
                style={{
                  height: "25px",
                  width: "30px",
                  borderRadius: "10%",
                  marginTop: "-4px",
                }}
              />
            </button>
            <button className="circle">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "25px", width: "30px", marginTop: "-4px" }}
              />
            </button>
            <button className="circle">List Your Property</button>
          </div>

          
        </div>
      </div>


    <form onSubmit={handleSubmit}>
    {!toggle && (
      <div className="signIn">
        <h2 className="crateAccount">Sign in or create an account</h2>
        <h5 className="emailAddress">Email address</h5>
        <input
          type="email"
          name="email"
          className="signEmail"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          onChange={(e)=>{setRegisterData({...registerData, email:(e.target.value)})
             setError(prev =>{
              return {...prev,email:""}
             })
        }}
          placeholder="Enter email address"
          style={{marginBottom:"20px"}}
        />
        {
          valid?<></>:
          <span className="dangerZone-A">{error.email}</span>
        }
    
        <h5 className="password-12">Password</h5>
        <input
          type="password"
          name="password"
          className="signpass"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          onChange={(e)=>{setRegisterData({...registerData,password:(e.target.value)})
          setError(prev =>{
            return {...prev,password:""}
           })
        }}
          placeholder="Enter Password"
          style={{marginBottom:"25px"}}
        />
          {
          valid?<></>:
          <span className="dangerZoneB">{error.password}</span>
        }

        <button className="signEmailBtn" onClick={()=>{SignIndata()}}>
          Sign In
        </button>
        {
          valid?<></>:
          <span className="text1" style={{marginLeft:"-50px"}}>{error.correction}</span>
        }
      </div>
    )}
</form>
    
  </div>
    
  );
};

export default SignIn;
