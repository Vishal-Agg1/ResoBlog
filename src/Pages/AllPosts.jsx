import React, { useEffect, useState } from "react";
import service from "../Appwrite/database/dataservice";
import Conatiner from "../components/container/container";
import PostCard from "../components/PostCard"
export default function AllPosts(){
    const [posts,setposts]=useState([]);
    useEffect(() => {}, []);
       service.allpost([]).then((posts)=>{
        if(posts){
            setposts(posts.documents);
        }
       })
    return(
        <div className='w-full py-8'>
        <Conatiner>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Conatiner>
    </div>
    );
}