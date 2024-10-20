import React,{useState} from "react";
import Auth from "../Appwrite/Auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import Button from "./Button";
import Logo from "./Logo";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
function Signup(){
 const navigate = useNavigate();
 const [error,seterror] = useState("");
 const {register, handlesubmit} = useForm();
 const dispatch = useDispatch();
 const signup = async(data)=>{
    seterror("");;
    try {
       const session =  await Auth.createAccount(data);
    if(session){
        const userdata = await Auth.Currentuser();
        if(userdata) dispatch(login(userdata));
        navigate('/')
    }

    } catch (error) {
        seterror(error.message);
    }

    return(
     <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handlesubmit(signup)}>
                    <div className='space-y-5'>
                        <Input Label="Full Name"
                        placeholder="Enter your Full Name" 
                        {...register("Name",{
                            required:true,
                        })}/>
                        <Input Label="Email" type="email" placeholder="Enter your email" 
                        {...register("Email",{
                            required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })} />
                        <Input Label="Password" type="password" placeholder="Password"
                        {...register("Password",{
                            required:true,
                            minLength:8
                        })} />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
        </div>
     </div>   
    )
 }
}
export default Signup;