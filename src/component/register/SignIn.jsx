import { useState } from "react";
import React from "react";
import "./SignIn.css"
import { Link, useNavigate } from "react-router-dom";

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

      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
        <span className="logo">Booking.com</span>
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
          onChange={(e)=>setRegisterData({...registerData, email:(e.target.value)})}
          placeholder="Enter email address"
        />
        {
          valid?<></>:
          <span className="dangerZone">{error.email}</span>
        }
    
        <h5 className="emailAddress">Password</h5>
        <input
          type="password"
          name="password"
          className="signpass"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          onChange={(e)=>setRegisterData({...registerData,password:(e.target.value)})}
          placeholder="Enter Password"
        />
          {
          valid?<></>:
          <span className="dangerZone">{error.password}</span>
        }

        <button className="signEmailBtn" onClick={()=>SignIndata()}>
          Sign In
        </button>
        <p className="clickHere">If u dont have account! <Link to="/Register" style={{textDecoration:"none"}}> click here</Link>
        </p>
        {/* <button onClick={()=>setToggle(!toggle)}>okok</button> */}
      </div>
    )}
</form>
    
  </div>
    
  );
};

export default SignIn;
