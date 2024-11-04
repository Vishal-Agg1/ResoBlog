import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";
import service from "../Appwrite/database/dataservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, getValues, control, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            let dbPost;
            if (post) {
                const file = data.image?.[0] ? await service.uploadfile(data.image[0]) : null;
                if (file) {
                    await service.delfile(post.featuredImage);
                }
                dbPost = await service.updatepost({
                    ...data,
                    slug: post.$id,
                    featuredImage: file ? file.$id : undefined,
                });
            } else {
                const file = data.image?.[0] ? await service.uploadfile(data.image[0]) : null;
                if (file) {
                    data.featuredImage = file.$id;
                }
                dbPost = await service.createpost({ ...data, userId: userData.$id });
            }
    
            console.log("Database Post Result:", dbPost);  // Check if dbPost has the expected $id
            if (dbPost && dbPost.$id) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                console.error("Failed to get a valid post ID for redirection");
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-z\d\s]/g, '').replace(/\s+/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
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
