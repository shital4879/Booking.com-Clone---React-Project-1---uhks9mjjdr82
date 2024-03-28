import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, json, useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import SignIn from "./SignIn";


const Register = () => {
  
  const navigate = useNavigate();
  const [registerData,setRegisterData] = useState({
    name:"",
    email:"",
    password:""
  })
  const[errors,setErrors] = useState({});
  const[valid,setValid] = useState(true);
 
  const [toggle, setToggle] = useState();
  const[token,setToken] = useState(localStorage.getItem("token"))
  

  const SignUpdata = async () => {
    try {
    
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/signup`,
        {
          method: "POST",
          headers: {
            projectID: "uhks9mjjdr82",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            appType: "bookingportals",
          })
          
        }
      );
      const result = await responce.json();
   
      if (result.status === "success") {
        localStorage.setItem("token", result.token);
        handleHome();

      }
      if(result.status === "fail"){
        setValid(false);
        setErrors(prev =>{
          return {...prev,correction:result.message}
        })
      }
      console.log(result);
    } catch (error) {
      setValid(false);
      setErrors(prev =>{
        return {...prev,correction:result.message}
      })
      console.log(error);
    }
  };
  
  const handleSubmit = (e)=>{
     e.preventDefault();
     let isValid = true;
     let validationError = {};
     if(registerData.name ==="" || registerData.name === null){
      isValid=false;
      validationError.name= "Name is required!"
     }
     if(registerData.email ==="" || registerData.email === null){
      isValid=false;
      validationError.email= "Email is required!"
     }
     else if(!/\S+@\S+\.\S+/.test(registerData.email)){
      isValid=false;
      validationError.email= "Invalid EmailId!"
     }
     if(registerData.password ==="" || registerData.password === null){
      isValid=false;
      validationError.password= "password is required!"
     }
     else if(registerData.password.length < 4){
      isValid=false;
      validationError.password= "password should be atleast 4 character!"
     }
     setErrors(validationError);
     setValid(isValid);
     if(isValid){
      SignUpdata();
     }
    }
   
    const handleHome = ()=>{
        navigate(`/`)
    }
   
 

  return (
    <div>
     <div className="navbar">
        <div className="navContainer">
          <span className="logo">Booking.com</span>
          <div className="navItems">
          </div>
        </div>
      </div>

    {!toggle && (
      <form onSubmit={handleSubmit}>
      <div className="signIn">
        <h2 className="crateAccount">Sign in or create an account</h2>
        <h5 className="name1" style={{marginTop:"10px"}}>Name</h5>
        <input
          type="text"
          name="name"
          onChange={(e)=>{setRegisterData({...registerData, name:(e.target.value)})
          setErrors(prev =>{
            return {...prev,name:""}
           })
        }}
          placeholder="Enter name"
          className="signName"
          style={{marginBottom:"25px"}}
          />
          {
            valid ? <></>:
            <span className="text-danger1">
              {errors.name}
            </span>
          }
        <h5 className="emailAddress">Email address</h5>
        <input
          type="email"
          name="email"
          className="signEmail"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          onChange={(e)=>{setRegisterData({...registerData, email:(e.target.value)})
          setErrors(prev =>{
            return {...prev,email:""}
           })
        }}
          style={{marginBottom:"25px"}}
        />
          {
            valid ? <></>:
            <span className="text-danger2">
              {errors.email}
            </span>
          }

        <h5 className="pass">Password</h5>
        <input
          type="password"
          name="password"
          className="signpass"
          placeholder="Enter Password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          onChange={(e)=>{setRegisterData({...registerData, password:(e.target.value)})
          setErrors(prev =>{
            return {...prev,password:""}
           })
        }}
          style={{marginBottom:"25px"}}
        />
          {
            valid ? <></>:
            <span className="text-danger3">
              {errors.password}
            </span>
          }
       
          <button className="signEmailBtn">
          Register
        </button>
        {
            valid ? <></>:
            <span className="text1">
              {errors.correction}
            </span>
          }
       
      </div>
      <p style={{textAlign:"center",margin:"15px 0px 0px 70px"}}>Do you have an account? 
        <Link to="/SignIn" style={{textDecoration:"none"}} > SignIn</Link>
      </p>
      </form>
      
    )}
  </div>
  );
};

export default Register;
