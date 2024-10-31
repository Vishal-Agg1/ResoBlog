import React,{useCallback, useEffect} from "react";
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
    const slugTransform = useCallback((value)=>{
        if(value && typeof value == 'string'){
            return value.trim().toLowerCase().replace(/^[a-zA-z\d\s]+/g, '-').replace(/\s/g,'-')
        }
        else{
            return ''
        }
    },[])
    useEffect(()=>{
         const subscription = watch((value,{name})=>{
            if(name==='title'){
                //here value is a object so to tranform title we specify
                setValue('slug', slugTransform(value.title,{shouldValidate: true})); 
            }
         });
         return ()=>{
            subscription.unsubscribe()
         }
    },[watch, slugTransform, setValue])
    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
