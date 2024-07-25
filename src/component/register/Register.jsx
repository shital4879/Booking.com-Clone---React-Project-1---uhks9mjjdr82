import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import { Link, json, useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyContext } from "../../components/App";


const Register = () => {
  const {myname,setMyname} = useContext(MyContext);
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
      if(!responce.ok){
        setValid(false);
      setErrors(prev =>{
        return {...prev,correction:responce.message}
      })
    }
        const result = await responce.json();
        const {token} = result;
        const name = result.data.user.name;
        const email = result.data.user.email;
        localStorage.setItem("Username",name);
        setMyname(name)
        // console.log(name,token);
        // console.log(result);
        localStorage.setItem("token", token);
         handleHome();
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
   
    const toasts = ()=>{
      // toast("Feature is coming soon.");
      toast.info('Feature is coming soon', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
 

  return (
    <div>
    <div className="navbar">
        <div className="navContainer">
          <span className="logo" onClick={()=>navigate("/")} style={{cursor:"pointer"}} >Booking.com</span>

          <div style={{ display: "flex",marginTop:"-4px" }} className="navp1">
            <button style={{}} className="circle" onClick={toasts} >
              INR
            </button>
            <button className="circle" onClick={toasts} >
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
            <button className="circle" onClick={toasts} >
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "25px", width: "30px", marginTop: "-4px" }}
              />
            </button>
            <button className="circle" onClick={toasts} >List Your Property</button>
          </div>

          
        </div>
      </div>

<div className="flex">
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
            <span className="text1" style={{marginTop:"12px"}}>
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
  <ToastContainer 
       position="bottom-left"
       autoClose={3000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      //  transition: "Bounce"
        />
  </div>
  );
};

export default Register;
