
import React, { useContext } from "react";
import { createContext,useState,useEffect} from "react";


const Context = React.createContext();
export const AuContext = () =>{
    return useContext(Context)
}
export function Authprovider({children}){
      const[isLogIn,setIsLogIn] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsLogIn(token)
  },[])
  const LogIn = () =>{
    localStorage.setItem("token",token)
    setIsLogIn(true);
  }
  const LogOut = () =>{
    localStorage.removeItem("token")
    setIsLogIn(false)
  }
return(
    <div>
        <Context.Provider value={{isLogIn,LogIn,LogOut}}>
            {children}
        </Context.Provider>
    </div>
)
}
export default {Context};