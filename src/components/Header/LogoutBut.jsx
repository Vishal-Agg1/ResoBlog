import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Auth from "../../Appwrite/Auth/Auth";
import { logout } from "../../store/authSlice";

function LogoutBtn(){
    const dispatch = useDispatch();
    const handler=()=>{
        Auth.logout().then(()=>{
        dispatch(logout())})
    }
 return (
   <>
   <button onClick={handler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" >Logout</button>
   </>
 );
}
export default LogoutBtn;