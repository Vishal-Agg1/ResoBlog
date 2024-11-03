import React,{useCallback} from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";
import service from "../Appwrite/database/dataservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../Appwrite/database/dataservice";
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

    const submit = async(data)=>{
        if(post){
            const file =await data.image[0]?service.uploadfile(data.image[0]):null
            if(file){
                service.delfile(post.featuredimage)
            }
            const dbPost = await service.updatepost({...data,slug:post.$id,
              featuredimage: file? file.$id :undefined})
              if(dbPost){
                navigate(`/post/${dbpost.$id}`)
              }
        }
        else{
            //immprove this functionaality
            const file = await service.uploadfile(data.image[0]);
            if(file){
                const fileId = file.$id;
                data.featuredimage
                = fileId;
             const dbpost= service.createpost({...data,userid:userData.$id});
             if(dbpost){
                navigate(`/post/${(await dbpost).$id}`);
             }
            }
            
        }
    }

    
    return(
        <></>
    )
}
