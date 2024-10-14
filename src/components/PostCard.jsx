import React from "react";
import { Link } from "react-router-dom";
import service from "../Appwrite/database/dataservice";
function PostCard({$id, title, featuredimage}){
 return(
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                //here featured image is a string to get link we use getprwview in appwrite theat we define that return lnk to image
                <img src={service.getfilepreveiw(featuredimage)} alt={title} className="rounded-xl" />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
    </Link>
 )
}
export default PostCard;