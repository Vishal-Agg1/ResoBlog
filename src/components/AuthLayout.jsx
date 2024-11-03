import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AuthLayout({children,Authentication=true}){
const Navigate = useNavigate();
const [loader,setloader] = useState(true);
const authstatus = useSelector(state=> state.auth.status);
useEffect(()=>{
    if(Authentication && authstatus!== Authentication){
        return <Navigate to="/login" />;
    }else if(!Authentication && authstatus!== Authentication){
        return <Navigate to="/" />;
    }
    setloader(false);
},[authstatus, Navigate,Authentication])
    return loader ? <h1>Loading ...</h1> :<>{children}</>
}
