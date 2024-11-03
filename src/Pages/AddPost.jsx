import React from "react";
import Conatiner from "../components/container/container"
import PostForm from "../components/PostForm";
export default function AddPost(){
    return (
        <div className='py-8'>
            <Conatiner>
                <PostForm />
            </Conatiner>
        </div>
      )
}