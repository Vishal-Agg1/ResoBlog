import React,{useCallback} from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";
import service from "../Appwrite/database/dataservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PostForm({post}){
    const {register,handleSubmit,watch,getValues,control,setValue} = useForm({
        defaultValues: {
            title: post?.title||"",
            slug: post?.$id||"",
            content: post?.content||"",
            status: post?.status||"active",
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state=>state.auth.userData)

    
    return(
        <></>
    )
}
