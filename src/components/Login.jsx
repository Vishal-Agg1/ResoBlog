import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import Auth from "../Appwrite/Auth/Auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await Auth.login(data);
            if (session) {
                const userData = await Auth.getCurrentUser();
                if (userData) dispatch(authlogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-5 flex-auto">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                            )}

                            <label className="block text-gray-700 font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                            )}

                            <Button type="submit" className="w-full h-12 bg-slate-400"><b>Sign in</b> </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
