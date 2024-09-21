import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header(){
    const userstatus = useSelector((state)=>{
        state.auth.status;
    })
    
    return( 
    <h1>hello</h1>
    )
}
export default Header;